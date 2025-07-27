import useLocalStorage from '@/composables/useLocalStorage'
import { users } from '@/lib/constants/data/users'
import type { NewAddressForm } from '@/lib/types/forms'
import type {
  AddressLabel,
  AddressType,
  CreditCard,
  PaymentMethod,
  User,
} from '@/lib/types/globals'
import { defineStore } from 'pinia'
import { useCartStore } from './CartStore'

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
    getUserPaymentMethods: (state) => (userId: string, type?: PaymentMethod['type']) => {
      const user = state.users.find((user) => user._id === userId)

      if (type) {
        return user ? user.paymentMethods.filter((method) => method?.type === type) : null
      }

      return user ? user.paymentMethods : null
    },
  },
  actions: {
    createUser(user: User) {
      const cartStore = useCartStore()

      this.users.push(user)

      cartStore.createCart(user._id)
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

    async addPaymentMethod(userId: string, paymentMethod: PaymentMethod) {
      try {
        const user = this.users.find((u) => u._id === userId)
        if (!user) {
          throw new Error('User not found')
        }

        // Check if this payment method already exists (for GCash, check by account number)

        const existingMethod = user.paymentMethods.find(
          (pm) =>
            pm.type === paymentMethod.type &&
            pm.provider === paymentMethod.provider &&
            (paymentMethod.accountNumber
              ? pm.accountNumber === paymentMethod.accountNumber
              : pm.lastFour === paymentMethod.lastFour),
        )

        if (existingMethod) {
          console.log('im here')
          throw new Error('This payment method is already saved')
        }

        // Add the new payment method
        user.paymentMethods.push(paymentMethod)

        return paymentMethod
      } catch (error) {
        console.error('Error adding payment method:', error)
        throw error
      }
    },

    addCardByUserID(userId: string, card: CreditCard) {
      const user = this.getUserById(userId)

      if (user) {
        user.paymentMethods.push(card)
      }
    },

    removePaymentMethod(userId: string, paymentMethodId: string) {
      try {
        const user = this.users.find((u) => u._id === userId)
        if (!user || !user.paymentMethods) {
          throw new Error('User or payment methods not found')
        }

        const index = user.paymentMethods.findIndex((pm) => pm._id === paymentMethodId)
        if (index === -1) {
          throw new Error('Payment method not found')
        }

        user.paymentMethods.splice(index, 1)

        return true
      } catch (error) {
        console.error('Error removing payment method:', error)
        throw error
      }
    },

    deleteCardFromUser(userId: string, cardId: string) {
      const user = this.getUserById(userId)

      if (user) {
        user.paymentMethods = user.paymentMethods.filter((method) => method._id !== cardId)
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
