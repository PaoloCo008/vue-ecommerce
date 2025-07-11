export function truncate(word: string, maxChars: number) {
  return word.length >= maxChars ? word.slice(0, maxChars) + '...' : word
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: 'PHP',
  }).format(price)
}
