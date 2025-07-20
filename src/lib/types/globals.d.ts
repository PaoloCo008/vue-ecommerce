export interface User {
  _id: string
  email: string
  password: string
  mobileNumber: string
  fullName: string
  birthday: Date | null
  gender: Gender | null
  addresses: Address[]
  paymentMethods: PaymentMethod[]
  receiveMarketingEmails: boolean
  receiveMarketingSMS: boolean
}

export type AddressLabel = 'home' | 'office'
export type AddressType = 'billing' | 'shipping'

export interface Address {
  _id: string
  fullName: string
  mobileNumber: string
  address: string
  unitNumber?: string
  province: string
  district: string
  ward: string
  deliveryLabel: AddressLabel
  isDefaultBilling: boolean
  isDefaultShipping: boolean
}

export interface Cart {
  _id: string
  userId: User['_id']
  items: CartItem[]
}

export interface CartItem {
  productId: Product['_id']
  // selected: boolean
  quantity: number
}

export interface Product {
  _id: string
  name: string
  slug: string
  description: string
  images: Image[]
  price: number
  inventory: Inventory
}

export interface Inventory {
  available: number
  lowStockThreshold: number
}

export interface Image {
  url: string
  alt: string
  isPrimary: boolean
}

type OrderStatus = 'placed' | 'paid' | 'shipped' | 'received'

export interface Order {
  _id: string
  userId: User['_id']
  orderNumber: string
  status: OrderStatus
  items: CartItem[]
  placedAt: Date
  paidAt?: Date
  shippedAt?: Date
  receivedAt?: Date
  pricing: Pricing
  shippingAddress: Address
  paymentMethod: PaymentMethod
  shipping: Shipping
}

export interface Pricing {
  subtotal: number
  shipping: number
  total: number
}

export interface Shipping {
  method: 'standard'
  carrier: 'J10 Express'
  trackingNumber: string
}

type CardExpiration = [number, number]

export interface CreditCard {
  type: 'credit_card'
  _id: string
  lastFour: string
  cardName: string
  expiration: CardExpiration
  cvv: string
}

export interface MobileWallet {
  type: 'mobile_wallet'
  _id: string
  provider: 'gcash'
  accountNumber: string
  accountName: string
}

export type PaymentMethod = CreditCard | MobileWallet

export type Gender = 'male' | 'female' | 'other'

export type AuthStages = 'signup' | 'login' | 'address' | 'phone' | 'otp' | 'recover'
