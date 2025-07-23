<script setup lang="ts">
import ProfileContentLayout from '@/layouts/ProfileContentLayout.vue'
</script>

<template>
  <div class="container">
    <ProfileContentLayout page-title="Security Verification">
      <RouterView />
    </ProfileContentLayout>
  </div>
</template>

<style scoped>
.container {
  max-width: 810px;
  width: 100%;
  margin: 0 auto;
}
</style>
