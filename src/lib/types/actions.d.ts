export interface Signup {
  email: string
  password: string
}

export interface Login {
  userId: string
  email: string
  password: string
}

export interface RegisterPhone {
  mobileNumber: string
}

export interface GoToRecoveryOTP {
  email: string
}
