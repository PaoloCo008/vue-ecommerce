<script setup lang="ts">
import { ref } from 'vue'
import { Close } from '@element-plus/icons-vue'
import ModalTemplate from '../ModalTemplate.vue'

const dialogVisible = ref(true)

const emit = defineEmits<{ (e: 'toAddress'): void; (e: 'toPhone'): void }>()

function handleConfirm() {
  emit('toAddress')
}
</script>

<template>
  <ModalTemplate title="Verify your identity" :on-confirm="handleConfirm">
    <p class="description">Please enter the OTP via SMS to continue</p>

    <div class="phone-info">
      <span class="phone-label">Phone Number</span>
      <div class="phone-number__wrapper">
        <span class="phone-number">09178777471</span>
        <el-button type="primary" link class="change-number-btn" @click="$emit('toPhone')">
          Change number
        </el-button>
      </div>
    </div>

    <div class="otp-input-container">
      <div class="otp-inputs">
        <el-input v-for="index in 4" :key="index" maxlength="1" size="large" class="otp-input" />
      </div>
    </div>

    <div class="resend-container">
      <span class="resend-text"> Resend OTP in <span class="countdown">42</span>s </span>
    </div>
  </ModalTemplate>
</template>

<style scoped>
.otp-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.otp-title {
  font-size: 18px;
  font-weight: 600;
  color: #333333;
  margin: 0;
}

.close-button {
  color: #999999;
}

.close-button:hover {
  color: #666666;
}

.otp-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.otp-content {
  height: 265px;
}

.otp-content {
  text-align: left;
}

.description {
  font-size: 14px;
  color: #666666;
  margin-bottom: 20px;
  line-height: 1.4;
}

.phone-info {
  display: flex;
  margin-bottom: 24px;
  gap: 8px;
  flex-wrap: wrap;
}

.phone-label {
  font-size: 14px;
  color: #999999;
}

.phone-number__wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.phone-number {
  font-size: 14px;
  color: #333333;
  font-weight: 500;
}

.change-number-btn {
  padding: 0;
  height: auto;
  font-size: 14px;
}

.otp-input-container {
  margin-bottom: 20px;
}

.otp-inputs {
  display: flex;
  gap: 12px;
}

.otp-input {
  width: 48px;
  height: 48px;
}

.otp-input :deep(.el-input__wrapper) {
  text-align: center;
  border-radius: 8px;
  border: 2px solid #e4e7ed;
  transition: border-color 0.2s;
}

.otp-input :deep(.el-input__inner) {
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: #333333;
}

.otp-input :deep(.el-input__wrapper:focus) {
  border-color: #409eff;
}

.otp-input :deep(.el-input__wrapper:hover) {
  border-color: #c0c4cc;
}

.resend-container {
  margin-bottom: 20px;
}

.resend-text {
  font-size: 14px;
  color: #999999;
}

.countdown {
  color: #409eff;
  font-weight: 500;
}

.otp-buttons {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.back-button {
  padding: 12px 24px;
  border: 1px solid #dcdfe6;
  background: #ffffff;
  color: #606266;
  border-radius: 6px;
}

.back-button:hover {
  color: #37383a;
  border-color: #37383a;
}

.confirm-button {
  padding: 12px 24px;
  background: #ff6b35;
  border-color: #ff6b35;
  border-radius: 6px;
  margin: 0;
}

.confirm-button:hover {
  background: #ff5722;
  border-color: #ff5722;
}
</style>
