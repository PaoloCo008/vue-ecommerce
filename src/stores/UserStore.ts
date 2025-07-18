import useLocalStorage from '@/composables/useLocalStorage'
import type { User } from '@/lib/types/globals'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: useLocalStorage<User[]>('users', [
      {
        _id: '1',
        fullName: 'Maria Santos',
        email: 'maria.santos@email.com',
        password: 'hashedPassword123!',
        mobileNumber: '+639171234567',
        birthday: new Date('1990-05-15'),
        gender: 'female',
        defaultBillingAddress: null,
        defaultShippingAddress: null,
        addresses: [],
        paymentMethods: [],
        cart: null,
        orders: [],
        receiveMarketingEmails: false,
        receiveMarketingSMS: false,
      },
      {
        _id: '2',
        fullName: 'Juan Dela Cruz',
        email: 'juan.delacruz@email.com',
        password: 'securePassword456!',
        mobileNumber: '+639189876543',
        birthday: new Date('1985-12-03'),
        gender: 'male',
        defaultBillingAddress: null,
        defaultShippingAddress: null,
        addresses: [],
        paymentMethods: [],
        cart: null,
        orders: [],
        receiveMarketingEmails: false,
        receiveMarketingSMS: false,
      },
    ]),
    loading: false,
  }),

  getters: {
    getUserByEmail: (state) => (email: string) => state.users.find((user) => user.email === email),
    getUserById: (state) => (id: string) => state.users.find((user) => user._id === id),
  },
  actions: {
    createUser(user: User) {},
  },
})
