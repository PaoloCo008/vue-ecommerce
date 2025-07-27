export type AuthMode = 'login' | 'signup' | 'recovery'

export interface AuthStore {
  user: Ref<string | null>
  isAuthenticated: Ref<boolean>

  authMode: AuthMode
  currentStep: number
  isLoading: boolean

  loginData: {
    email: string
    password: string
  }

  signupData: {
    email: string
    password: string
    mobileNumber: string
  }
}
