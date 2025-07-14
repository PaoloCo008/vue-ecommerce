<template>
  <ProfileContentLayout page-title="My Profile">
    <div class="profile">
      <div class="profile-group">
        <div>
          <span class="group-item__header">Full Name</span>
          <p>Paolo Co</p>
        </div>

        <div>
          <span class="group-item__header">Email Address</span>
          <el-button link type="primary" size="small" @click="changeEmail" class="change-link">
            | Change
          </el-button>
          <p>pa***********@gmail.com</p>
        </div>

        <div>
          <span class="group-item__header">Mobile</span>
          <el-button link type="primary" size="small" @click="changeEmail" class="change-link">
            | Change
          </el-button>
          <p>+63 091******71</p>
        </div>
      </div>

      <div class="profile-group">
        <div>
          <span class="group-item__header">Birthday</span>

          <p>Please enter your birthday</p>
        </div>

        <div>
          <span class="group-item__header">Gender</span>

          <p>Please enter your gender</p>
        </div>
      </div>

      <el-button
        class="edit-button"
        @click="router.push({ name: 'editprofile', params: { id: 1 } })"
        >EDIT PROFILE</el-button
      >
    </div>
  </ProfileContentLayout>
</template>

<script setup lang="ts">
import ProfileContentLayout from '@/layouts/ProfileContentLayout.vue'
import router from '@/router'
import type { preProcessFile } from 'typescript'
import { ref } from 'vue'

const form = ref({
  fullName: 'Paolo Co',
  email: 'pa***********@gmail.com',
  mobile: '+63 091******71',
  birthday: '',
  gender: '',
  receiveMarketingEmails: false,
  receiveMarketingSMS: false,
})

const changeEmail = () => {
  console.log('Change email clicked')
}

const changeMobile = () => {
  console.log('Change mobile clicked')
}
</script>

<style scoped>
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
