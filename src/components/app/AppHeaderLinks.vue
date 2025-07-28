<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import AppModal from './AppModal.vue'
import AuthTransitionWrapper from '../auth/AuthTransitionWrapper.vue'
import { useAuthStore } from '@/stores/AuthStore'
import type { AuthMode } from '@/lib/types/stores'
import { useUserStore } from '@/stores/UserStore'
import { LogOut, Package2, Smile } from 'lucide-vue-next'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()

const dialogStyle = {
  width: '100%',
  maxWidth: '450px',
  height: '450px',
}

const authStore = useAuthStore()
const userStore = useUserStore()

const dropdownText = computed(() => {
  const user = userStore.getUserById(authStore.user as string)

  return user?.fullName ? `${user.fullName}'s account` : 'My Account'
})

function handleClick(openFn: () => void, authMode: AuthMode) {
  openFn()
  authStore.setAuthMode(authMode)
}

function handleLogout() {
  authStore.logout()

  const currentRoute = route
  const publicRoutes = ['homepage', 'product']

  if (!publicRoutes.includes(currentRoute.name as string)) {
    router.push({
      name: 'login',
      query: { redirect: currentRoute.fullPath },
    })
  }
}
</script>

<template>
  <div class="header-links">
    <template v-if="route.path === '/login-signup'">
      <RouterLink :to="{ name: 'login' }">login</RouterLink>
      <RouterLink :to="{ name: 'signup' }">signup</RouterLink>
    </template>

    <template v-else-if="authStore.isAuthenticated">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ dropdownText }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="router.push({ name: 'profile' })">
              <el-button class="button-link" link>
                <Smile :size="16" /><span class="button-text">Manage my profile</span>
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item @click="router.push({ name: 'orders' })">
              <el-button class="button-link" link
                ><Package2 :size="16" /><span class="button-text">My Orders</span>
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item @click="handleLogout">
              <el-button class="button-link" link
                ><LogOut :size="16" /><span class="button-text"> Logout </span></el-button
              >
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>

    <template v-else>
      <AppModal :dialog-style="dialogStyle">
        <template #trigger="props">
          <el-button @click="handleClick(props.onTriggerClick, 'login')" text>Login</el-button>
        </template>

        <template #default="props">
          <AuthTransitionWrapper :close-modal="props.closeModal" />
        </template>
      </AppModal>

      <AppModal :dialog-style="dialogStyle">
        <template #trigger="props">
          <el-button @click="handleClick(props.onTriggerClick, 'signup')" text class="signup-button"
            >Signup</el-button
          >
        </template>

        <AuthTransitionWrapper />
      </AppModal>
    </template>
  </div>
</template>

<style scoped>
a {
  display: flex;
  align-items: center;
  height: 32px;
  gap: 5px;
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

.header-links .el-button {
  text-transform: uppercase;
  font-size: 0.75rem;
  color: #00bd7e;
  padding: 3px;
  border-radius: 0;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  height: 32px;
}

.header-links .el-button:hover {
  background-color: #bfe6dd;
}

.signup-button {
  margin: 0;
}

.el-button {
  --el-button-active-color: #00bd7e;
}

.button-link {
  color: #00bd7e;
}

.button-text {
  margin-left: 5px;
  font-weight: 500;
}

/* Element Plus Dropdown Trigger Styling */
.header-links .el-dropdown {
  height: 32px;
}

.header-links .el-dropdown .el-dropdown-link {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  text-transform: uppercase;
  font-size: 0.75rem;
  color: #00bd7e;
  padding: 3px;
  border-radius: 0;
  background: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  text-decoration: none;
}

.header-links .el-dropdown .el-dropdown-link:hover {
  background-color: #bfe6dd;
}

/* Element Plus Dropdown Menu Styling */
.custom-dropdown-menu .el-dropdown-menu__item {
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 500;
  color: #333;
  padding: 8px 12px;
}

.custom-dropdown-menu .el-dropdown-menu__item:hover {
  background-color: #bfe6dd;
  color: #00bd7e;
}

/* Remove default Element Plus dropdown arrow */
.header-links .el-dropdown .el-icon {
  display: none;
}

/* a {
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
} */
</style>
