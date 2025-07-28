<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue'
import ModalTemplate from '../ModalTemplate.vue'
import { useAuthStore } from '@/stores/AuthStore'
import { useUserStore } from '@/stores/UserStore'
import { ElMessage, ElNotification } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { formatPhilippinePhone, generateOtp } from '@/lib/helpers'
import { useCartStore } from '@/stores/CartStore'

const emit = defineEmits<{ (e: 'onRerouteToReset'): void }>()

const authStore = useAuthStore()
const userStore = useUserStore()
const cartStore = useCartStore()
const router = useRouter()
const route = useRoute()

const forPhone = computed(() => authStore.getMode === 'signup')

// OTP functionality
const otpInputs = ref<string[]>(['', '', '', ''])
const generatedOtp = ref<string>('')
const countdown = ref(60)
const canResend = ref(false)
const inputRefs = ref<HTMLInputElement[]>([])
const countdownTimer = ref<number | null>(null)

// Send OTP via notification
function generateOTP() {
  generatedOtp.value = generateOtp()
  startCountdown()
}

function startCountdown() {
  countdown.value = 60
  canResend.value = false

  if (countdownTimer.value) {
    clearInterval(countdownTimer.value)
  }

  countdownTimer.value = setInterval(() => {
    countdown.value--

    if (countdown.value === 58) {
      ElNotification({
        title: 'Oops!',
        message: `Looks like we don't have the api for that yet! Here is your OTP: ${generatedOtp.value}`,
        duration: 15000,
      })
    }

    if (countdown.value <= 0) {
      clearInterval(countdownTimer.value!)
      countdownTimer.value = null
      canResend.value = true
    }
  }, 1000)
}

// Handle OTP input
function handleOtpInput(index: number, event: Event) {
  const target = event.target as HTMLInputElement
  const value = target.value.replace(/[^0-9]/g, '') // Only allow numbers

  // Only allow input in sequential order
  if (index > 0 && otpInputs.value[index - 1] === '') {
    target.value = ''
    return
  }

  otpInputs.value[index] = value

  // Move to next input if current is filled
  if (value && index < 3) {
    nextTick(() => {
      const nextInput = inputRefs.value[index + 1]
      if (nextInput) {
        nextInput.focus()
      }
    })
  }
}

// Handle backspace/delete
function handleKeydown(index: number, event: KeyboardEvent) {
  if (event.key === 'Backspace' || event.key === 'Delete') {
    if (otpInputs.value[index] === '' && index > 0) {
      // Move to previous input if current is empty
      otpInputs.value[index - 1] = ''
      nextTick(() => {
        const prevInput = inputRefs.value[index - 1]
        if (prevInput) {
          prevInput.focus()
        }
      })
    } else {
      otpInputs.value[index] = ''
    }
  }
}

// Check if entered OTP matches generated OTP
function checkOtp() {
  const enteredOtp = otpInputs.value.join('')
  if (enteredOtp.length === 4) {
    if (enteredOtp === generatedOtp.value) {
      ElMessage.success('OTP verified successfully!')
      handleConfirm()
    } else {
      ElMessage.error('Invalid OTP. Please try again.')
      resetOtpInputs()
    }
  }
}

// Reset OTP inputs
function resetOtpInputs() {
  otpInputs.value = ['', '', '', '']
  nextTick(() => {
    const firstInput = inputRefs.value[0]
    if (firstInput) {
      firstInput.focus()
    }
  })
}

// Resend OTP
function resendOtp() {
  if (canResend.value) {
    resetOtpInputs()
    generateOTP()
  }
}

function handleConfirm() {
  const mode = authStore.getMode

  if (mode === 'signup') {
    authStore.incrementStep()

    if (route.meta.operation === 'signup') {
      router.push({ name: 'profile' })
    }
  } else if (mode === 'login') {
    authStore.authorize(
      userStore.getUserByEmail(authStore.loginData.email as string)?._id as string,
    )

    cartStore.mergeGuestCartToUserCart(authStore.user)

    ElMessage.success('Login successful')

    if (route.meta.operation === 'login') {
      router.push({ name: 'homepage' })
    }
  } else {
    emit('onRerouteToReset')
    router.push({ name: 'password-reset-from-otp' })
  }
}

// Initialize on mount
onMounted(() => {
  generateOTP()
  nextTick(() => {
    const firstInput = inputRefs.value[0]
    if (firstInput) {
      firstInput.focus()
    }
  })
})

// Cleanup on unmount
onUnmounted(() => {
  if (countdownTimer.value) {
    clearInterval(countdownTimer.value)
    countdownTimer.value = null
  }
})
</script>

<template>
  <ModalTemplate
    title="Verify your identity"
    :confirm="checkOtp"
    :back="() => authStore.decrementStep()"
    :disabled="otpInputs.join('').length < 4"
  >
    <p class="description">
      {{
        forPhone
          ? 'Please enter the OTP via SMS to continue'
          : `Please enter the OTP via ${userStore.getUserById(authStore.user as string)?.email} to continue`
      }}
    </p>

    <div class="info">
      <span class="label">{{ forPhone ? 'Phone Number:' : 'Email Address:' }}</span>

      <div class="info-state__wrapper">
        <span class="info-state">{{
          forPhone
            ? formatPhilippinePhone(authStore.getFormDataByProperty('signup', 'mobileNumber'))
            : authStore.getFormDataByProperty('login', 'email')
        }}</span>
        <el-button type="primary" link class="change-number-btn" @click="authStore.decrementStep()">
          {{ forPhone ? 'Change number' : 'Change email' }}
        </el-button>
      </div>
    </div>

    <div class="otp-input-container">
      <div class="otp-inputs">
        <input
          v-for="(value, index) in otpInputs"
          :key="index"
          ref="inputRefs"
          :value="value"
          :disabled="index > 0 && otpInputs[index - 1] === ''"
          maxlength="1"
          class="otp-input"
          type="text"
          inputmode="numeric"
          @input="(event) => handleOtpInput(index, event)"
          @keydown="(event) => handleKeydown(index, event)"
        />
      </div>
    </div>

    <div class="resend-container">
      <span v-if="!canResend" class="resend-text">
        Resend OTP in <span class="countdown">{{ countdown }}</span
        >s
      </span>
      <el-button v-else type="primary" link class="resend-btn" @click="resendOtp">
        Resend OTP
      </el-button>
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

.info {
  display: flex;
  margin-bottom: 24px;
  gap: 8px;
  flex-wrap: wrap;
}

.label {
  font-size: 14px;
  color: #999999;
}

.info-state__wrapper {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.info-state {
  font-size: 14px;
  color: #333333;
  font-weight: 500;
}

.change-number-btn {
  padding: 0;
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
  text-align: center;
  border-radius: 8px;
  border: 2px solid #e4e7ed;
  font-size: 18px;
  font-weight: 600;
  color: #333333;
  transition: border-color 0.2s;
  outline: none;
}

.otp-input:focus {
  border-color: #409eff;
}

.otp-input:hover:not(:disabled) {
  border-color: #c0c4cc;
}

.otp-input:disabled {
  background-color: #f5f7fa;
  color: #c0c4cc;
  cursor: not-allowed;
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

.resend-btn {
  padding: 0;
  height: auto;
  font-size: 14px;
  color: #409eff;
}

.resend-btn:hover {
  color: #337ecc;
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
