<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { RouterLink } from 'vue-router'

defineProps<{ signingUp?: boolean }>()

defineEmits<{ (e: 'onSigningUp'): void; (e: 'onLoggingIn'): void }>()

// Form reference
const loginFormRef = ref()

// Loading state
const loading = ref(false)

// Form data
const loginForm = reactive({
  emailOrPhone: '',
  password: '',
})

// Form validation rules
const rules = {
  emailOrPhone: [{ required: true, message: 'Please enter your email', trigger: 'blur' }],
  password: [
    { required: true, message: 'Please enter your password', trigger: 'blur' },
    { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' },
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
        ElMessage.success('Login successful!')
        console.log('Login data:', loginForm)
        // Add your login logic here
      }, 1500)
    } else {
      ElMessage.error('Please fill in all required fields correctly')
    }
  })
}
</script>

<template>
  <div class="login-container">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="rules"
      class="login-form"
      @submit.prevent="handleLogin"
    >
      <div>
        <el-form-item prop="emailOrPhone">
          <el-input
            v-model="loginForm.emailOrPhone"
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

        <el-form-item v-if="signingUp" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="Please confirm your password"
            size="large"
            class="action-input form-input"
            show-password
          />
        </el-form-item>
      </div>

      <div v-if="!signingUp" class="forgot-password">
        <RouterLink to="/"> Forgot password? </RouterLink>
      </div>

      <el-form-item>
        <el-button
          type="primary"
          size="large"
          class="action-button"
          :loading="loading"
          @click="handleLogin"
        >
          {{ signingUp ? 'SIGN UP' : 'LOGIN' }}
        </el-button>
      </el-form-item>
    </el-form>
    <div v-if="signingUp" class="signup-link">
      Already have an account?
      <el-button text type="primary" @click="$emit('onSigningUp')"> Log in now </el-button>
    </div>
    <div v-else class="signup-link">
      Don't have an account?
      <el-button text type="primary" @click="$emit('onLoggingIn')"> Sign up </el-button>
    </div>
  </div>
</template>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
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
  padding: 0 0.5rem;
}

.el-button.is-text:not(.is-disabled):active,
.el-button.is-text:not(.is-disabled):hover {
  background-color: unset;
}
</style>
