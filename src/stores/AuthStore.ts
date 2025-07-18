import useLocalStorage from '@/composables/useLocalStorage'
import type { GoToRecoveryOTP, Login, RegisterPhone, Signup } from '@/lib/types/actions'
import type { AuthStages, User } from '@/lib/types/globals'
import type { AuthMode, AuthStore } from '@/lib/types/stores'

import { defineStore } from 'pinia'
import { useUserStore } from './UserStore'
import type { NewAddressForm } from '@/lib/types/forms'
import { useAddressStore } from './AddressStore'

const loginInitialState = {
  email: '',
  password: '',
}
const signupInitialState = {
  email: '',
  password: '',
  mobileNumber: '',
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthStore => ({
    // User state
    user: useLocalStorage<null | string>('user', null),
    isAuthenticated: useLocalStorage<boolean>('isAuthenticated', false),

    // UI state
    authMode: 'login',
    currentStep: 1,
    isLoading: false,

    // Login data
    loginData: loginInitialState,

    // Signup data
    signupData: signupInitialState,
  }),

  getters: {
    getMode: (state) => state.authMode,

    getFormDataByProperty: (state) => (form: AuthMode, property: string) => {
      switch (form) {
        case 'login':
          console.log(state.loginData)
          return state.loginData[property]
        case 'signup':
          return state.signupData[property]
      }
    },

    isInMethodFlowPosition: (state) => (stage: AuthStages) => {
      // Login Flow
      if (state.authMode === 'login') {
        switch (state.currentStep) {
          case 1:
            return stage === 'login'
          case 2:
            return stage === 'otp'
        }
      }

      // Signup Flow
      if (state.authMode === 'signup') {
        switch (state.currentStep) {
          case 1:
            return stage === 'signup'
          case 2:
            return stage === 'phone'
          case 3:
            return stage === 'otp'
          case 4:
            return stage === 'address'
        }
      }

      // Password Forget Flow
      if (state.authMode === 'recovery') {
        switch (state.currentStep) {
          case 1:
            return stage === 'recover'
          case 2:
            return stage === 'otp'
        }
      }
    },
  },

  actions: {
    setAuthMode(state: AuthMode) {
      this.currentStep = 1
      this.resetForms()
      this.authMode = state
    },

    resetForms() {
      this.loginData = loginInitialState
      this.signupData = signupInitialState
    },

    signup({ email, password }: Signup) {
      this.signupData.email = email
      this.signupData.password = password
      this.incrementStep()
    },

    registerPhone({ mobileNumber }: RegisterPhone) {
      this.signupData.mobileNumber = mobileNumber
      this.incrementStep()
    },

    decrementStep() {
      this.currentStep -= 1
    },

    incrementStep() {
      this.currentStep += 1
    },

    authorize() {
      this.isAuthenticated = true
    },

    logout() {
      this.isAuthenticated = false
      this.user = null
    },

    login({ userId, email, password }: Login) {
      this.user = userId
      this.loginData.email = email
      this.loginData.password = password
      this.incrementStep()
    },

    registerUser(formAddressData: NewAddressForm, withAddress?: boolean) {
      const userStore = useUserStore()

      const newUser: User = {
        ...this.signupData,
        _id: crypto.randomUUID(),
        fullName: '',
        birthday: null,
        gender: null,
        defaultBillingAddress: null,
        defaultShippingAddress: null,
        addresses: [],
        paymentMethods: [],
        cart: null,
        orders: [],
        receiveMarketingEmails: false,
        receiveMarketingSMS: false,
      }

      if (withAddress) {
        const addressStore = useAddressStore()

        addressStore.createAddress({ ...formAddressData })
      }
    },

    goToRecovery() {
      this.authMode = 'recovery'
    },

    goToRecoveryOTP({ email }: GoToRecoveryOTP) {
      this.loginData.email = email
      this.incrementStep()
    },

    goBack(mode: AuthMode) {
      this.authMode = mode

      if (this.currentStep !== 1) {
        this.decrementStep()
      }
    },
  },
})
