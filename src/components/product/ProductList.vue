<script setup lang="ts">
import ProductCard from '@/components/product/ProductCard.vue'
import { useProductStore } from '@/stores/ProductStore'

const productStore = useProductStore()
</script>

<template>
  <el-space wrap :size="[12, 30]">
    <ProductCard v-for="product in productStore.products" :key="product._id" :product="product" />
  </el-space>
</template>

<style>
.el-space {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  row-gap: 100px;
  place-content: center;
  padding: 0 1.5rem 1.5rem;
}

.el-space__item {
  justify-content: center;
}

.el-space__item > * {
  flex-grow: 0;
}
</style>
