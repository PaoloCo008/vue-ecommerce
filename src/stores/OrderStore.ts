import useLocalStorage from '@/composables/useLocalStorage'
import type { CartItem, Order, OrderStatus } from '@/lib/types/globals'
import { defineStore } from 'pinia'
import { useAuthStore } from './AuthStore'
import { useProductStore } from './ProductStore'
import { useCartStore } from './CartStore'
import router from '@/router'
import { compareAsc } from 'date-fns'

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
  },

  actions: {
    createPendingOrder(selectedItems: CartItem[], addressId: string) {
      const authStore = useAuthStore()

      const newPendingOrder: Order = {
        _id: crypto.randomUUID(),
        userId: authStore.user as string,
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
        shippedBy: {
          method: 'standard',
          carrier: 'J10 Express',
          trackingNumber: this.generateTimestampTracking(),
        },
      }

      this.pendingOrders.push(newPendingOrder)

      return newPendingOrder._id
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

    completePendingOrder(orderId: string, finalUpdates?: Partial<Order>) {
      const cartStore = useCartStore()
      const pendingOrder = this.getPendingOrderById(orderId)

      if (pendingOrder) {
        const completedOrder: Order = {
          ...pendingOrder,
          ...finalUpdates,
          status: 'paid' as OrderStatus,
          placedAt: new Date(),
          paidAt: new Date(),
        }

        const productIds = completedOrder.items.map((item) => item.productId)

        productIds.forEach((productId) => {
          cartStore.removeItemFromSelection(productId)
          cartStore.removeItemFromUserCart(completedOrder.userId, productId)
        })

        this.orders.push(completedOrder)
        this.removePendingOrder(orderId)

        router.push({ name: 'orders' })

        return completedOrder
      }
    },

    cleanupExpiredPendingOrders(expirtyMinutes = 120) {
      const now = new Date()

      this.pendingOrders = this.pendingOrders.filter((order) => {
        const createdAt = new Date(order.createdAt)
        const minutesDiff = (now.getTime() - createdAt.getTime()) / (1000 * 60)
        return minutesDiff <= expirtyMinutes
      })

      // return this.pendingOrders.length
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
      this.pendingOrders = this.pendingOrders.filter((order) => order.id !== id)
    },

    updateOrder(orderId: string, updates: Partial<Order>) {
      const orderIndex = this.orders.findIndex((order) => order._id === orderId)

      if (orderIndex !== -1) {
        this.orders[orderIndex] = {
          ...this.orders[orderIndex],
          ...updates,
          // Ensure dates are properly converted
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
      // Simple algorithm: reverse + base64 + random padding
      const reversed = orderId.split('').reverse().join('')
      const withTimestamp = `${reversed}_${Date.now().toString(36)}`
      const encoded = btoa(withTimestamp)

      // Add random characters and make URL-safe
      const random = Math.random().toString(36).substring(2, 6)
      return `${random}${encoded.replace(/[+/=]/g, '')}${random}`
    },

    decodeOrderId(encodedId: string) {
      try {
        // Remove random padding (4 chars from each end)
        const cleanEncoded = encodedId.substring(4, encodedId.length - 4)

        // Decode base64
        const decoded = atob(cleanEncoded)
        const parts = decoded.split('_')

        if (parts.length >= 2) {
          // Reverse back to get original order ID
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
