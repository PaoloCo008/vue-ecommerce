import useLocalStorage from '@/composables/useLocalStorage'
import type { Cart, CartItem } from '@/lib/types/globals'
import { defineStore } from 'pinia'
import { useAuthStore } from './AuthStore'
import { carts } from '@/lib/constants/data/carts'
import { useProductStore } from './ProductStore'
import { DEFAULT_SHIPPING_FEE } from '@/lib/constants'
import { useOrderStore } from './OrderStore'
import router from '@/router'
import { encodeOrderId } from '../lib/helpers'

export const useCartStore = defineStore('cart', {
  state: () => ({
    carts: useLocalStorage<Cart[]>('carts', carts),
    guestCart: useLocalStorage<CartItem[]>('guestCart', []),
    selectedCartItems: [] as CartItem[],
  }),

  getters: {
    getCartByUserId: (state) => (userId: string) =>
      state.carts.find((cart) => cart.userId === userId),

    getGuestCartItems: (state) => state.guestCart.reduce((acc, item) => item.quantity + acc, 0),

    getUserCartItemsCount() {
      return (userId: string) => {
        const userCart = this.getCartByUserId(userId)

        if (userCart) {
          return userCart.items.reduce((acc, item) => item.quantity + acc, 0)
        }
      }
    },

    isCartItemSelected: (state) => (productId: string) =>
      state.selectedCartItems.some((item) => item.productId === productId),

    areAllItemsSelected: (state) => (cartItems: CartItem[]) => {
      return (
        cartItems.length > 0 &&
        cartItems.every((item) =>
          state.selectedCartItems.some((selected) => selected.productId === item.productId),
        )
      )
    },

    getSelectedItemsCount: (state) => state.selectedCartItems.length,

    getSelectedCartSubtotal: (state) => {
      const productStore = useProductStore()

      return state.selectedCartItems.reduce((acc, item) => {
        const product = productStore.getProductById(item.productId as string)

        return acc + product!.price * item.quantity
      }, 0)
    },

    getCheckoutSubtotal: (state) => {
      const productStore = useProductStore()

      return state.selectedCartItems.reduce((acc, item) => {
        const product = productStore.getProductById(item.productId as string)

        return acc + product!.price * item.quantity
      }, DEFAULT_SHIPPING_FEE)
    },
  },

  actions: {
    createCart(userId: string) {
      const newCart: Cart = {
        _id: crypto.randomUUID(),
        userId,
        items: [],
      }

      this.carts.push(newCart)
      this.mergeGuestCartToUserCart(userId)
    },

    mergeGuestCartToUserCart(userId: string) {
      if (this.guestCart.length === 0) return

      const userCart = this.getCartByUserId(userId)

      if (userCart) {
        this.guestCart.forEach((item) => {
          const existingItem = userCart.items.find(
            (cartItem) => cartItem.productId === item.productId,
          )
          if (existingItem) {
            existingItem.quantity += item.quantity
          } else {
            userCart.items.push(item)
          }
        })
        this.guestCart = []
      }
    },

    updateCartItemQuantityByProductId(productId: string, quantity: number) {
      const authStore = useAuthStore()

      if (authStore.isAuthenticated) {
        const userId = authStore.user as string
        const userCart = this.getCartByUserId(userId)

        if (!userCart) return

        const existingItem = userCart.items.find((cartItem) => cartItem.productId === productId)

        if (quantity === 0) {
          this.removeItemFromUserCart(userId, productId)
          this.removeItemFromSelection(productId)
          return
        }

        if (existingItem) {
          existingItem.quantity = quantity
        }
      } else {
        // Handle guest cart
        const existingItem = this.guestCart.find((cartItem) => cartItem.productId === productId)

        if (quantity === 0) {
          this.guestCart = this.guestCart.filter((item) => item.productId !== productId)
          this.removeItemFromSelection(productId)
          return
        }

        if (existingItem) {
          existingItem.quantity = quantity
        }
      }
    },

    toggleItemFromSelection(item: CartItem) {
      const existingIndex = this.selectedCartItems.findIndex(
        (selectedItem) => selectedItem.productId === item.productId,
      )

      if (existingIndex === -1) {
        this.selectedCartItems.push(item)
      } else {
        this.selectedCartItems.splice(existingIndex, 1)
      }
    },

    addItemToSelection(item: CartItem) {
      const exists = this.selectedCartItems.some(
        (selectedItem) => selectedItem.productId === item.productId,
      )

      if (!exists) {
        this.selectedCartItems.push(item)
      }
    },

    removeItemFromSelection(productId: string) {
      this.selectedCartItems = this.selectedCartItems.filter(
        (selectedItem) => selectedItem.productId !== productId,
      )
    },

    removeItemFromUserCart(userId: string, itemId: string) {
      const userCart = this.getCartByUserId(userId)

      if (!userCart) return

      const existingItem = userCart?.items.find((cartItem) => cartItem.productId === itemId)

      if (existingItem) {
        userCart.items = userCart?.items.filter((item) => item._id !== existingItem._id)
      }
    },

    removeSelectedItemsFromUserCart(userId: string) {
      const userCart = this.getCartByUserId(userId)

      if (!userCart) return

      const selectedProductIds = this.selectedCartItems.map((item) => item.productId)

      selectedProductIds.forEach((id) => {
        const itemId = userCart?.items.findIndex((cartItem) => cartItem.productId === id)

        const selectedId = this.selectedCartItems.findIndex((cartItem) => cartItem.productId === id)

        userCart?.items.splice(itemId, 1)
        this.selectedCartItems.splice(selectedId, 1)
      })
    },

    clearSelections() {
      this.selectedCartItems = []
    },

    selectAllItems(items: CartItem[]) {
      this.selectedCartItems = [...items]
    },

    addToCart(item: CartItem) {
      const authStore = useAuthStore()

      if (authStore.isAuthenticated) {
        const userCart = this.getCartByUserId(authStore.user as string)

        const existingItem = userCart?.items.find(
          (cartItem) => cartItem.productId === item.productId,
        )
        if (existingItem) {
          existingItem.quantity += item.quantity
        } else {
          userCart?.items.push(item)
        }
      } else {
        const existingItem = this.guestCart?.find(
          (cartItem) => cartItem.productId === item.productId,
        )
        if (existingItem) {
          existingItem.quantity += item.quantity
        } else {
          this.guestCart?.push(item)
        }
      }
    },

    proceedToCheckout(addressId: string, from?: 'cart' | 'product', item?: CartItem) {
      const orderStore = useOrderStore()

      let subtotal: number = 0
      let pendingOrderId: string = ''
      let total: number = 0

      const shipping = DEFAULT_SHIPPING_FEE

      if (from === 'cart') {
        subtotal = this.getSelectedCartSubtotal
        total = this.getCheckoutSubtotal

        pendingOrderId = orderStore.createPendingOrder(this.selectedCartItems, addressId)
      } else if (from === 'product') {
        subtotal = item!.price * item!.quantity
        total = subtotal + shipping

        pendingOrderId = orderStore.createPendingOrder([item as CartItem], addressId)
      }

      if (subtotal && total && pendingOrderId) {
        orderStore.updatePendingOrder(pendingOrderId, {
          pricing: {
            subtotal,
            shipping,
            total,
          },
        })

        router.push({
          name: 'checkout',
          params: { pendingOrderId: encodeOrderId(pendingOrderId as string) },
        })
      }
    },
  },
})
