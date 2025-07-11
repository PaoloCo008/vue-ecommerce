<script lang="ts" setup>
import { formatPrice, truncate } from '../../lib/helpers'
</script>
<template>
  <RouterLink :to="{ name: 'product', params: { slug: 'some-name' } }">
    <el-card>
      <img src="/Product+Showcase-1.jpg" alt="" />
      <div class="card-body">
        <p class="card-title">
          {{ truncate('SomeAWDADWAWDAWDtextSome textSome textSome textSome textaawd', 35) }}
        </p>
        <p class="card-price">{{ formatPrice(19.116) }}</p>
      </div>
    </el-card>
  </RouterLink>
</template>

<style scoped>
.el-card {
  max-width: 190px;
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
