import useLocalStorage from '@/composables/useLocalStorage'
import type { Cart, CartItem } from '@/lib/types/globals'
import { defineStore } from 'pinia'
import { useAuthStore } from './AuthStore'
import { carts } from '@/lib/constants/data/carts'

export const useCartStore = defineStore('cart', {
  state: () => ({
    carts: useLocalStorage<Cart[]>('carts', carts),
    guestCart: useLocalStorage<CartItem[]>('guestCart', []),
    selectedCartItemIds: [],
  }),
  getters: {
    getCartByUserId: (state) => (userId: string) =>
      state.carts.find((cart) => cart.userId === userId),

    getGuestCartLength: (state) => state.guestCart.length,

    getCartLength() {
      return (userId: string) => {
        const userCart = this.getCartByUserId(userId)

        if (userCart) {
          return userCart.items.length
        }
      }
    },

    isCartItemSelected: (state) => (productId: string) =>
      state.selectedCartItemIds.includes(productId),

    areAllItemsSelected: (state) => (productIds: string[]) => {
      return (
        productIds.length > 0 && productIds.every((id) => state.selectedCartItemIds.includes(id))
      )
    },

    getSelectedItemsCount: (state) => state.selectedCartItemIds.length,
  },
  actions: {
    createCart(userId: string) {
      const newCart: Cart = {
        _id: crypto.randomUUID(),
        userId,
        items: [],
      }
      this.mergeGuestCartToUserCart(userId)
      this.carts.push(newCart)
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

    updateUserCartItemQuantityByProductId(userId: string, productId: string, quantity: number) {
      const userCart = this.getCartByUserId(userId)

      const existingItem = userCart?.items.find((cartItem) => cartItem.productId === productId)

      if (existingItem) {
        existingItem.quantity = quantity
      }
    },

    toggleIdFromSelection(productId: string) {
      if (!this.selectedCartItemIds.includes(productId)) {
        this.selectedCartItemIds.push(productId)
      } else {
        this.selectedCartItemIds = this.selectedCartItemIds.filter(
          (selectedId) => selectedId !== productId,
        )
      }
    },

    addItemToSelection(productId: string) {
      if (!this.selectedCartItemIds.includes(productId)) {
        this.selectedCartItemIds.push(productId)
      }
    },

    removeItemFromSelection(productId: string) {
      this.selectedCartItemIds = this.selectedCartItemIds.filter(
        (selectedId) => selectedId !== productId,
      )
    },

    clearSelections() {
      this.selectedCartItemIds = []
    },

    selectAllItems(ids: string[]) {
      this.selectedCartItemIds = [...ids]
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
  },
})
