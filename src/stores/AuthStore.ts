import useLocalStorage from '@/composables/useLocalStorage'
import type { GoToRecoveryOTP, Login, RegisterPhone, Signup } from '@/lib/types/actions'
import type { AddressLabel, AuthStages, User } from '@/lib/types/globals'
import type { AuthMode, AuthStore } from '@/lib/types/stores'

import { defineStore } from 'pinia'
import { useUserStore } from './UserStore'
import type { NewAddressForm } from '@/lib/types/forms'

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
    getAuthCurrentStep: (state) => state.currentStep,

    getMode: (state) => state.authMode,

    getFormDataByProperty: (state) => (form: AuthMode, property: string) => {
      if (property === 'email' || property === 'password') {
        return state.loginData[property]
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

    authorize(userId: string) {
      this.user = userId
      this.isAuthenticated = true
    },

    logout() {
      this.isAuthenticated = false
      this.user = null
    },

    login({ email, password }: Login) {
      this.loginData.email = email
      this.loginData.password = password

      this.incrementStep()
    },

    registerUser(formAddressData?: NewAddressForm) {
      const userStore = useUserStore()

      const newUser: User = {
        ...this.signupData,
        _id: crypto.randomUUID(),
        fullName: '',
        birthday: null,
        gender: null,
        addresses: [],
        paymentMethods: [],
        receiveMarketingEmails: false,
        receiveMarketingSMS: false,
      }

      if (formAddressData) {
        const newAddress = {
          _id: crypto.randomUUID(),
          fullName: formAddressData.fullName,
          mobileNumber: formAddressData.mobileNumber,
          address: formAddressData.address,
          unitNumber: formAddressData.unitNumber,
          province: formAddressData.province,
          district: formAddressData.district,
          ward: formAddressData.ward,
          deliveryLabel: formAddressData.deliveryLabel as AddressLabel,
          isDefaultBilling: true,
          isDefaultShipping: true,
        }

        newUser.addresses.push(newAddress)
        newUser.fullName = formAddressData.fullName
      }

      userStore.createUser(newUser)

      this.authorize(newUser._id)
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

    changeUserPassword(password: string) {
      const userStore = useUserStore()

      const user = userStore.getUserByEmail(this.loginData.email)

      if (user) {
        user.password = password
        this.authorize(user._id)
      }
    },
  },
})
