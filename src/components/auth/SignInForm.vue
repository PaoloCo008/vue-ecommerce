<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import ModalTemplate from '../ModalTemplate.vue'
import { useAuthStore } from '@/stores/AuthStore'
import { useUserStore } from '@/stores/UserStore'

defineEmits<{ (e: 'toRecovery'): void }>()

const authStore = useAuthStore()
const userStore = useUserStore()

// Form reference
const loginFormRef = ref()

// Loading state
const loading = ref(false)

// Form data
const loginForm = reactive({
  email: 'maria.santos@email.com',
  password: 'hashedPassword123!',
})

function validatePassword(rule: any, value: any, callback: any) {
  console.log(userStore.getUserByEmail(loginForm.email))
  if (value === '') {
    callback(new Error('Username is required'))
  } else if (value !== userStore.getUserByEmail(loginForm.email)?.password) {
    callback(new Error('Please provide a valid username.'))
  } else {
    callback()
  }
}

function validateEmail(rule: any, value: any, callback: any) {
  if (value === '') {
    callback(new Error('Password is required'))
  } else if (value !== userStore.getUserByEmail(loginForm.email)?.email) {
    callback(new Error('Please provide a valid password.'))
  } else {
    callback()
  }
}

// Form validation rules
const rules = {
  email: [
    { required: true, message: 'Please enter your email', trigger: 'blur' },
    { validator: validateEmail },
  ],
  password: [
    { required: true, message: 'Please enter your password', trigger: 'blur' },
    { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' },
    { validator: validatePassword },
  ],
}

// Handle login
const handleLogin = async () => {
  if (!loginFormRef.value) return

  await loginFormRef.value.validate((valid) => {
    if (valid) {
      loading.value = true

      // Simulate API call
      setTimeout(() => {
        loading.value = false
        authStore.login({
          userId: userStore.getUserByEmail(loginForm.email)!._id,
          email: loginForm.email,
          password: loginForm.password,
        })
        // Add your login logic here
      }, 1500)
    } else {
      ElMessage.error('Please fill in all required fields correctly')
    }
  })
}
</script>

<template>
  <ModalTemplate title="Login" has-content-buttons>
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="rules"
      class="login-form"
      @submit.prevent="handleLogin"
    >
      <div>
        <el-form-item prop="email">
          <el-input
            v-model="loginForm.email"
            placeholder="Please enter your Email"
            size="large"
            class="form-input"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="Please enter your password"
            size="large"
            class="action-input form-input"
            show-password
          />
        </el-form-item>

        <div class="forgot-password">
          <el-button text type="primary" @click="authStore.goToRecovery()">
            Forgot password?
          </el-button>
        </div>
      </div>

      <div>
        <el-form-item>
          <el-button
            type="primary"
            size="large"
            class="action-button"
            :loading="loading"
            @click="handleLogin"
          >
            LOGIN
          </el-button>
        </el-form-item>
        <div class="signup-link">
          Don't have an account?
          <el-button text type="primary" @click="authStore.setAuthMode('signup')">
            Sign up
          </el-button>
        </div>
      </div>
    </el-form>
  </ModalTemplate>
</template>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
  height: calc(100% - 50px);
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

.login-button:hover {
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
