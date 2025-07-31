<script setup lang="ts">
import AppHeader from '@/components/app/AppHeader.vue'
</script>

<template>
  <AppHeader />

  <div class="wrapper">
    <RouterView />
  </div>
</template>

<style scoped>
.wrapper {
  /* margin: 145px auto 0 auto; */
  width: 100%;
  /* max-width: 1200px; */
}
</style>
