<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { Close, View, Hide } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import ModalTemplate from '../ModalTemplate.vue'

// Props
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

// Emits
const emit = defineEmits<{ (e: 'back'): void; (e: 'toLogin'): void }>()

// Reactive data
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const formRef = ref(null)
const showPassword = ref(false)
const showConfirm = ref(false)

const form = reactive({
  newPassword: '',
  passwordConfirm: '',
})

// Validation rules
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
})

// Computed
const isFormValid = computed(() => {
  const { newPassword } = form

  if (!newPassword || newPassword.length < 8 || newPassword.length > 20) {
    return false
  }

  const hasAlpha = /[a-zA-Z]/.test(newPassword)
  const hasNumber = /\d/.test(newPassword)
  const hasSpecial = /[~!@#$%^&*<>]/.test(newPassword)
  const onlyAllowedChars = /^[a-zA-Z0-9~!@#$%^&*<>]+$/.test(newPassword)

  return hasAlpha && hasNumber && hasSpecial && onlyAllowedChars
})

// Methods
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const toggleConfirm = () => {
  showConfirm.value = !showConfirm.value
}

const handleConfirm = async () => {
  emit('toLogin')
  // if (!formRef.value) return

  // try {
  //   await formRef.value.validate()

  //   emit('confirm', form.newPassword)

  //   ElMessage({
  //     type: 'success',
  //     message: 'Password has been reset successfully!',
  //   })
  // } catch (error) {
  //   console.log('Validation failed:', error)
  //   ElMessage({
  //     type: 'error',
  //     message: 'Please check your password requirements',
  //   })
  // }
}
</script>

<template>
  <ModalTemplate
    title="Reset your password"
    :on-confirm="handleConfirm"
    :on-back="() => emit('back')"
  >
    <p class="description">Please enter your new password.</p>

    <el-form ref="formRef" :model="form" :rules="rules" label-position="top" class="password-form">
      <el-form-item label="New Password" prop="newPassword">
        <el-input
          v-model="form.newPassword"
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

      <el-form-item label="Password Confirm" prop="newPassword">
        <el-input
          v-model="form.passwordConfirm"
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
    </el-form>

    <div class="password-requirements">
      <ul class="requirements-list">
        <li class="requirement-item">The length of Password should be 8 - 20 characters.</li>
        <li class="requirement-item">
          Password should contain alphabets, numbers and special characters
        </li>
        <li class="requirement-item">Password can only include ~!@#$%^&*<> symbols</li>
      </ul>
    </div>
  </ModalTemplate>
</template>

<style scoped>
.description {
  font-size: 0.875rem;
  color: #666666;
  margin-bottom: 20px;
  line-height: 1.4;
}

.password-form {
  margin-bottom: 20px;
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

:deep(.el-form-item__label) {
  font-weight: 500;
  color: #333333;
  margin-bottom: 8px;
}

:deep(.el-form-item) {
  margin-bottom: 20px;
}
</style>
