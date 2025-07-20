import useLocalStorage from '@/composables/useLocalStorage'
import type { Order } from '@/lib/types/globals'
import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', {
  state: () => ({
    orders: useLocalStorage<Order[]>('orders', []),
    loading: false,
  }),
  getters: {
    getOrderById: (state) => (id: string) => state.orders.find((order) => order._id === id),
    getOrdersByUserId: (state) => (userId: string) =>
      state.orders.filter((order) => order.userId === userId),
  },
  actions: {},
})
