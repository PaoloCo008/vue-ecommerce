<script setup lang="ts">
import { useRoute } from 'vue-router'
import AppModal from './AppModal.vue'
import AuthWrapper from '../auth/AuthTransitionWrapper.vue'

const route = useRoute()

const dialogStyle = {
  width: '95vw',
  maxWidth: '450px',
  height: '400px',
}
</script>

<template>
  <div class="header-links">
    <template v-if="route.path === '/login-signup'">
      <RouterLink to="/login-signup">login</RouterLink>
      <RouterLink to="/login-signup">signup</RouterLink>
    </template>

    <template v-else>
      <AppModal :dialog-style="dialogStyle">
        <template #trigger="props">
          <el-button @click="props.onTriggerClick" text>Login</el-button>
        </template>

        <AuthWrapper operation="logIn" />
      </AppModal>

      <AppModal :dialog-style="dialogStyle">
        <template #trigger="props">
          <el-button @click="props.onTriggerClick" text class="signup-button">Signup</el-button>
        </template>

        <AuthWrapper operation="signUp" />
      </AppModal>
    </template>
  </div>
</template>

<style scoped>
a {
  display: flex;
  align-items: center;
  height: 32px;
}

.header-links {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  max-width: 1200px;
  text-transform: uppercase;
  font-size: 0.75rem;
  gap: 2rem;
  margin: 0 auto;
}

.header-links :deep(.el-button) {
  text-transform: uppercase;
  font-size: 0.75rem;
  color: #00bd7e;
  font-weight: 500;
  padding: 3px;
  border-radius: 0;
}

.header-links :deep(.el-button:hover) {
  background-color: #bfe6dd;
}

.signup-button {
  margin: 0;
}
</style>
