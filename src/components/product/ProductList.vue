<script setup lang="ts">
import ProductCard from '@/components/product/ProductCard.vue'
import { formatPrice, formatProductSlug } from '@/lib/helpers'
import type { Product } from '@/lib/types/globals'
import { useProductStore } from '@/stores/ProductStore'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const productStore = useProductStore()

defineProps<{ featuredProducts: Product[] }>()

// const props = defineProps({
//   products: {
//     type: Array,
//     default: () => [
//       {
//         id: 1,
//         name: 'Oversized Hoodie That Has A Long Name For The Sake Of Testing',
//         price: 89,
//         originalPrice: 129,
//         image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop',
//         badge: 'Sale',
//         colors: ['#000000', '#666666', '#ffffff'],
//       },
//       {
//         id: 2,
//         name: 'Graphic Tee',
//         price: 45,
//         image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
//         colors: ['#000000', '#ff6b6b', '#4ecdc4'],
//       },
//       {
//         id: 3,
//         name: 'Denim Jacket',
//         price: 120,
//         image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=500&fit=crop',
//         badge: 'New',
//         colors: ['#4a90e2', '#2c3e50'],
//       },
//       {
//         id: 4,
//         name: 'Cargo Pants',
//         price: 75,
//         originalPrice: 95,
//         image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop',
//         colors: ['#8b4513', '#556b2f', '#000000'],
//       },
//       {
//         id: 5,
//         name: 'Oversized Hoodie That Has A Long Name For The Sake Of Testing',
//         price: 89,
//         originalPrice: 129,
//         image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop',
//         badge: 'Sale',
//         colors: ['#000000', '#666666', '#ffffff'],
//       },
//       {
//         id: 6,
//         name: 'Graphic Tee',
//         price: 45,
//         image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
//         colors: ['#000000', '#ff6b6b', '#4ecdc4'],
//       },
//       {
//         id: 7,
//         name: 'Denim Jacket',
//         price: 120,
//         image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=500&fit=crop',
//         badge: 'New',
//         colors: ['#4a90e2', '#2c3e50'],
//       },
//       {
//         id: 8,
//         name: 'Cargo Pants',
//         price: 75,
//         originalPrice: 95,
//         image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop',
//         colors: ['#8b4513', '#556b2f', '#000000'],
//       },
//     ],
//   },
// })
</script>

<template>
  <div class="product-grid">
    <div
      v-for="product in featuredProducts"
      :key="product._id"
      class="product-card"
      @click="
        router.push({
          name: 'product',
          params: { slug: formatProductSlug(product.slug, product._id) },
        })
      "
    >
      <img
        :src="productStore.getProductPrimaryImageById(product._id)"
        :alt="product.name"
        class="product-image"
      />
      <div class="product-info">
        <h3 class="product-name">{{ product.name }}</h3>
        <div class="product-pricing">
          <span class="price">{{ formatPrice(product.price) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  width: 100%;
  max-width: 1900px;
  margin: 0 auto;
  padding: 0 1rem;
}

.product-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: pointer;
}

.product-image {
  width: 100%;
  height: 480px;
  object-fit: cover;
  border-radius: 4px;
}

.product-info {
  display: flex;
  flex-direction: column-reverse;
  gap: 0.5rem;
}

.product-name {
  font-size: 0.9rem;
  font-weight: 400;
  margin: 0;
  line-height: 1.4;
  color: #333;
  text-transform: uppercase;
}

.product-pricing {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.price {
  font-weight: 600;
  color: #000;
}
</style>
