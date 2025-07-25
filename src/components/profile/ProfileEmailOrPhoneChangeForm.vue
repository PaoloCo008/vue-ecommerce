<script setup lang="ts">
import ProfileContentLayout from '@/layouts/ProfileContentLayout.vue'
import { generateOtp } from '@/lib/helpers'
import { useAuthStore } from '@/stores/AuthStore'
import { useUserStore } from '@/stores/UserStore'
import { ElMessage, ElNotification, type FormInstance } from 'element-plus'
import { computed, onUnmounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const VERIFICATION_CODE_LENGTH = 6

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const authStore = useAuthStore()

const user = computed(() => userStore.getUserById(authStore.user as string))

const forEmail = computed(() => {
  return route.params.method === 'email'
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
    router.push({ name: 'password-reset' })
  }
}

onUnmounted(() => {
  if (countdownTimer.value) {
    clearInterval(countdownTimer.value)
    countdownTimer.value = null
  }
})

watch(verificationCode, (newValue) => {
  const filtered = newValue.replace(/\D/g, '').slice(0, VERIFICATION_CODE_LENGTH)
  if (filtered !== newValue) {
    verificationCode.value = filtered
  }
})

const changeFormRef = ref<FormInstance>()
const changeForm = reactive({
  methodValue: 'TestPassword123*',
  verificationCode: 'TestPassword123*',
})

const rules = reactive({
  methodValue: [
    {
      required: true,
      message: "You can't leave this empty.",
      trigger: 'blur',
    },
    {
      validator: (rule, value, callback) => {
        if (!value) {
          callback()
          return
        }

        const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)

        if (!isValidEmail) {
          callback(new Error('Please enter a valid email.'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
  verificationCode: [
    {
      required: true,
      message: "You can't leave this empty.",
      trigger: 'blur',
    },
    {
      max: VERIFICATION_CODE_LENGTH,
      message: `Please enter ${VERIFICATION_CODE_LENGTH} digits`,
      trigger: 'blur',
    },
    {
      validator: (rule, value, callback) => {
        if (!value) {
          callback()
          return
        }

        if (changeForm.methodValue !== value) {
          callback(new Error('Invalid '))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
})

const changeMethodValue = async () => {
  if (!changeFormRef.value) return

  try {
    await changeFormRef.value.validate()

    userStore.updateMethodValue(
      authStore.user as string,
      route.params.method === 'email' ? 'email' : 'mobileNumber',
      changeForm.methodValue,
    )

    ElMessage({
      type: 'success',
      message: 'Password has been reset successfully!',
    })

    router.push({ name: 'profile' })
  } catch (error) {
    console.log('Validation failed:', error)
    ElMessage({
      type: 'error',
      message: 'Please check your password requirements',
    })
  }
}
</script>
<template>
  <ProfileContentLayout :page-title="`Change ${forEmail ? 'Email' : 'Mobile Number'}`">
    <div class="container">
      <div class="message">
        Please enter your new {{ forEmail ? 'email' : 'sms' }}. We will send you a one time code.
      </div>

      <el-form
        ref="changeFormRef"
        :model="changeForm"
        :rules="rules"
        label-position="top"
        class="password-form"
        @submit.prevent="changeMethodValue"
      >
        <el-form-item prop="methodValue">
          <div class="phone-input-group">
            <el-input
              value="+63"
              class="country-code"
              readonly
              :style="{ width: '80px' }"
              disabled
              v-if="!forEmail"
            />
            <el-input :value="forEmail ? user?.email : user?.mobileNumber" :style="{ flex: 1 }" />
          </div>
        </el-form-item>

        <el-form-item prop="verificationCode">
          <div class="verification-input-group">
            <el-input
              v-model="verificationCode"
              placeholder="Please enter the verification code"
              class="verification-input no-arrows"
              type="number"
              :maxlength="VERIFICATION_CODE_LENGTH"
            />
            <el-button type="primary" text class="otp-actions" @click="sendCode" v-if="canResend">
              SEND
            </el-button>
            <span class="otp-actions" v-else>RESEND({{ countdown }})</span>
          </div>
        </el-form-item>

        <el-button
          type="primary"
          class="verify-button button"
          @click="verifyCode"
          :disabled="verificationCode.length !== VERIFICATION_CODE_LENGTH"
        >
          Verify Code
        </el-button>
      </el-form>
    </div>
  </ProfileContentLayout>
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
  padding: 1rem;
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
</style>
