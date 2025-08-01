<script setup lang="ts">
import AppFooter from '@/components/app/AppFooter.vue'
import AppHeader from '@/components/app/AppHeader.vue'
</script>

<template>
  <div class="default-layout">
    <AppHeader />

    <div class="wrapper">
      <RouterView />
    </div>

    <AppFooter />
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
}

.default-layout {
  display: grid;
  grid-template-rows: auto;
  height: 100vh;
  gap: 3rem;
}
</style>
