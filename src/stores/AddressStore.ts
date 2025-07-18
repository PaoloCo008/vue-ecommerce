import useLocalStorage from '@/composables/useLocalStorage'
import { defineStore } from 'pinia'
import type { Address } from '../lib/types/globals'
import type { NewAddressForm } from '@/lib/types/forms'

export const useAddressStore = defineStore('address', {
  state: () => ({
    addresses: useLocalStorage<Address[]>('addresses', []),
    loading: false,
  }),

  getters: {},

  actions: {
    createAddress: (address: NewAddressForm) => {},
  },
})
