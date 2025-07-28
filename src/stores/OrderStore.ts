import useLocalStorage from '@/composables/useLocalStorage'
import type { CartItem, Order, OrderStatus, PaymentMethod } from '@/lib/types/globals'
import { defineStore } from 'pinia'
import { useAuthStore } from './AuthStore'
import { useProductStore } from './ProductStore'
import { useCartStore } from './CartStore'
import router from '@/router'
import { compareAsc } from 'date-fns'
import { getCardImage } from '@/lib/helpers'
import { useUserStore } from './UserStore'
import { useRoute } from 'vue-router'
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'

// Add interface for display payment methods
interface PaymentMethodDisplay {
  id: string
  label: string
  type: string
  src?: string
  icon?: string
  number?: string | null
  paymentMethodData?: PaymentMethod
}

export const useOrderStore = defineStore('order', {
  state: () => ({
    orders: useLocalStorage<Order[]>('orders', []),
    pendingOrders: useLocalStorage<Order[]>('pendingOrders', []),
    loading: false,
  }),
  getters: {
    getOrderById: (state) => (id: string) => state.orders.find((order) => order._id === id),

    getOrdersByUserId: (state) => (userId: string) =>
      state.orders.filter((order) => order.userId === userId),

    getPendingOrderById(state) {
      return function (id: string) {
        return state.pendingOrders.find((order) => order._id === id)
      }
    },

    getSelectedItemsByPendingOrderId(state) {
      const productStore = useProductStore()

      return function (pendingOrderId: string) {
        const pendingOrder = state.pendingOrders.find((order) => order._id === pendingOrderId)

        return pendingOrder?.items.map((item) => {
          const product = productStore.getProductById(item.productId)

          return {
            _id: product?._id,
            name: product?.name,
            price: product?.price * item.quantity,
            quantity: item.quantity,
            image: productStore.getProductPrimaryImageById(product?._id as string),
          }
        })
      }
    },

    getRecentOrders: (state) => {
      if (state.orders.length === 1) {
        return state.orders
      } else {
        return [
          ...state.orders.sort((a, b) => compareAsc(b.placedAt as Date, a.placedAt as Date)),
        ].slice(0, 5)
      }
    },

    getUserOrderHistory: (state) => (userId: string) => {
      return state.orders
        .filter((order) => order.userId === userId)
        .sort(
          (a, b) =>
            new Date(b.placedAt || b.createdAt).getTime() -
            new Date(a.placedAt || a.createdAt).getTime(),
        )
    },

    getUserFilteredOrders(state) {
      return (userId: string, filterQuery?: string, searchQuery?: string) => {
        const actualSearchQuery = searchQuery || ''
        const actualFilterQuery = filterQuery

        let searchQueries = [...new Set(actualSearchQuery?.split(' ') || [])]

        if (searchQueries.length > 1) {
          searchQueries = searchQueries.filter((query, i, arr) => {
            const regex = new RegExp(`^${query}`, 'gim')
            if (arr.filter((q) => q !== query).some((el: string) => regex.test(el))) return false
            return true
          })
        }

        let filteredUserOrders = [...state.orders.filter((order) => order.userId === userId)]

        if (actualFilterQuery && actualFilterQuery !== 'all') {
          filteredUserOrders = filteredUserOrders.filter((o) => {
            if (o.paymentMethod?.type === 'cash_on_delivery') {
              if (actualFilterQuery === 'to-ship') {
                return o.paymentMethod.type === 'cash_on_delivery' && o.status === 'placed'
              } else if (actualFilterQuery === 'to-receive') {
                return o.paymentMethod.type === 'cash_on_delivery' && o.status === 'shipped'
              }
            } else {
              if (actualFilterQuery === 'to-ship') {
                return o.status === 'paid'
              } else if (actualFilterQuery === 'to-receive') {
                return o.status === 'shipped'
              }
            }
            return false
          })
        }

        if (actualSearchQuery) {
          filteredUserOrders = filteredUserOrders.filter((order) => {
            return searchQueries.some((query) => {
              const regex = new RegExp(query, 'gi')
              return (
                regex.test(order.orderNumber) ||
                order.items.some((item) => regex.test(item.name || ''))
              )
            })
          })
        }

        return filteredUserOrders
      }
    },
  },

  actions: {
    getDefaultPaymentMethods(userId: string) {
      const paymentMethodOptions = {
        cash_on_delivery: {
          id: 'cash_on_delivery',
          label: 'Cash on Delivery',
          type: 'Cash on Delivery',
          src: 'https://img.lazcdn.com/g/tps/tfs/TB1ZP8kM1T2gK0jSZFvXXXnFXXa-96-96.png_2200x2200q75.png_.webp',
          number: null,
        },
        gcash: {
          id: 'gcash',
          label: 'GCash e-Wallet',
          type: 'GCash e-Wallet',
          src: '/gcash-img.webp',
          number: null,
        },
      }

      // Get user's last two payment methods from order history
      const lastPaymentMethods = this.getUserLastPaymentMethods(userId)

      if (lastPaymentMethods.length >= 2) {
        return lastPaymentMethods
      } else if (lastPaymentMethods.length === 1) {
        const defaultMethod =
          lastPaymentMethods[0].id === 'cash_on_delivery' ? 'gcash' : 'cash_on_delivery'
        return [lastPaymentMethods[0], paymentMethodOptions[defaultMethod]]
      } else {
        return [paymentMethodOptions.cash_on_delivery, paymentMethodOptions.gcash]
      }
    },

    getUserLastPaymentMethods(userId: string) {
      const userStore = useUserStore()
      const userOrders = this.getUserOrderHistory(userId)
      const userSavedPaymentMethods = userStore.getUserPaymentMethods(userId)

      if (userOrders.length === 0 || userSavedPaymentMethods.length === 0) return []

      const usedMethods = []
      const seenMethodIds = new Set()

      // Go through order history from most recent to oldest
      for (const order of userOrders) {
        if (order.paymentMethod && usedMethods.length < 2) {
          // Check if this payment method exists in user's saved payment methods
          const savedMethod = userSavedPaymentMethods.find((savedPM) => {
            // For different payment method types, check different identifiers
            switch (order.paymentMethod.type) {
              case 'cash_on_delivery':
                return savedPM.type === 'cash_on_delivery'
              case 'mobile_wallet':
                return (
                  savedPM.type === 'mobile_wallet' &&
                  savedPM.provider === order.paymentMethod.provider &&
                  savedPM.accountNumber === order.paymentMethod.accountNumber
                )
              case 'credit_card':
                return (
                  savedPM.type === 'credit_card' &&
                  savedPM.provider === order.paymentMethod.provider &&
                  savedPM.lastFour === order.paymentMethod.lastFour
                )
              default:
                return savedPM._id === order.paymentMethod._id
            }
          })

          // If the payment method from order exists in saved methods and we haven't seen it yet
          if (savedMethod && !seenMethodIds.has(savedMethod._id)) {
            seenMethodIds.add(savedMethod._id)
            const displayMethod = this.convertPaymentMethodToDisplay(savedMethod)
            if (displayMethod) {
              usedMethods.push(displayMethod)
            }
          }
        }
      }

      return usedMethods
    },

    convertPaymentMethodToDisplay(paymentMethod: PaymentMethod): PaymentMethodDisplay | null {
      switch (paymentMethod.type) {
        case 'cash_on_delivery':
          return {
            id: 'cash_on_delivery',
            label: 'Cash on Delivery',
            type: 'Cash on Delivery',
            src: 'https://img.lazcdn.com/g/tps/tfs/TB1ZP8kM1T2gK0jSZFvXXXnFXXa-96-96.png_2200x2200q75.png_.webp',
            number: null,
            paymentMethodData: paymentMethod,
          }
        case 'mobile_wallet':
          if (paymentMethod.provider === 'gcash') {
            return {
              id: `gcash_${paymentMethod._id}`,
              label: 'GCash e-Wallet',
              type: 'GCash e-Wallet',
              src: '/gcash-img.webp',
              number: null,
              paymentMethodData: paymentMethod,
            }
          }
          break
        case 'credit_card':
          return {
            id: `card_${paymentMethod._id}`,
            label: `${paymentMethod.provider.toUpperCase()} ***********${paymentMethod.lastFour}`,
            type: 'Credit/Debit Card',
            src: getCardImage(paymentMethod.provider),
            number: `${paymentMethod.provider.toUpperCase()} ***********${paymentMethod.lastFour}`,
            paymentMethodData: paymentMethod,
          }
      }
      return null
    },

    createPendingOrder(selectedItems: CartItem[], addressId: string) {
      const authStore = useAuthStore()
      const userId = authStore.user as string

      // Get default payment methods for this user
      const defaultPaymentMethods = this.getDefaultPaymentMethods(userId)

      const newPendingOrder: Order = {
        _id: crypto.randomUUID(),
        userId,
        orderNumber: this.generateOrderNumber(),
        status: 'pending' as OrderStatus,
        items: selectedItems,
        createdAt: new Date(),
        placedAt: undefined,
        paidAt: undefined,
        shippedAt: undefined,
        receivedAt: undefined,
        pricing: {
          subtotal: 0,
          shipping: 0,
          total: 0,
        },
        shippingAddress: addressId,
        paymentMethod: null,
        // Add these new fields to persist state
        availablePaymentMethods: defaultPaymentMethods,
        selectedPaymentMethodId: defaultPaymentMethods[0]?.id || null,
        shippedBy: {
          method: 'standard',
          carrier: 'J10 Express',
          trackingNumber: this.generateTimestampTracking(),
        },
      }

      this.pendingOrders.push(newPendingOrder)
      return newPendingOrder._id
    },

    updatePendingOrderPaymentMethods(orderId: string, newMethod: PaymentMethodDisplay) {
      const orderIndex = this.pendingOrders.findIndex((order) => order._id === orderId)

      if (orderIndex !== -1) {
        const order = this.pendingOrders[orderIndex]
        let updatedMethods = [...(order.availablePaymentMethods || [])]

        // Remove existing method if it exists
        const existingIndex = updatedMethods.findIndex((method) => method.id === newMethod.id)
        if (existingIndex !== -1) {
          updatedMethods.splice(existingIndex, 1)
        }

        // Add new method to front and keep only 2 methods max
        updatedMethods.unshift(newMethod)
        updatedMethods = updatedMethods.slice(0, 2)

        this.pendingOrders[orderIndex] = {
          ...order,
          availablePaymentMethods: updatedMethods,
          selectedPaymentMethodId: newMethod.id,
        }
      }
    },

    updatePendingOrder(orderId: string, updates: Partial<Order>) {
      const orderIndex = this.pendingOrders.findIndex((order) => order._id === orderId)

      if (orderIndex !== -1) {
        this.pendingOrders[orderIndex] = {
          ...this.pendingOrders[orderIndex],
          ...updates,
        }
      }
    },

    async completePendingOrder(orderId: string, finalUpdates?: Partial<Order>) {
      const cartStore = useCartStore()

      // Method 1: Using Element Plus Loading Service (Recommended)
      const loading = ElLoading.service({
        lock: true,
        text: 'Processing your order...',
        background: 'rgba(0, 0, 0, 0.7)',
      })

      try {
        const pendingOrder = this.getPendingOrderById(orderId)

        if (!pendingOrder) {
          throw new Error('Pending order not found')
        }

        // Update loading text based on payment method
        const isCOD = pendingOrder.selectedPaymentMethodId === 'cash_on_delivery'
        loading.setText(isCOD ? 'Placing your order...' : 'Processing payment...')

        // Create a clean order object without checkout-specific fields
        const { availablePaymentMethods, selectedPaymentMethodId, ...cleanPendingOrder } =
          pendingOrder

        let completedOrder: Order

        if (isCOD) {
          // For COD orders: only set placedAt, no paidAt, status remains 'placed'
          completedOrder = {
            ...cleanPendingOrder,
            ...finalUpdates,
            status: 'placed' as OrderStatus,
            placedAt: new Date(),
            paidAt: undefined,
          }
        } else {
          // For other payment methods: set both placedAt and paidAt, status is 'paid'
          completedOrder = {
            ...cleanPendingOrder,
            ...finalUpdates,
            status: 'paid' as OrderStatus,
            placedAt: new Date(),
            paidAt: new Date(),
          }
        }

        // Simulate processing time
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Update loading text for final steps
        loading.setText('Finalizing order...')

        const productIds = completedOrder.items.map((item) => item.productId)

        productIds.forEach((productId) => {
          cartStore.removeItemFromSelection(productId)
          cartStore.removeItemFromUserCart(completedOrder.userId, productId)
        })

        this.orders.push(completedOrder)
        this.removePendingOrder(orderId)

        // Show success message
        ElMessage.success({
          message: 'Order completed successfully!',
          duration: 3000,
          showClose: true,
        })

        // Navigate after showing success
        setTimeout(() => {
          router.replace({ name: 'orders' })
        }, 1000)

        return completedOrder
      } catch (error) {
        console.error('Error completing order:', error)

        // Show error message
        ElMessage.error({
          message: 'Failed to complete order. Please try again.',
          duration: 5000,
          showClose: true,
        })

        // Optionally show detailed error dialog
        ElMessageBox.alert(
          'There was an issue processing your order. Please check your connection and try again.',
          'Order Processing Error',
          {
            confirmButtonText: 'OK',
            type: 'error',
          },
        )

        throw error
      } finally {
        // Always close loading
        loading.close()
      }
    },

    cleanupExpiredPendingOrders(expirtyMinutes = 120) {
      const now = new Date()

      this.pendingOrders = this.pendingOrders.filter((order) => {
        const createdAt = new Date(order.createdAt)
        const minutesDiff = (now.getTime() - createdAt.getTime()) / (1000 * 60)
        return minutesDiff <= expirtyMinutes
      })
    },

    cleanupExpiredPendingOrdersForTesting(expirySeconds = 30) {
      const now = new Date()
      const beforeCount = this.pendingOrders.length

      this.pendingOrders = this.pendingOrders.filter((order) => {
        const createdAt = new Date(order.createdAt)
        const secondsDiff = (now.getTime() - createdAt.getTime()) / 1000
        return secondsDiff <= expirySeconds
      })

      const afterCount = this.pendingOrders.length
      const removedCount = beforeCount - afterCount

      console.log(`Cleanup removed ${removedCount} expired pending orders`)
      return { beforeCount, afterCount, removedCount }
    },

    removePendingOrder(id: string) {
      this.pendingOrders = this.pendingOrders.filter((order) => order._id !== id)
    },

    updateOrder(orderId: string, updates: Partial<Order>) {
      const orderIndex = this.orders.findIndex((order) => order._id === orderId)

      if (orderIndex !== -1) {
        this.orders[orderIndex] = {
          ...this.orders[orderIndex],
          ...updates,
          ...(updates.shippedAt && { shippedAt: new Date(updates.shippedAt) }),
          ...(updates.receivedAt && { receivedAt: new Date(updates.receivedAt) }),
          ...(updates.paidAt && { paidAt: new Date(updates.paidAt) }),
          ...(updates.placedAt && { placedAt: new Date(updates.placedAt) }),
        }

        console.log(`Order ${orderId} updated successfully`, this.orders[orderIndex])
        return this.orders[orderIndex]
      } else {
        console.error(`Order ${orderId} not found`)
        return null
      }
    },

    encodeOrderId(orderId: string) {
      const reversed = orderId.split('').reverse().join('')
      const withTimestamp = `${reversed}_${Date.now().toString(36)}`
      const encoded = btoa(withTimestamp)
      const random = Math.random().toString(36).substring(2, 6)
      return `${random}${encoded.replace(/[+/=]/g, '')}${random}`
    },

    decodeOrderId(encodedId: string) {
      try {
        const cleanEncoded = encodedId.substring(4, encodedId.length - 4)
        const decoded = atob(cleanEncoded)
        const parts = decoded.split('_')

        if (parts.length >= 2) {
          return parts[0].split('').reverse().join('')
        }
        return null
      } catch (error) {
        return null
      }
    },

    generateOrderNumber() {
      const timestamp = Date.now().toString().slice(-6)
      const random = Math.random().toString(36).substring(2, 5).toUpperCase()
      return `ORD-${timestamp}-${random}`
    },

    generateTimestampTracking() {
      const now = Date.now()
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const numbers = '0123456789'
      const timeStr = now.toString().slice(-6)

      let randomLetters = ''
      for (let i = 0; i < 3; i++) {
        randomLetters += letters.charAt(Math.floor(Math.random() * letters.length))
      }

      let randomNumbers = ''
      for (let i = 0; i < 3; i++) {
        randomNumbers += numbers.charAt(Math.floor(Math.random() * numbers.length))
      }

      return `TRK${timeStr}${randomLetters}${randomNumbers}`
    },
  },
})
