<script setup lang="ts">
import AuthWrapper from '@/components/auth/AuthTransitionWrapper.vue'

import type { AuthMode } from '@/lib/types/stores'
import { useAuthStore } from '@/stores/AuthStore'
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const authStore = useAuthStore()

console.log(route.meta.operation)

watchEffect(() => {
  authStore.setAuthMode(route.meta.operation as AuthMode)
})
</script>

<template>
  <Teleport to="body">
    <div class="wrapper">
      <AuthWrapper :key="route.meta.operation as AuthMode" />
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
