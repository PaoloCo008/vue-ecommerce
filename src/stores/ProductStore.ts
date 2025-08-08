import useLocalStorage from '@/composables/useLocalStorage'
import { sampleProducts } from '@/lib/constants/data/products'
import type { Product } from '@/lib/types/globals'
import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: useLocalStorage<Product[]>('products', sampleProducts),
  }),
  getters: {
    getProductsByFeature: (state) => (feature: string) =>
      state.products.filter((product) => product.categories.includes(feature)).slice(0, 8),

    getProductsByCategory: (state) => (category: string) =>
      category === 'all'
        ? state.products
        : state.products.filter((product) => product.categories.includes(category)),

    getProductPrimaryImageById: (state) => (productId: string) => {
      const product = state.products.find((product) => product._id === productId)

      return product!.images.find((img) => img.isPrimary)!.url
    },
    getProductById: (state) => (productId: string) => {
      return state.products.find((product) => product._id === productId)
    },
  },
})
