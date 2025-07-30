<script setup lang="ts">
defineProps<{ pageTitle: string }>()
</script>

<template>
  <el-main class="main-content">
    <h2 class="page-title">{{ pageTitle }}</h2>
    <slot></slot>
  </el-main>
</template>

<style>
.main-content {
  display: grid;
  grid-template-columns: 1fr;
  padding: 30px;
  margin-top: 1rem;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 30px;
}

@media screen and (min-width: 750px) {
  .main-content {
    padding: 0 30px 30px 0;
  }
}
</style>
