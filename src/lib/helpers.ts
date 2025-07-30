import { cardProviderLogos } from './constants'
import type { CardProviders, PaymentMethod, PaymentMethodDisplay } from './types/globals'

export function truncate(word: string, maxChars: number) {
  return word.length >= maxChars ? word.slice(0, maxChars) + '...' : word
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: 'PHP',
  }).format(price)
}

export function hideEmail(email: string) {
  const [username, serverDomain] = email.split('@')

  const hiddenUsername = username.slice(0, 2) + username.slice(2).replaceAll(/./gm, '*')

  return `${hiddenUsername}@${serverDomain}`
}

export function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function buildAddressLine(address: {
  province: string
  district: string
  ward: string
}): string {
  const { province, district, ward } = address

  return `${capitalize(province)} - ${capitalize(district)} - ${capitalize(ward)}`
}

export const formatDate = (date: Date | string) => {
  const d = new Date(date)
  return d
    .toLocaleDateString('en-PH', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
    .replace(',', '')
}

export function generateOtp(): string {
  return Math.floor(1000 + Math.random() * 9000).toString()
}

export function formatPhilippinePhone(phoneNumber: string) {
  let cleaned = phoneNumber.replace(/\D/g, '')

  cleaned = '63' + cleaned

  const countryCode = cleaned.substring(0, 2)
  const areaCode = cleaned.substring(3, 6)
  const firstPart = cleaned.substring(6, 9)
  const secondPart = cleaned.substring(9, 13)

  return `+${countryCode} ${areaCode} ${firstPart} ${secondPart}`
}

export function getCardProvider(cardNumber: string) {
  const num = cardNumber.replace(/\s/g, '')

  if (num.startsWith('4')) return 'visa'
  if (num.startsWith('5') || (num >= '2221' && num <= '2720')) return 'mastercard'
  if (num.startsWith('34') || num.startsWith('37')) return 'american-express'
  if (num.startsWith('35')) return 'jcb'

  return null
}

export function buildCardNumber(lastFour: string) {
  return `**** **** **** ${lastFour}`
}

export function getCardImage(provider: CardProviders): string {
  return cardProviderLogos[provider]?.img || ''
}

export function convertPaymentMethodToDisplay(
  paymentMethod: PaymentMethod,
): PaymentMethodDisplay | null {
  switch (paymentMethod.type) {
    case 'cash_on_delivery':
      return {
        id: 'cash_on_delivery',
        label: 'Cash on Delivery',
        type: 'Cash on Delivery',
        src: 'https://img.lazcdn.com/g/tps/tfs/TB1ZP8kM1T2gK0jSZFvXXXnFXXa-96-96.png_2200x2200q75.png_.webp',
        number: null,
        paymentMethodData: paymentMethod,
      }
    case 'mobile_wallet':
      if (paymentMethod.provider === 'gcash') {
        return {
          id: `gcash_${paymentMethod._id}`,
          label: 'GCash e-Wallet',
          type: 'GCash e-Wallet',
          src: '/gcash-img.webp',
          number: null,
          paymentMethodData: paymentMethod,
        }
      }
      break
    case 'credit_card':
      return {
        id: `card_${paymentMethod._id}`,
        label: `${paymentMethod.provider.toUpperCase()} ***********${paymentMethod.lastFour}`,
        type: 'Credit/Debit Card',
        src: getCardImage(paymentMethod.provider),
        number: `${paymentMethod.provider.toUpperCase()} ***********${paymentMethod.lastFour}`,
        paymentMethodData: paymentMethod,
      }
  }
  return null
}

export function encodeOrderId(orderId: string) {
  const reversed = orderId.split('').reverse().join('')
  const withTimestamp = `${reversed}_${Date.now().toString(36)}`
  const encoded = btoa(withTimestamp)
  const random = Math.random().toString(36).substring(2, 6)
  return `${random}${encoded.replace(/[+/=]/g, '')}${random}`
}

export function decodeOrderId(encodedId: string) {
  try {
    const cleanEncoded = encodedId.substring(4, encodedId.length - 4)
    const decoded = atob(cleanEncoded)
    const parts = decoded.split('_')

    if (parts.length >= 2) {
      return parts[0].split('').reverse().join('')
    }
    return null
  } catch {
    return null
  }
}

export function generateOrderNumber() {
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `ORD-${timestamp}-${random}`
}

export function generateTimestampTracking() {
  const now = Date.now()
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  const timeStr = now.toString().slice(-6)

  let randomLetters = ''
  for (let i = 0; i < 3; i++) {
    randomLetters += letters.charAt(Math.floor(Math.random() * letters.length))
  }

  let randomNumbers = ''
  for (let i = 0; i < 3; i++) {
    randomNumbers += numbers.charAt(Math.floor(Math.random() * numbers.length))
  }

  return `TRK${timeStr}${randomLetters}${randomNumbers}`
}
