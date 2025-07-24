<script setup lang="ts">
import ProfileContentLayout from '@/layouts/ProfileContentLayout.vue'
import { capitalize, hideEmail } from '@/lib/helpers'

import router from '@/router'
import { useAuthStore } from '@/stores/AuthStore'
import { useUserStore } from '@/stores/UserStore'
import { format } from 'date-fns'

const authStore = useAuthStore()
const userStore = useUserStore()

const user = userStore.getUserById(authStore.user as string)
</script>

<template>
  <ProfileContentLayout page-title="My Profile">
    <div class="profile">
      <div class="profile-group">
        <div>
          <span class="group-item__header">Full Name</span>
          <p>{{ user?.fullName || 'Please enter your full name' }}</p>
        </div>

        <div>
          <span class="group-item__header">Email Address</span>
          <el-button
            link
            type="primary"
            size="small"
            @click="router.push({ name: 'verification-methods', query: { for: 'change-email' } })"
            class="change-link"
          >
            | Change
          </el-button>
          <p>{{ hideEmail(user!.email) }}</p>
          <el-checkbox disabled v-model="user!.receiveMarketingEmails" class="marketing-checkbox">
            Receive marketing emails
          </el-checkbox>
        </div>

        <div>
          <span class="group-item__header">Mobile</span>
          <el-button
            link
            type="primary"
            size="small"
            @click="router.push({ name: 'verification-methods', query: { for: 'change-number' } })"
            class="change-link"
          >
            | Change
          </el-button>
          <p>+63 {{ user!.mobileNumber || 'Please enter your mobile number' }}</p>
          <el-checkbox disabled v-model="user!.receiveMarketingSMS" class="marketing-checkbox">
            Receive marketing SMS
          </el-checkbox>
        </div>
      </div>

      <div class="profile-group">
        <div>
          <span class="group-item__header">Birthday</span>

          <p>
            {{
              user?.birthday
                ? format(user!.birthday as Date, 'yyyy-dd-MM')
                : 'Please enter your birthday'
            }}
          </p>
        </div>

        <div>
          <span class="group-item__header">Gender</span>

          <p>
            {{ user?.gender ? capitalize(user!.gender as string) : 'Please enter your gender' }}
          </p>
        </div>
      </div>

      <div class="action-buttons">
        <el-button class="edit-button" @click="router.push({ name: 'editprofile' })"
          >EDIT PROFILE</el-button
        >
        <el-button
          class="edit-button"
          @click="router.push({ name: 'verification-methods', query: { for: 'reset-password' } })"
          >CHANGE PASSWORD</el-button
        >
      </div>
    </div>
  </ProfileContentLayout>
</template>

<style scoped>
.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.profile {
  padding: 20px;
  background-color: #fff;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.profile-group {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.profile-group:first-child {
  margin-bottom: 1rem;
}

.group-item__header {
  font-size: 0.75rem;
  display: inline-block;
  margin-bottom: 0.75rem;
}

.form-input {
  width: 100%;
  margin-bottom: 8px;
}

.disabled-input {
  background-color: #f5f5f5;
}

.marketing-checkbox {
  font-size: 14px;
  color: #666;
  margin-top: 8px;
}

.change-link {
  margin-left: 4px;
  padding: 0;
  font-size: 14px;
  text-decoration: none;
}

.edit-button {
  width: 100%;
  max-width: 300px;
  background-color: #ff6b35;
  border-color: #ff6b35;
  color: white;
  font-weight: 600;
  padding: 1.25rem 0;
  font-size: 14px;
  border-radius: unset;
  margin-top: 20px;
}

.edit-button:last-of-type {
  margin: 0;
}

:deep(.el-form-item__label) {
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  padding-bottom: 0;
}

:deep(.el-input__inner) {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
}

:deep(.el-input.is-disabled .el-input__inner) {
  background-color: #f5f5f5;
  color: #666;
  cursor: not-allowed;
}

:deep(.el-checkbox__label) {
  font-size: 14px;
  color: #666;
}

:deep(.el-form-item) {
  margin-bottom: 24px;
}

:deep(.el-button--primary.is-link) {
  color: #20b2aa;
  font-weight: normal;
}

:deep(.el-button--primary.is-link:hover) {
  color: #1a9d96;
}

@media screen and (min-width: 900px) {
  .profile-group {
    display: grid;
    grid-template-columns: 200px 200px 1fr;
  }
}
</style>
