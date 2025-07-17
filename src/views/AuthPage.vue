<script setup lang="ts">
import AuthWrapper from '@/components/auth/AuthTransitionWrapper.vue'
import type { AuthStages } from '@/lib/types/globals'
import { useRoute } from 'vue-router'

const route = useRoute()
console.log(route.meta.operation)
</script>

<template>
  <Teleport to="body">
    <div class="wrapper">
      <AuthWrapper
        :operation="$route.meta.operation as AuthStages"
        :key="route.meta.operation as AuthStages"
      />
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
