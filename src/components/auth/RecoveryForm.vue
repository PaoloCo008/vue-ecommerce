<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import ModalTemplate from '../ModalTemplate.vue'
import { useAuthStore } from '@/stores/AuthStore'
import { useUserStore } from '@/stores/UserStore'

const emit = defineEmits<{ (e: 'confirm'): void; (e: 'back'): void }>()

const authStore = useAuthStore()
const userStore = useUserStore()

const loading = ref(false)

// Form reference
const recoveryFormRef = ref(null)

// Form data
const recoveryForm = reactive({
  account: 'maria.santos@email.com',
})

function validateEmail(rule: any, value: any, callback: any) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (value === '') {
    callback(new Error('Please enter a email you want to recover'))
  } else if (!emailRegex.test(value)) {
    callback(new Error('Please provide a valid email'))
  } else if (value !== userStore.getUserByEmail(recoveryForm.account)?.email) {
    callback(new Error('Sorry but no user was found with that email'))
  } else {
    callback()
  }
}

// Form validation rules
const rules = reactive({
  account: [
    {
      required: true,
      message: 'Please enter your email',
      trigger: 'blur',
    },
    {
      validator: validateEmail,
      trigger: 'blur',
    },
  ],
})

// Event handlers

const handleConfirm = async () => {
  if (!recoveryFormRef.value) return

  await recoveryFormRef.value.validate((valid) => {
    if (valid) {
      loading.value = true

      // Simulate API call
      setTimeout(() => {
        loading.value = false
        authStore.goToRecoveryOTP({ email: recoveryForm.account })
      }, 1500)
    }
  })
}

// Expose methods if needed by parent component
defineExpose({
  resetForm: () => {
    recoveryFormRef.value?.resetFields()
  },
})
</script>

<template>
  <ModalTemplate
    title="Forgot your password?"
    :confirm="handleConfirm"
    :back="() => authStore.goBack('login')"
    :loading
  >
    <p class="description">Please enter the account that you want to reset the password.</p>

    <el-form
      ref="recoveryFormRef"
      :model="recoveryForm"
      :rules="rules"
      label-position="top"
      class="forgot-password-form"
      @submit.prevent="handleConfirm"
    >
      <el-form-item label="Email" prop="account">
        <el-input
          v-model.trim="recoveryForm.account"
          placeholder="Please enter your Email"
          size="large"
          class="input-field"
        />
      </el-form-item>
    </el-form>
  </ModalTemplate>
</template>

<style scoped>
.description {
  font-size: 0.875rem;
  color: #666666;
  margin-bottom: 30px;
  line-height: 1.4;
}

.forgot-password-form {
  margin-bottom: 30px;
}

.input-field {
  width: 100%;
}

.input-field :deep(.el-input__wrapper) {
  /* padding: 12px 16px; */
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #dcdfe6;
}

.input-field :deep(.el-input__inner) {
  font-size: 0.875rem;
}

.input-field :deep(.el-input__wrapper:focus) {
  border-color: #409eff;
}

.el-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

:deep(.el-form-item__error) {
  margin-left: 3px;
  margin-top: 2px;
}

:deep(.el-form-item__label) {
  font-weight: 500;
  color: #333333;
  margin-bottom: 8px;
}

@media screen and (min-width: 500px) {
  .title {
    font-size: 1.5rem;
  }

  .input-field :deep(.el-input__wrapper) {
    padding: 12px 16px;
  }
}
</style>
