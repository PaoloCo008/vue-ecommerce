<script setup lang="ts">
import { generateOtp } from '@/lib/helpers'
import { useAuthStore } from '@/stores/AuthStore'
import { useUserStore } from '@/stores/UserStore'
import { ElNotification } from 'element-plus'
import { computed, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const authStore = useAuthStore()

const user = computed(() => userStore.getUserById(authStore.user as string))
const operation = computed(() => route.query.operation as string)
const type = computed(() => route.query.type as string)

const isSendingThroughEmail = computed(() => {
  return type.value === 'email'
})

const verificationCode = ref('')
const countdown = ref(60)
const canResend = ref(true)
const countdownTimer = ref<number | null>(null)
const generatedOtp = ref<string>('')

function startCountdown() {
  countdown.value = 60
  canResend.value = false

  if (countdownTimer.value) {
    clearInterval(countdownTimer.value)
  }

  countdownTimer.value = setInterval(() => {
    countdown.value--

    if (countdown.value === 55) {
      ElNotification({
        title: 'Oops!',
        message: `Looks like we don't have the api for that yet! Here is your OTP: ${generatedOtp.value}`,
        duration: 0,
      })
    }

    if (countdown.value <= 0) {
      clearInterval(countdownTimer.value!)
      countdownTimer.value = null
      canResend.value = true
    }
  }, 1000)
}

function sendCode() {
  generatedOtp.value = generateOtp()
  startCountdown()
}

function verifyCode() {
  if (generatedOtp.value === verificationCode.value) {
    const [to, method] = operation.value.split('-')

    if (to === 'reset') {
      router.push({ name: 'password-reset' })
    } else {
      router.push({ name: 'change', params: { method } })
    }
  }
}

onUnmounted(() => {
  if (countdownTimer.value) {
    clearInterval(countdownTimer.value)
    countdownTimer.value = null
  }
})

watch(verificationCode, (newValue) => {
  // Remove non-numeric and limit to 4 characters
  const filtered = newValue.replace(/\D/g, '').slice(0, 4)
  if (filtered !== newValue) {
    verificationCode.value = filtered
  }
})
</script>
<template>
  <div class="sms-verification">
    <div class="container">
      <div class="message">
        We will send you a message via {{ isSendingThroughEmail ? 'email' : 'sms' }} with a
        verification code
      </div>

      <div class="phone-input-group">
        <el-input
          value="+63"
          class="country-code"
          readonly
          :style="{ width: '80px' }"
          disabled
          v-if="!isSendingThroughEmail"
        />
        <el-input
          :value="isSendingThroughEmail ? user?.email : user?.mobileNumber"
          :style="{ flex: 1 }"
          disabled
        />
      </div>

      <div class="verification-input-group">
        <el-input
          v-model="verificationCode"
          placeholder="Please enter the verification code"
          class="verification-input no-arrows"
          type="number"
          :maxlength="4"
        />
        <el-button type="primary" text class="otp-actions" @click="sendCode" v-if="canResend">
          SEND
        </el-button>
        <span class="otp-actions" v-else>RESEND({{ countdown }})</span>
      </div>

      <el-button
        type="primary"
        class="verify-button button"
        @click="verifyCode"
        :disabled="verificationCode.length !== 4"
      >
        Verify Code
      </el-button>

      <el-button
        class="other-ways-button button"
        @click="router.push({ name: 'verification-methods', query: { for: operation } })"
      >
        Use other ways to verify
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.no-arrows :deep(.el-input__inner) {
  -moz-appearance: textfield;
}

.no-arrows :deep(.el-input__inner::-webkit-outer-spin-button),
.no-arrows :deep(.el-input__inner::-webkit-inner-spin-button) {
  -webkit-appearance: none;
  margin: 0;
}

.container {
  max-width: 810px;
  width: 100%;
  background: white;
  padding: 2.25rem;
}

.message {
  font-size: 16px;
  color: #333;
  line-height: 1.5;
  margin-bottom: 32px;
  text-align: left;
}

.phone-input-group {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.phone-input-group :deep(.el-input__wrapper) {
  border: 1px solid #e2e2e2;
  border-radius: 0;
  box-shadow: none;
  padding: 0.5rem 1rem;
}

.verification-input-group {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  position: relative;
}

.verification-input {
  flex: 1;
}

.verification-input :deep(.el-input__wrapper) {
  border: 1px solid #e2e2e2;
  border-radius: 0;
  box-shadow: none;
  padding: 0.5rem 60px 0.5rem 1rem;
}

.otp-actions {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  height: auto;
  min-height: auto;
}

.button {
  border-radius: 0;
  font-size: 1rem;
  max-width: 400px;
  width: 100%;
  height: 48px;
  margin: 0;
}

.verify-button {
  background-color: #ff6b35;
  border-color: #ff6b35;
  font-weight: 500;
  margin-bottom: 1rem;
}

.verify-button:hover {
  background-color: #e55a2b;
  border-color: #e55a2b;
}

.verify-button:disabled {
  background-color: #cccccc;
  border-color: #cccccc;
  cursor: not-allowed;
}

.other-ways-button {
  background-color: white;
  border: 1px solid #d9d9d9;
  color: #666;
}

.other-ways-button:hover {
  border-color: var(--color-main-opaque);
  color: var(--color-main);
}
</style>
