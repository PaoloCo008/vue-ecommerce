<script lang="ts" setup>
import ProfileContentLayout from '@/layouts/ProfileContentLayout.vue'

import { useAuthStore } from '@/stores/AuthStore'
import { useUserStore } from '@/stores/UserStore'
import { subYears } from 'date-fns'
import { ElMessage } from 'element-plus'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const authStore = useAuthStore()

const user = userStore.getUserById(authStore.user as string)

const editProfileForm = ref({
  fullName: user!.fullName,
  birthday: user!.birthday,
  gender: user!.gender,
  receiveMarketingEmails: user!.receiveMarketingEmails,
  receiveMarketingSMS: user!.receiveMarketingSMS,
})

const lastDate = computed(() => subYears(new Date(), 100))

const saveChanges = () => {
  userStore.editUser(user!._id, {
    fullName: editProfileForm.value.fullName,
    birthday: editProfileForm.value.birthday,
    gender: editProfileForm.value.gender,
    receiveMarketingEmails: editProfileForm.value.receiveMarketingEmails,
    receiveMarketingSMS: editProfileForm.value.receiveMarketingSMS,
  })

  router.push({ name: 'myprofile', params: { id: user!._id } })
  ElMessage.success('Profile updated successfully!')
}
</script>

<template>
  <ProfileContentLayout page-title="Edit Profile">
    <el-form
      :model="editProfileForm"
      label-position="top"
      class="profile-form-container"
      @submit.prevent="saveChanges"
    >
      <div class="form-group">
        <el-form-item label="Full Name" class="flex-grow">
          <el-input
            v-model="editProfileForm.fullName"
            placeholder="Enter your full name"
            class="form-input"
          />
        </el-form-item>

        <el-form-item class="item-label">
          <div>
            <span>Email Address</span>
          </div>

          <p>pa***********@gmail.com</p>
          <el-checkbox v-model="editProfileForm.receiveMarketingEmails" class="marketing-checkbox">
            Receive marketing emails
          </el-checkbox>
        </el-form-item>

        <el-form-item class="item-label">
          <div>
            <span>Mobile</span>
          </div>

          <p>+63 091******71</p>
          <el-checkbox v-model="editProfileForm.receiveMarketingSMS" class="marketing-checkbox">
            Receive marketing SMS
          </el-checkbox>
        </el-form-item>
      </div>

      <div class="form-group">
        <el-form-item label="Birthday" class="flex-grow">
          <div class="birthday-selects">
            <el-date-picker
              v-model="editProfileForm.birthday"
              placeholder="Please select your birthday"
              class="birthday-select"
              :editable="false"
              :disabled-date="(date: Date) => date > new Date() || date < lastDate"
            />
          </div>
        </el-form-item>

        <el-form-item label="Gender" class="flex-grow gender-select">
          <el-select v-model="editProfileForm.gender" placeholder="Select" class="form-input">
            <el-option label="Male" value="male" />
            <el-option label="Female" value="female" />
            <el-option label="Other" value="other" />
          </el-select>
        </el-form-item>
      </div>

      <!-- Save Button -->
      <el-button type="primary" class="save-button" native-type="submit"> SAVE CHANGES </el-button>
      <el-button class="cancel-button cancel" @click="router.push({ name: 'myprofile' })"
        >cancel</el-button
      >
    </el-form>
  </ProfileContentLayout>
</template>

<style scoped>
.profile-form-container {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background-color: #fff;
  max-width: 1200px;
  gap: 1rem;
}

.form-input {
  width: 100%;
  margin-bottom: 8px;
}

.flex-grow {
  flex-grow: 1;
}

.item-label {
  display: flex;
  align-items: center;
  flex-grow: 1;
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

.birthday-selects {
  display: flex;
  width: 100%;
}

.birthday-select {
  flex: 1;
}

.gender-select {
  flex-grow: 2;
}

:deep(.el-input__prefix) {
  display: none;
}

.save-button {
  width: 100%;
  max-width: 300px;
  background-color: #ff6b35;
  border-color: #ff6b35;
  color: white;
  font-weight: 600;
  padding: 1.25rem 0;
  font-size: 14px;
  border-radius: unset;
}

.save-button:hover {
  background-color: #e55a2b;
  border-color: #e55a2b;
}

.cancel-button {
  border-radius: unset;
  width: 100%;
  max-width: 300px;
  background-color: #e0e0e0;
  border-color: #e0e0e0;
  color: #666;
  padding: 1.25rem 0;
  font-weight: 500;
  text-transform: capitalize;
  margin-left: 0;
}

.cancel-button:hover {
  background-color: #d0d0d0;
  border-color: #d0d0d0;
}

:deep(.el-form-item__label) {
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  padding-bottom: 0;
}

:deep(.el-input__inner) {
  border-radius: 4px;
  padding: 1.125rem 0;
  font-size: 14px;
}

:deep(.el-form-item__content) {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

:deep(.el-select .el-input__inner) {
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

@media screen and (min-width: 950px) {
  .form-group {
    display: flex;
    gap: 2rem;
  }
}
</style>
