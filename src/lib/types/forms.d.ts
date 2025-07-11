export interface NewAddressForm {
  fullName: string
  address: string
  mobileNumber: number | null
  unitNumber?: string
  province: string
  district: string
  ward: string
  deliveryLabel: 'office' | 'home' | null
}
