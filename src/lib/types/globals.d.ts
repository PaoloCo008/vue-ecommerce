export interface Address {
  _id: string
  fullName: string
  mobileNumber: string
  address: string
  unitNumber: string
  province: string
  district: string
  ward: string
  deliveryLabel: AddressLabels
}

export type AddressLabel = 'home' | 'office'

export interface User {
  _id: string
  fullName: string
  email: string
  password: string
  mobileNumber: string
  birthday: Date | null
  gender: Gender | null
  defaultBillingAddress: Address['_id'] | null
  defaultShippingAddress: Address['_id'] | null
  addresses: Address['_id'][]
  paymentMethods: PaymentMethod[]
  cart: Cart['_id'] | null
  orders: Order['_id'][]
  receiveMarketingEmails: boolean
  receiveMarketingSMS: boolean
}

export interface Cart {
  _id: string
  userId: User['_id']
  items: CartItem['_id'][]
}

export interface CartItem {
  _id: string
  productId: Product['_id']
  selected: boolean
  quantity: number
  name: string
  price: number
  thumbnailImage: string
}

export interface Product {
  _id: string
  name: string
  description: string
  thumbnailImage: string
  images: string[]
  price: number
  stock: number
}

type OrderStatus = 'placed' | 'paid' | 'shipped' | 'received'

export interface Order {
  _id: string
  items: CartItem[]
  status: OrderStatus
  placedAt: Date
  paidAt?: Date
  shippedAt?: Date
  receivedAt?: Date
  totalAmount: number
  userId: User['_id']
  shippingAddress: Address
  paymentMethod: PaymentMethod
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
