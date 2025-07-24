import useLocalStorage from '@/composables/useLocalStorage'
import { users } from '@/lib/constants/data/users'
import type { NewAddressForm } from '@/lib/types/forms'
import type { AddressLabel, AddressType, User } from '@/lib/types/globals'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: useLocalStorage<User[]>('users', users),
    loading: false,
  }),

  getters: {
    getUserByEmail: (state) => (email: string) => state.users.find((user) => user.email === email),
    getUserById: (state) => (id: string) => state.users.find((user) => user._id === id),
    getUserAddressByAddressId: (state) => (userId: string, addressId: string) => {
      const user = state.users.find((user) => user._id === userId)
      return user ? user.addresses.find((address) => address._id === addressId) : null
    },
    getUserAddressesById: (state) => (id: string) => {
      const user = state.users.find((user) => user._id === id)
      return user ? user.addresses : []
    },
    getUserDefaultBillingAddressById: (state) => (userId: string) => {
      const user = state.users.find((user) => user._id === userId)
      return user ? user.addresses.find((address) => address.isDefaultBilling) : null
    },
    getUserDefaultShippingAddressById: (state) => (userId: string) => {
      const user = state.users.find((user) => user._id === userId)
      return user ? user.addresses.find((address) => address.isDefaultShipping) : null
    },
  },
  actions: {
    createUser(user: User) {
      this.users.push(user)
    },

    addAddressToUser(userId: string, address: NewAddressForm) {
      const user = this.getUserById(userId)

      if (user) {
        const newAddress = {
          ...address,
          deliveryLabel: address.deliveryLabel as AddressLabel,
          _id: crypto.randomUUID(),
          isDefaultBilling: user.addresses.length === 0,
          isDefaultShipping: user.addresses.length === 0,
        }
        user.addresses.push(newAddress)

        return newAddress._id
      }
    },

    deleteUserAddressById(userId: string, addressId: string) {
      const user = this.getUserById(userId)
      if (user) {
        user.addresses = user.addresses.filter((address) => address._id !== addressId)
      }
    },

    updateUserAddressById(userId: string, addressId: string, updatedAddress: NewAddressForm) {
      const user = this.getUserById(userId)
      if (user) {
        const address = user.addresses.find((address) => address._id === addressId)
        if (address) {
          Object.assign(address, updatedAddress)
        }
      }
    },

    editUser(id: string, updatedData: Partial<User>) {
      const user = this.getUserById(id)
      if (user) {
        Object.assign(user, updatedData)
      }
    },

    updateDefaultAddress(id: string, addressId: string, type: AddressType) {
      const user = this.getUserById(id)

      if (user) {
        user.addresses.forEach((address) => {
          if (type === 'billing') {
            address.isDefaultBilling = address._id === addressId
          } else {
            address.isDefaultShipping = address._id === addressId
          }
        })
      }
    },

    updateMethodValue(id: string, method: 'email' | 'mobileNumber', value: string) {
      const user = this.getUserById(id)

      if (user) {
        user[method] = value
      }
    },
  },
})
