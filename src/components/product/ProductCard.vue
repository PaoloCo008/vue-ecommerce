<script lang="ts" setup>
import type { Product } from '@/lib/types/globals'
import { formatPrice, formatProductSlug, truncate } from '../../lib/helpers'
import { useProductStore } from '@/stores/ProductStore'
import { useRouter } from 'vue-router'

const props = defineProps<{ product: Product }>()

const productStore = useProductStore()
const router = useRouter()

const productPrimaryImage = productStore.getProductPrimaryImageById(props.product._id)

function handleProductClick() {
  router.push({
    name: 'product',
    params: { slug: formatProductSlug(props.product.slug, props.product._id) },
  })
}
</script>
<template>
  <div class="product-card" @click="handleProductClick">
    <el-card>
      <img :src="productPrimaryImage" :alt="product.name" />
      <div class="card-body">
        <p class="card-title">
          {{ truncate(product.name, 35) }}
        </p>
        <p class="card-price">{{ formatPrice(product.price) }}</p>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.product-card {
  cursor: pointer;
}

.el-card {
  width: 190px;
  height: 275px;
  border: none;
}

a {
  padding: unset;
}

.el-card:hover,
a:focus-within {
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
}

:deep(.el-card__body) {
  padding: 0;
}

img {
  width: 100%;
  height: 190px;
  object-fit: cover;
  display: block;
}

.card-body {
  margin: 0.5rem 0.625rem 0rem;
}

.card-title {
  font-size: 0.875rem;
  font-weight: 500;
  height: 36px;
  line-height: 18px;
  word-wrap: break-word;
}

.card-price {
  color: var(--color-main);
  margin-top: 0.25rem;
  font-size: 1.125rem;
}

@media (hover: hover) {
  a:hover {
    background-color: unset;
  }
}
</style>
