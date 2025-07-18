<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import ModalTemplate from '../ModalTemplate.vue'
import { useAuthStore } from '@/stores/AuthStore'

const emit = defineEmits<{ (e: 'toPhone'): void }>()

const authStore = useAuthStore()

// Form reference
const signUpFormRef = ref()

// Loading state
const loading = ref(false)

// Form data
const signUpForm = reactive({
  email: 'email',
  password: 'password',
  passwordConfirm: 'password',
})

function validatePasswordConfirm(rule: any, value: any, callback: any) {
  if (value === '') {
    callback(new Error('Please re-enter your new password'))
  } else if (value !== signUpForm.password) {
    callback(new Error("Password don't match"))
  } else {
    callback()
  }
}

// Form validation rules
const rules = {
  email: [{ required: true, message: 'Please enter your email', trigger: 'blur' }],
  password: [
    { required: true, message: 'Please enter your password', trigger: 'blur' },
    { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' },
  ],
  passwordConfirm: [{ validator: validatePasswordConfirm, trigger: 'blur' }],
}

// Handle signUp
const handlesignUp = async () => {
  if (!signUpFormRef.value) return
  await signUpFormRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      // Simulate API call
      setTimeout(() => {
        loading.value = false
        ElMessage.success('signUp successful!')

        authStore.signup({ email: signUpForm.email, password: signUpForm.password })
      }, 1500)
    } else {
      ElMessage.error('Please fill in all required fields correctly')
    }
  })
}
</script>

<template>
  <ModalTemplate title="Sign Up" has-content-buttons>
    <el-form
      ref="signUpFormRef"
      :model="signUpForm"
      :rules="rules"
      class="signUp-form"
      @submit.prevent="handlesignUp"
    >
      <div>
        <el-form-item prop="email">
          <el-input
            v-model="signUpForm.email"
            placeholder="Please enter your Email"
            size="large"
            class="form-input"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="signUpForm.password"
            type="password"
            placeholder="Please enter your password"
            size="large"
            class="action-input form-input"
            show-password
          />
        </el-form-item>

        <el-form-item prop="passwordConfirm">
          <el-input
            v-model="signUpForm.passwordConfirm"
            type="password"
            placeholder="Please confirm your password"
            size="large"
            class="action-input form-input"
            show-password
          />
        </el-form-item>
      </div>

      <div>
        <el-form-item>
          <el-button
            type="primary"
            size="large"
            class="action-button"
            :loading="loading"
            native-type="submit"
          >
            SIGN UP
          </el-button>
        </el-form-item>

        <div class="signup-link">
          Already have an account?
          <el-button text type="primary" @click="authStore.setAuthMode('login')">
            Log in now
          </el-button>
        </div>
      </div>
    </el-form>
  </ModalTemplate>
</template>

<style scoped>
.signUp-container {
  height: 315px;
}

.signUp-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
  height: 100%;
}

:deep(.el-form-item__error) {
  margin: 3px 0 0 2px;
  text-transform: none;
}

.form-input :deep(.el-input__inner) {
  padding: 1.5rem 0;
  font-size: 14px;
  color: #6b7280;
}

.forgot-password {
  text-align: right;
  margin-bottom: 0.75rem;
}

.forgot-password .el-link {
  color: #fff;
  font-size: 14px;
  text-decoration: none;
}

.action-button {
  width: 100%;
  height: 48px;
  background-color: #f97316;
  border-color: #f97316;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.5px;
}

.signUp-button:hover {
  background-color: #ea580c;
  border-color: #ea580c;
}

.signup-link {
  text-align: center;
  font-size: 14px;
}

.el-button {
  padding: 0;
}

.el-button.is-text:not(.is-disabled):active,
.el-button.is-text:not(.is-disabled):hover {
  background-color: unset;
}
</style>
