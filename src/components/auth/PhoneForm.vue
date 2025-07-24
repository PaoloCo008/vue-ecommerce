<script setup lang="ts">
import { reactive, ref } from 'vue'
import ModalTemplate from '../ModalTemplate.vue'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/stores/AuthStore'

const authStore = useAuthStore()

const phoneFormRef = ref()
const phoneForm = reactive({
  mobileNumber: '09182341481',
})

const rules = {
  mobileNumber: [
    { required: true, message: 'Please enter your phone number', trigger: 'blur' },
    { pattern: /^09\d{9}$/, message: 'Please enter a valid phone number', trigger: 'blur' },
  ],
}

const loading = ref(false)

const handleRegister = async () => {
  if (!phoneFormRef.value) return

  await phoneFormRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      // Simulate API call
      setTimeout(() => {
        loading.value = false
        ElMessage.success('signUp successful!')

        authStore.registerPhone({ mobileNumber: phoneForm.mobileNumber })
      }, 1500)
    } else {
      ElMessage.error('Please fill in all required fields correctly')
    }
  })
}
</script>

<template>
  <ModalTemplate title="Register a  phone number" has-content-buttons>
    <el-form
      ref="phoneFormRef"
      :model="phoneForm"
      :rules="rules"
      class="phone-form"
      @submit.prevent="handleRegister"
    >
      <div class="form-section">
        <div class="country-prefix">PH+63</div>
        <el-form-item prop="mobileNumber" class="input-container">
          <input
            v-model="phoneForm.mobileNumber"
            type="text"
            placeholder="Please enter your phone number"
            class="phone-input"
          />
        </el-form-item>
      </div>
      <div>
        <el-button class="send-button" :loading="loading" native-type="submit">
          <el-icon><Iphone /></el-icon>
          <span> Register phone number </span>
        </el-button>
      </div>
    </el-form>
  </ModalTemplate>
</template>

<style scoped>
.header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 40px;
}

.phone-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 55px);
}

.tabs-wrapper {
  display: flex;
  gap: 32px;
  flex: 1;
}

.tab-item {
  position: relative;
  padding-bottom: 12px;
}

.tab-text {
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
}

.tab-text.inactive {
  color: #999999;
}

.tab-text.active {
  color: #333333;
  font-weight: 600;
}

.tab-underline {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #333333;
}

.form-section {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
}

.input-container {
  display: flex;
  border-radius: 8px;
  width: 100%;
  background: white;
  gap: 6px;
}

.country-prefix {
  display: flex;
  align-items: center;
  height: fit-content;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #666666;
  white-space: nowrap;
  border: 1px solid #e5e5e5;
  border-radius: 0.5rem;
}

.phone-input {
  flex: 1;
  width: 100%;
  border: none;
  outline: none;
  padding: 14px 16px;
  font-size: 14px;
  color: #333333;
  background: transparent;
  border: 1px solid #e5e5e5;
  border-radius: 0.5rem;
}

.phone-input::placeholder {
  color: #aaaaaa;
}

.input-container:focus-within {
  border-color: #409eff;
}

.send-button {
  width: 100%;
  height: 48px;
  background: #ff6b35;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color 0.2s;
}

.send-button:hover {
  background: #ff5722;
}

.send-button:active {
  background: #e64a19;
}

.message-icon {
  width: 16px;
  height: 16px;
}
</style>
