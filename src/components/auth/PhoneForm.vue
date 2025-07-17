<script setup lang="ts">
import { ref } from 'vue'
import ModalTemplate from '../ModalTemplate.vue'

const phoneNumber = ref('')

const emit = defineEmits<{ (e: 'toOtp'): void }>()

function handlePhoneRegister() {
  emit('toOtp')
}
</script>

<template>
  <ModalTemplate title="Enter your phone number" has-content-buttons>
    <!-- Header with QR icon and tabs -->

    <!-- Phone number input form -->
    <div class="form-section">
      <div class="input-container">
        <div class="country-prefix">PH+63</div>
        <input
          v-model="phoneNumber"
          type="text"
          placeholder="Please enter your phone number"
          class="phone-input"
        />
      </div>

      <button class="send-button" @click="handlePhoneRegister">
        <el-icon><Iphone /></el-icon>
        Register phone number
      </button>
    </div>
  </ModalTemplate>
</template>

<style scoped>
.header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 40px;
}

.qr-icon {
  margin-top: 2px;
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
  display: flex;
  flex-direction: column;
  gap: 24px;
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
  padding: 14px 16px;
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
  font-size: 16px;
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
