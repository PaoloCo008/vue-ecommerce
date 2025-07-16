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
