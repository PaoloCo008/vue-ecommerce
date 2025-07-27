import { hideEmail } from '../../lib/helpers';
<script lang="ts" setup>
import { hideEmail } from '@/lib/helpers'

defineProps<{ name: string; email: string }>()
</script>

<template>
  <el-card class="profile-card">
    <template #header>
      <div class="card-header">
        <span class="header-title">Personal Profile</span>
        <RouterLink :to="{ name: 'edit-profile', params: { id: 1 } }">EDIT</RouterLink>
      </div>
    </template>
    <div class="profile-content">
      <p class="user-name">{{ name }}</p>
      <p class="user-email">{{ hideEmail(email) }}</p>
      <div class="preferences">
        <el-checkbox disabled> Receive marketing SMS </el-checkbox>
        <el-checkbox disabled> Receive marketing emails </el-checkbox>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.profile-card {
  margin-bottom: 20px;
}

:deep(.el-card .el-card__header) {
  background-color: transparent;
}

.card-header {
  display: flex;
  gap: 0.25rem;
  font-weight: 600;
}
</style>
