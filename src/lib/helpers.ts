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
