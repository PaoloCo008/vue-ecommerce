<script lang="ts" setup>
import ProfileContentLayout from '@/layouts/ProfileContentLayout.vue'
import { ref } from 'vue'

const form = ref({
  fullName: 'Paolo Co',
  email: 'pa***********@gmail.com',
  mobile: '+63 091******71',
  birthMonth: '',
  birthDay: '',
  birthYear: '',
  gender: '',
  receiveMarketingEmails: false,
  receiveMarketingSMS: false,
})

const months = ref([
  { value: 'january', label: 'January' },
  { value: 'february', label: 'February' },
  { value: 'march', label: 'March' },
  { value: 'april', label: 'April' },
  { value: 'may', label: 'May' },
  { value: 'june', label: 'June' },
  { value: 'july', label: 'July' },
  { value: 'august', label: 'August' },
  { value: 'september', label: 'September' },
  { value: 'october', label: 'October' },
  { value: 'november', label: 'November' },
  { value: 'december', label: 'December' },
])

const days = ref(Array.from({ length: 31 }, (_, i) => i + 1))

const years = ref(Array.from({ length: 100 }, (_, i) => 2024 - i))

const changeEmail = () => {
  console.log('Change email clicked')
}

const changeMobile = () => {
  console.log('Change mobile clicked')
}

const saveChanges = () => {
  console.log('Save changes clicked', form.value)
}
</script>

<template>
  <ProfileContentLayout page-title="Edit Profile">
    <el-form :model="form" label-position="top" class="profile-form-container">
      <div class="form-group">
        <el-form-item label="Full Name" class="flex-grow">
          <el-input v-model="form.fullName" placeholder="Enter your full name" class="form-input" />
        </el-form-item>

        <el-form-item>
          <div class="item-label">
            <span>Email Address</span>
            <el-button link type="primary" size="small" @click="changeEmail" class="change-link">
              | Change
            </el-button>
          </div>

          <p>pa***********@gmail.com</p>
        </el-form-item>

        <el-form-item>
          <div class="item-label">
            <span>Mobile</span>
            <el-button link type="primary" size="small" @click="changeMobile" class="change-link">
              | Change
            </el-button>
          </div>

          <p>+63 091******71</p>
        </el-form-item>
      </div>

      <div class="form-group">
        <el-form-item label="Birthday" class="flex-grow">
          <div class="birthday-selects">
            <el-select v-model="form.birthMonth" placeholder="Month" class="birthday-select">
              <el-option
                v-for="month in months"
                :key="month.value"
                :label="month.label"
                :value="month.value"
              />
            </el-select>

            <el-select v-model="form.birthDay" placeholder="Day" class="birthday-select">
              <el-option v-for="day in days" :key="day" :label="day" :value="day" />
            </el-select>

            <el-select v-model="form.birthYear" placeholder="Year" class="birthday-select">
              <el-option v-for="year in years" :key="year" :label="year" :value="year" />
            </el-select>
          </div>
        </el-form-item>

        <el-form-item label="Gender" class="flex-grow">
          <el-select v-model="form.gender" placeholder="Select" class="form-input">
            <el-option label="Male" value="male" />
            <el-option label="Female" value="female" />
            <el-option label="Other" value="other" />
            <el-option label="Prefer not to say" value="prefer_not_to_say" />
          </el-select>
        </el-form-item>
      </div>

      <!-- Save Button -->

      <el-button type="primary" class="save-button" @click="saveChanges"> SAVE CHANGES </el-button>
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
  margin-top: 20px;
}

.save-button:hover {
  background-color: #e55a2b;
  border-color: #e55a2b;
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
