<script setup lang="ts">
import ProductCard from '@/components/product/ProductCard.vue'
import { useProductStore } from '@/stores/ProductStore'
import { computed } from 'vue'

const productStore = useProductStore()

const props = defineProps({
  products: {
    type: Array,
    default: () => [
      {
        id: 1,
        name: 'Oversized Hoodie That Has A Long Name For The Sake Of Testing',
        price: 89,
        originalPrice: 129,
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop',
        badge: 'Sale',
        colors: ['#000000', '#666666', '#ffffff'],
      },
      {
        id: 2,
        name: 'Graphic Tee',
        price: 45,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
        colors: ['#000000', '#ff6b6b', '#4ecdc4'],
      },
      {
        id: 3,
        name: 'Denim Jacket',
        price: 120,
        image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=500&fit=crop',
        badge: 'New',
        colors: ['#4a90e2', '#2c3e50'],
      },
      {
        id: 4,
        name: 'Cargo Pants',
        price: 75,
        originalPrice: 95,
        image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop',
        colors: ['#8b4513', '#556b2f', '#000000'],
      },
      {
        id: 5,
        name: 'Oversized Hoodie That Has A Long Name For The Sake Of Testing',
        price: 89,
        originalPrice: 129,
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop',
        badge: 'Sale',
        colors: ['#000000', '#666666', '#ffffff'],
      },
      {
        id: 6,
        name: 'Graphic Tee',
        price: 45,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
        colors: ['#000000', '#ff6b6b', '#4ecdc4'],
      },
      {
        id: 7,
        name: 'Denim Jacket',
        price: 120,
        image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=500&fit=crop',
        badge: 'New',
        colors: ['#4a90e2', '#2c3e50'],
      },
      {
        id: 8,
        name: 'Cargo Pants',
        price: 75,
        originalPrice: 95,
        image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop',
        colors: ['#8b4513', '#556b2f', '#000000'],
      },
    ],
  },
})

// Computed property to ensure max 4 products
const displayProducts = computed(() => {
  return props.products.slice(0, 8)
})
</script>

<template>
  <el-space wrap :size="[12, 30]">
    <!-- <ProductCard v-for="product in productStore.products" :key="product._id" :product="product" /> -->

    <div v-for="(product, index) in displayProducts" :key="product.id" class="product-card">
      <img :src="product.image" :alt="product.name" class="product-image" />

      <div class="product-info">
        <h3 class="product-name">{{ product.name }}</h3>
        <div class="product-pricing">
          <span class="price">{{ product.price }}</span>
        </div>
      </div>
    </div>
  </el-space>
</template>

<style scoped>
.el-space {
  width: 100%;
  max-width: 1900px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  place-content: center;
  padding: 0 1.5rem 1.5rem;
  box-sizing: border-box;
  margin: 0 auto;
}

.el-space .el-space__item {
  justify-content: center;
  height: 480px;
}

.product-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-image {
  width: 100%;
}
</style>
