<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/ProductStore'
import { formatProductSlug } from '@/lib/helpers'

const INITIAL_PRODUCTS_COUNT = 8

const productStore = useProductStore()

const route = useRoute()
const router = useRouter()

const products = computed(() => productStore.getProductsByCategory(route.params.category as string))

const currentDisplayCount = ref(INITIAL_PRODUCTS_COUNT)

const visibleItems = computed(() => products.value.slice(0, currentDisplayCount.value))

const hasMoreItems = computed(() => currentDisplayCount.value < products.value.length)

const remainingCount = computed(() =>
  Math.min(products.value.length - currentDisplayCount.value, INITIAL_PRODUCTS_COUNT),
)

function showMore() {
  currentDisplayCount.value += INITIAL_PRODUCTS_COUNT
}
</script>

<template>
  <div class="collection-page">
    <!-- Header Section -->
    <div class="header-section">
      <h1 class="collection-title">{{ (route.params.category as string).split('-').join(' ') }}</h1>

      <p># // Items</p>

      <!-- Filter and Sort Section -->
      <div class="filter-sort-section">
        <div class="filter-controls">
          <el-button class="filter-btn" text>
            <span>Filter</span>
          </el-button>

          <el-dropdown class="filter-dropdown">
            <el-button text>
              Size <el-icon><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>XS</el-dropdown-item>
                <el-dropdown-item>S</el-dropdown-item>
                <el-dropdown-item>M</el-dropdown-item>
                <el-dropdown-item>L</el-dropdown-item>
                <el-dropdown-item>XL</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <el-dropdown class="filter-dropdown">
            <el-button text>
              Colour <el-icon><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Black</el-dropdown-item>
                <el-dropdown-item>White</el-dropdown-item>
                <el-dropdown-item>Grey</el-dropdown-item>
                <el-dropdown-item>Navy</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>

        <div class="sort-control">
          <el-dropdown>
            <el-button text>
              Sort by <el-icon><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Price: Low to High</el-dropdown-item>
                <el-dropdown-item>Price: High to Low</el-dropdown-item>
                <el-dropdown-item>Newest</el-dropdown-item>
                <el-dropdown-item>Best Selling</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
    <!-- Product Grid -->
    <div class="product-grid">
      <div
        v-for="product in visibleItems"
        :key="product._id"
        class="product-card"
        @click="
          router.push({
            name: 'product',
            params: { slug: formatProductSlug(product.slug, product._id) },
          })
        "
      >
        <div class="product-image-container">
          <img
            :src="productStore.getProductPrimaryImageById(product._id)"
            :alt="product.name"
            class="product-image"
          />
        </div>
        <div class="product-info">
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-price">{{ product.price }}</p>
        </div>
      </div>

      <button v-if="hasMoreItems" @click="showMore">Show {{ remainingCount }} more</button>
    </div>
  </div>
</template>

<style scoped>
.collection-page {
  margin: 3rem auto 0;
  padding: 0.25rem;
}

/* Header Section */
.header-section {
  text-align: left;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
}

.collection-title {
  text-transform: uppercase;
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 1rem;
  letter-spacing: 0.02em;
  color: #1a1a1a;
}

/* Filter and Sort Section */
.filter-sort-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.filter-controls {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
}

.filter-btn,
.filter-dropdown .el-button,
.sort-control .el-button {
  color: #1a1a1a;
  font-size: 0.9rem;
  font-weight: 400;
  padding: 0;
  border: none;
  background: none;
}

.filter-btn:hover,
.filter-dropdown .el-button:hover,
.sort-control .el-button:hover {
  color: #666;
}

/* Product Grid */
.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  margin-bottom: 3rem;
}

.product-card {
  position: relative;
  cursor: pointer;
}

.product-image-container {
  position: relative;
  width: 100%;
  /* Use aspect-ratio for modern browsers */
  aspect-ratio: 4/5;
  overflow: hidden;
  background-color: #f5f5f5; /* Fallback background */
}

/* Fallback for older browsers that don't support aspect-ratio */
.product-image-container::before {
  content: '';
  display: block;
  padding-top: 125%; /* 5/4 = 1.25 = 125% for 4:5 aspect ratio */
}

.product-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease;
}

/* Optional: Add hover effect */
.product-card:hover .product-image {
  transform: scale(1.05);
}

/* Product Info */
.product-info {
  text-align: left;
  padding-top: 0.75rem;
}

.product-name {
  font-size: 0.9rem;
  font-weight: 400;
  color: #1a1a1a;
  letter-spacing: 0.01em;
  line-height: 1.4;
  margin: 0 0 0.5rem 0;
}

.product-price {
  font-size: 0.95rem;
  margin: 0;
  font-weight: 500;
  color: #333;
}

@media screen and (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .product-name {
    font-size: 1rem;
  }
}

@media screen and (min-width: 1025px) {
  .product-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }

  .product-info {
    padding-top: 1rem;
  }
}
</style>
