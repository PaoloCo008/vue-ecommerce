<script setup lang="ts">
import AuthWrapper from '@/components/auth/AuthTransitionWrapper.vue'
</script>

<template>
  <Teleport to="body">
    <div class="wrapper">
      <AuthWrapper />
    </div>
  </Teleport>
</template>

<style scoped>
.wrapper {
  width: 100vw;
  background-color: #fff;
  padding: 3rem 1rem 1.25rem;
  transform: translateY(-30px);
  overflow: hidden;
}
</style>
