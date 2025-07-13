<template>
  <div class="profile-form">
    <el-form :model="form" label-position="top" class="profile-form-container">
      <!-- First Row -->
      <el-row :gutter="40">
        <el-col :span="8">
          <el-form-item label="Full Name">
            <el-input 
              v-model="form.fullName" 
              placeholder="Enter your full name"
              class="form-input"
            />
          </el-form-item>
        </el-col>
        
        <el-col :span="8">
          <el-form-item>
            <template #label>
              <span>Email Address</span>
              <el-button link type="primary" size="small" @click="changeEmail" class="change-link">
                | Change
              </el-button>
            </template>
            <el-input 
              v-model="form.email" 
              disabled
              class="form-input disabled-input"
            />
            <el-checkbox v-model="form.receiveMarketingEmails" class="marketing-checkbox">
              Receive marketing emails
            </el-checkbox>
          </el-form-item>
        </el-col>
        
        <el-col :span="8">
          <el-form-item>
            <template #label>
              <span>Mobile</span>
              <el-button link type="primary" size="small" @click="changeMobile" class="change-link">
                | Change
              </el-button>
            </template>
            <el-input 
              v-model="form.mobile" 
              disabled
              class="form-input disabled-input"
            />
            <el-checkbox v-model="form.receiveMarketingSMS" class="marketing-checkbox">
              Receive marketing SMS
            </el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- Second Row -->
      <el-row :gutter="40">
        <el-col :span="8">
          <el-form-item label="Birthday">
            <el-input 
              v-model="form.birthday" 
              placeholder="Please enter your birthday"
              class="form-input"
            />
          </el-form-item>
        </el-col>
        
        <el-col :span="8">
          <el-form-item label="Gender">
            <el-input 
              v-model="form.gender" 
              placeholder="Please enter your gender"
              class="form-input"
            />
          </el-form-item>
        </el-col>
        
        <el-col :span="8">
          <!-- Empty column for spacing -->
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ProfileForm',
  setup() {
    const form = ref({
      fullName: 'Paolo Co',
      email: 'pa***********@gmail.com',
      mobile: '+63 091******71',
      birthday: '',
      gender: '',
      receiveMarketingEmails: false,
      receiveMarketingSMS: false
    })

    const changeEmail = () => {
      console.log('Change email clicked')
    }

    const changeMobile = () => {
      console.log('Change mobile clicked')
    }

    return {
      form,
      changeEmail,
      changeMobile
    }
  }
}
</script>

<style scoped>
.profile-form {
  padding: 20px;
  background-color: #fff;
}

.profile-form-container {
  max-width: 1200px;
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
</style>