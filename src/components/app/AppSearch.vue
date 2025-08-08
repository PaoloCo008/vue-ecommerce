<script lang="ts" setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useProductStore } from '@/stores/ProductStore'
import { useRouter } from 'vue-router'
import type { Product } from '@/lib/types/globals'
import { formatProductSlug } from '@/lib/helpers'

const input = ref('')
const productStore = useProductStore()
const router = useRouter()

const searchProducts = (queryString: string, callback: Function) => {
  if (!queryString) {
    callback([])
    return
  }

  const results = productStore.products.filter((product) =>
    product.name.toLowerCase().includes(queryString.toLowerCase()),
  )

  callback(results.slice(0, 5))
}

const goToProduct = (product: Product) => {
  router.push({
    name: 'product',
    params: { slug: formatProductSlug(product.slug, product._id) },
  })
}

const handleSearchButton = () => {
  if (!input.value.trim()) return

  // Find the first matching product
  const firstMatch = productStore.products.find((product) =>
    product.name.toLowerCase().includes(input.value.toLowerCase()),
  )

  if (firstMatch) {
    goToProduct(firstMatch)
  } else {
    // Navigate to search results if no exact match
    router.push({
      name: 'search',
      query: { q: input.value },
    })
  }
}
</script>

<template>
  <div class="search-wrapper">
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="searchProducts"
      placeholder="Search in Shop"
      @select="goToProduct"
      clearable
      :debounce="300"
      class="search-input"
      popper-class="shop-suggestions"
    >
      <!-- Product suggestion template -->
      <template #default="{ item }">
        <div class="product-suggestion">
          <img
            :src="productStore.getProductPrimaryImageById(item._id)"
            alt=""
            class="product-image"
          />
          <div class="product-info">
            <div class="product-name">{{ item.name }}</div>
            <div class="product-price">${{ item.price }}</div>
            <!-- <div class="product-category">{{ item.category }}</div> -->
          </div>
        </div>
      </template>
    </el-autocomplete>
    <button class="search-button" @click="handleSearchButton">
      <el-icon size="20px" color="#fff">
        <Search />
      </el-icon>
    </button>
  </div>
</template>

<style scoped>
.search-wrapper {
  display: none;
}

.search-button {
  background-color: var(--color-main);
  border: none;
  min-width: 43px;
  height: 43px;
  border: 2px solid var(--color-main);
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.search-button:hover,
.search-button:focus {
  border: 2px solid var(--color-focus);
}

@media screen and (min-width: 550px) {
  :deep(.el-input) {
    height: 100%;
  }

  .search-wrapper {
    display: flex;
    width: 100%;
    max-width: 700px;
    margin-left: 60px;
  }

  .search-input {
    flex: 1;
  }

  .search-input :deep(.el-input__wrapper) {
    padding: 6px 20px;
    background-color: #eff0f5;
    border-radius: 0;
    box-shadow: none;
    border: 1px solid #ddd;
  }

  .search-input :deep(.el-input__wrapper:hover) {
    border-color: var(--color-main);
  }

  .search-input :deep(.el-input__wrapper.is-focus) {
    border-color: var(--color-main);
    background-color: white;
    box-shadow: none;
  }

  .search-input :deep(.el-input__inner) {
    font-size: 0.875rem;
    color: #333;
  }

  .search-input :deep(.el-input__inner::placeholder) {
    color: #999;
  }
}

/* Suggestions dropdown styling */
:deep(.shop-suggestions) {
  border: 1px solid #ddd;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

:deep(.shop-suggestions .el-autocomplete-suggestion__wrap) {
  max-height: 300px;
}

/* Product suggestion item styling */
.product-suggestion {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
}

.product-suggestion:hover {
  background-color: #f9f9f9;
}

.product-image {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 12px;
  flex-shrink: 0;
}

.product-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.product-name {
  font-weight: 500;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-price {
  color: var(--color-main, #ff6600);
  font-weight: 600;
}

/* .product-category {
  font-size: 0.75rem;
  color: #666;
} */
</style>
