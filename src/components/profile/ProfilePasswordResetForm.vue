<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { View, Hide } from '@element-plus/icons-vue'
import ProfileContentLayout from '@/layouts/ProfileContentLayout.vue'
import { ElMessage, type FormInstance } from 'element-plus'
import { useAuthStore } from '@/stores/AuthStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const passwordResetFormRef = ref<FormInstance>()
const passwordResetForm = reactive({
  newPassword: 'TestPassword123*',
  passwordConfirm: 'TestPassword123*',
})
const showPassword = ref(false)
const showConfirm = ref(false)

const rules = reactive({
  newPassword: [
    {
      required: true,
      message: 'Please enter your new password',
      trigger: 'blur',
    },
    {
      min: 8,
      max: 20,
      message: 'Password length should be 8-20 characters',
      trigger: 'blur',
    },
    {
      validator: (rule, value, callback) => {
        if (!value) {
          callback()
          return
        }

        // Check for alphabets, numbers and special characters
        const hasAlpha = /[a-zA-Z]/.test(value)
        const hasNumber = /\d/.test(value)
        const hasSpecial = /[~!@#$%^&*<>]/.test(value)
        const onlyAllowedChars = /^[a-zA-Z0-9~!@#$%^&*<>]+$/.test(value)

        if (!hasAlpha || !hasNumber || !hasSpecial) {
          callback(new Error('Password must contain alphabets, numbers and special characters'))
        } else if (!onlyAllowedChars) {
          callback(new Error('Password can only include ~!@#$%^&*<> symbols'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
  passwordConfirm: [
    {
      required: true,
      message: 'Please re-enter your new password',
      trigger: 'blur',
    },
    {
      validator: (rule, value, callback) => {
        if (!value) {
          callback()
          return
        }

        if (passwordResetForm.newPassword !== value) {
          callback(new Error('Passwords must match'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
})

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const toggleConfirm = () => {
  showConfirm.value = !showConfirm.value
}

const resetPassword = async () => {
  if (!passwordResetFormRef.value) return

  try {
    await passwordResetFormRef.value.validate()

    authStore.changeUserPassword(passwordResetForm.newPassword)

    ElMessage({
      type: 'success',
      message: 'Password has been reset successfully!',
    })

    router.push({ name: 'profile' })
  } catch (error) {
    console.log('Validation failed:', error)
    ElMessage({
      type: 'error',
      message: 'Please check your password requirements',
    })
  }
}
</script>

<template>
  <ProfileContentLayout page-title="Reset password">
    <div class="form-wrapper">
      <p class="description">Please enter your new password.</p>

      <el-form
        ref="passwordResetFormRef"
        :model="passwordResetForm"
        :rules="rules"
        label-position="top"
        class="password-form"
        @submit.prevent="resetPassword"
      >
        <el-form-item label="New Password" prop="newPassword">
          <el-input
            v-model="passwordResetForm.newPassword"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Enter new password"
            size="large"
            class="password-input"
          >
            <template #suffix>
              <el-button
                @click="togglePassword"
                :icon="showPassword ? View : Hide"
                link
                class="password-toggle"
              />
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="Password Confirm" prop="passwordConfirm">
          <el-input
            v-model="passwordResetForm.passwordConfirm"
            :type="showConfirm ? 'text' : 'password'"
            placeholder="Confirm your password"
            size="large"
            class="password-input"
          >
            <template #suffix>
              <el-button
                @click="toggleConfirm"
                :icon="showConfirm ? View : Hide"
                link
                class="password-toggle"
              />
            </template>
          </el-input>
        </el-form-item>

        <div class="password-requirements">
          <ul class="requirements-list">
            <li class="requirement-item">The length of Password should be 8 - 20 characters.</li>
            <li class="requirement-item">
              Password should contain alphabets, numbers and special characters
            </li>
            <li class="requirement-item">Password can only include ~!@#$%^&*<> symbols</li>
          </ul>
        </div>

        <el-button type="primary" size="large" class="confirm-button" native-type="submit">
          Reset Password
        </el-button>
      </el-form>
    </div>
  </ProfileContentLayout>
</template>

<style scoped>
.form-wrapper {
  background-color: #fff;
  padding: 1.5rem;
}

.description {
  font-size: 0.875rem;
  color: #666666;
  margin-bottom: 20px;
  line-height: 1.4;
}

.password-input {
  width: 100%;
}

.password-input :deep(.el-input__wrapper) {
  padding: 0.75rem 1rem;
  border-radius: 6px;
  border: 1px solid #dcdfe6;
}

.password-input :deep(.el-input__inner) {
  font-size: 0.875rem;
}

.password-input :deep(.el-input__wrapper:focus) {
  border-color: #409eff;
}

.password-toggle {
  padding: 0;
  margin-left: 8px;
  color: #c0c4cc;
}

.password-toggle:hover {
  color: #909399;
}

.password-requirements {
  margin-bottom: 20px;
}

.requirements-list {
  margin: 0;
  padding-left: 20px;
  list-style-type: disc;
}

.requirement-item {
  font-size: 0.8125rem;
  color: #666666;
  line-height: 1.5;
  margin-bottom: 8px;
}

.requirement-item:last-child {
  margin-bottom: 0;
}

.confirm-button {
  padding: 0.75rem 1.5rem;
  background: #ff6b35;
  border-color: #ff6b35;
  border-radius: 6px;
  margin: 0;
}

.confirm-button:hover {
  background: #ff5722;
  border-color: #ff5722;
}

:deep(.el-form-item__label) {
  font-weight: 500;
  color: #333333;
  margin-bottom: 8px;
}

:deep(.el-form-item) {
  margin-bottom: 20px;
}
</style>
