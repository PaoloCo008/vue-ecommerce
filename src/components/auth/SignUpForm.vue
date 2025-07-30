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
  email: 'email@email.com',
  password: 'passwordTest-008',
  passwordConfirm: 'passwordTest-008',
})

function validateEmail(rule: any, value: any, callback: any) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(value)) {
    callback(new Error('Please provide a valid email'))
  } else {
    callback()
  }
}

function validatePassword(rule, value, callback) {
  if (!value) {
    callback()
    return
  }

  const hasAlpha = /[a-zA-Z]/.test(value)
  const hasNumber = /\d/.test(value)
  const hasSpecial = /[_-~!@#$%^&*<>]/.test(value)
  const onlyAllowedChars = /^[a-zA-Z0-9~!@#$%^&*-_<>]+$/.test(value)

  if (!hasAlpha || !hasNumber || !hasSpecial) {
    callback(new Error('Password must contain alphabets, numbers and special characters'))
  } else if (!onlyAllowedChars) {
    callback(new Error('Password can only include _-~!@#$%^&*<> symbols'))
  } else {
    callback()
  }
}

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
  email: [
    { required: true, message: 'Please enter your email', trigger: 'blur' },
    { validator: validateEmail, trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Please enter your password', trigger: 'blur' },
    {
      min: 8,
      max: 20,
      message: 'Password length should be 8-20 characters',
      trigger: 'blur',
    },
    { validator: validatePassword, trigger: 'blur' },
  ],
  passwordConfirm: [{ validator: validatePasswordConfirm, trigger: 'blur' }],
}

// Handle signUp
const handlesignUp = async () => {
  if (!signUpFormRef.value) return
  await signUpFormRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      setTimeout(() => {
        loading.value = false

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
      class="signup-form"
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
.signup-form {
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
  font-size: 0.875rem;
  color: #6b7280;
}

.forgot-password {
  text-align: right;
  margin-bottom: 0.75rem;
}

.forgot-password .el-link {
  color: #fff;
  font-size: 0.875rem;
  text-decoration: none;
}

.action-button {
  width: 100%;
  height: 48px;
  background-color: #f97316;
  border-color: #f97316;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: 0.5px;
}

.signUp-button:hover {
  background-color: #ea580c;
  border-color: #ea580c;
}

.signup-link {
  text-align: center;
  font-size: 0.875rem;
}

.el-button {
  padding: 0;
}

.el-button.is-text:not(.is-disabled):active,
.el-button.is-text:not(.is-disabled):hover {
  background-color: unset;
}
</style>
