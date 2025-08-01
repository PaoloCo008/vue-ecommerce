<script setup lang="ts">
import AuthWrapper from '@/components/auth/AuthTransitionWrapper.vue'

import type { AuthMode } from '@/lib/types/stores'
import { useAuthStore } from '@/stores/AuthStore'
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const authStore = useAuthStore()

const step = computed(() => authStore.getAuthCurrentStep)

watchEffect(() => {
  authStore.setAuthMode(route.meta.operation as AuthMode)
})
</script>

<template>
  <div class="page-wrapper">
    <div class="container" :style="{ overflow: step === 4 ? 'scroll' : 'hidden' }">
      <AuthWrapper :key="route.meta.operation as AuthMode" />
    </div>
  </div>
</template>

<style scoped>
.page-wrapper {
  width: 100vw;
  background-color: #fff;
  padding: 1.5rem 1rem 1.25rem;
  transform: translateY(-30px);
  overflow: hidden;
  height: 480px;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 550px;
  width: 100%;
  flex: 1;
  margin: 0 auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.container::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}
</style>
