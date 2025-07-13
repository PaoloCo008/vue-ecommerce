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
            <div class="birthday-selects">
              <el-select 
                v-model="form.birthMonth" 
                placeholder="Month"
                class="birthday-select"
              >
                <el-option 
                  v-for="month in months" 
                  :key="month.value" 
                  :label="month.label" 
                  :value="month.value"
                />
              </el-select>
              
              <el-select 
                v-model="form.birthDay" 
                placeholder="Day"
                class="birthday-select"
              >
                <el-option 
                  v-for="day in days" 
                  :key="day" 
                  :label="day" 
                  :value="day"
                />
              </el-select>
              
              <el-select 
                v-model="form.birthYear" 
                placeholder="Year"
                class="birthday-select"
              >
                <el-option 
                  v-for="year in years" 
                  :key="year" 
                  :label="year" 
                  :value="year"
                />
              </el-select>
            </div>
          </el-form-item>
        </el-col>
        
        <el-col :span="8">
          <el-form-item label="Gender">
            <el-select 
              v-model="form.gender" 
              placeholder="Select"
              class="form-input"
            >
              <el-option label="Male" value="male" />
              <el-option label="Female" value="female" />
              <el-option label="Other" value="other" />
              <el-option label="Prefer not to say" value="prefer_not_to_say" />
            </el-select>
          </el-form-item>
        </el-col>
        
        <el-col :span="8">
          <!-- Empty column for spacing -->
        </el-col>
      </el-row>

      <!-- Save Button -->
      <el-row>
        <el-col :span="8">
          <el-button 
            type="primary" 
            class="save-button"
            @click="saveChanges"
          >
            SAVE CHANGES
          </el-button>
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
      birthMonth: '',
      birthDay: '',
      birthYear: '',
      gender: '',
      receiveMarketingEmails: false,
      receiveMarketingSMS: false
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
      { value: 'december', label: 'December' }
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

    return {
      form,
      months,
      days,
      years,
      changeEmail,
      changeMobile,
      saveChanges
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

.birthday-selects {
  display: flex;
  gap: 8px;
}

.birthday-select {
  flex: 1;
}

.save-button {
  width: 100%;
  background-color: #ff6b35;
  border-color: #ff6b35;
  color: white;
  font-weight: 600;
  padding: 12px 0;
  font-size: 14px;
  border-radius: 4px;
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
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
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
</style>