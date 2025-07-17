<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import ModalTemplate from '../ModalTemplate.vue'

const emit = defineEmits<{ (e: 'confirm'): void; (e: 'back'): void }>()

// Form reference
const formRef = ref(null)

// Form data
const form = reactive({
  account: '',
})

// Form validation rules
const rules = reactive({
  account: [
    {
      required: true,
      message: 'Please enter your email',
      trigger: 'blur',
    },
    {
      validator: (rule, value, callback) => {
        if (!value) {
          callback()
          return
        }

        // Email regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        // Phone regex (basic pattern for various formats)

        if (emailRegex.test(value)) {
          callback()
        } else {
          callback(new Error('Please enter a valid email'))
        }
      },
      trigger: 'blur',
    },
  ],
})

// Event handlers
const handleBack = () => {
  emit('back')
}

const handleConfirm = async () => {
  emit('confirm')
  // if (!formRef.value) return
  // try {
  //   // Validate form
  //   await formRef.value.validate()
  //   // Process the form data
  //   console.log('Form submitted:', form.account)
  //   // Show success message
  //   ElMessage({
  //     type: 'success',
  //     message: 'Password reset instructions have been sent!',
  //   })
  //   // Here you would typically make an API call
  //   // await resetPassword(form.account)
  // } catch (error) {
  //   console.log('Validation failed:', error)
  //   ElMessage({
  //     type: 'error',
  //     message: 'Please check your input and try again',
  //   })
  // }
}

// Expose methods if needed by parent component
defineExpose({
  resetForm: () => {
    formRef.value?.resetFields()
  },
})
</script>

<template>
  <ModalTemplate title="Forgot your password?" :confirm="handleConfirm" :back="handleBack">
    <p class="description">Please enter the account that you want to reset the password.</p>

    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-position="top"
      class="forgot-password-form"
      @submit.prevent="handleConfirm"
    >
      <el-form-item label="Email" prop="account">
        <el-input
          v-model="form.account"
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
  font-size: 14px;
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
  font-size: 14px;
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
