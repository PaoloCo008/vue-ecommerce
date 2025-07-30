<template>
  <el-dialog
    v-model="visible"
    title="GCash Payment Details"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :style="{ maxWidth: '500px', width: '100%' }"
    class="gcash-modal"
  >
    <div class="modal-content">
      <div class="payment-icon">
        <img src="/gcash-img.webp" alt="GCash" class="gcash-logo" />
      </div>

      <div class="form-section">
        <el-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          label-position="top"
          class="gcash-form"
        >
          <el-form-item label="GCash Mobile Number" prop="accountNumber">
            <el-input
              v-model="formData.accountNumber"
              placeholder="09XXXXXXXXX"
              maxlength="11"
              show-word-limit
              class="phone-input"
            >
              <template #prefix>
                <span class="country-code">+63</span>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="Account Holder Name" prop="accountName">
            <el-input
              v-model="formData.accountName"
              placeholder="Enter full name as registered in GCash"
              maxlength="50"
              show-word-limit
            />
          </el-form-item>

          <div class="save-option">
            <div class="form-checkbox">
              <el-checkbox v-model="formData.saveForLater" class="save-checkbox"> </el-checkbox>
              <span class="save-text">Save this GCash account for future payments</span>
            </div>
          </div>

          <div class="form-buttons">
            <el-button @click="handleCancel" class="cancel-btn"> Cancel </el-button>
            <el-button type="primary" @click="handleConfirm" :loading="loading" class="confirm-btn">
              {{ loading ? 'Processing...' : 'Confirm Payment' }}
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Lock } from '@element-plus/icons-vue'
import type { PaymentMethod } from '@/lib/types/globals'
import { useUserStore } from '@/stores/UserStore'

interface GCashFormData {
  accountNumber: string
  accountName: string
  saveForLater: boolean
}

interface Props {
  modelValue: boolean
  userId: string
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm', paymentMethod: PaymentMethod): void
  (e: 'cancel'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const userStore = useUserStore()

const visible = ref(false)
const loading = ref(false)
const formRef = ref()

const formData = reactive<GCashFormData>({
  accountNumber: '',
  accountName: '',
  saveForLater: false,
})

// Form validation rules
const rules = {
  accountNumber: [
    { required: true, message: 'Mobile number is required', trigger: 'blur' },
    {
      pattern: /^09\d{9}$/,
      message: 'Please enter a valid 11-digit mobile number starting with 09',
      trigger: 'blur',
    },
  ],
  accountName: [
    { required: true, message: 'Account holder name is required', trigger: 'blur' },
    {
      min: 2,
      max: 50,
      message: 'Name should be between 2 and 50 characters',
      trigger: 'blur',
    },
  ],
}

// Watch for modal visibility changes
watch(
  () => props.modelValue,
  (newVal) => {
    visible.value = newVal
    if (newVal) {
      resetForm()
    }
  },
  { immediate: true },
)

watch(visible, (newVal) => {
  emit('update:modelValue', newVal)
})

const resetForm = () => {
  formData.accountNumber = ''
  formData.accountName = ''
  formData.saveForLater = false
  formRef.value?.clearValidate()
}

const handleCancel = () => {
  visible.value = false
  emit('cancel')
}

const handleConfirm = async () => {
  try {
    // Validate form
    const valid = await formRef.value?.validate()
    if (!valid) return

    loading.value = true

    // Format the phone number (remove leading 0 and add +63)
    const formattedNumber = `+63${formData.accountNumber.substring(1)}`

    // Create the payment method object
    const paymentMethod: PaymentMethod = {
      type: 'mobile_wallet',
      _id: crypto.randomUUID(),
      provider: 'gcash',
      accountNumber: formattedNumber,
      accountName: formData.accountName.trim(),
    }

    // If user wants to save it, add to their saved payment methods
    if (formData.saveForLater) {
      try {
        await userStore.addPaymentMethod(props.userId, paymentMethod)
        ElMessage.success('GCash account saved successfully!')
      } catch (error) {
        console.error('Error saving payment method:', error)
        ElMessage.warning('Payment will proceed but account was not saved for future use')
      }
    }

    // Emit the payment method to parent
    emit('confirm', paymentMethod)
    visible.value = false
  } catch (error) {
    console.error('Error processing GCash payment:', error)
    ElMessage.error('Error processing payment details. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.form-checkbox {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.gcash-modal :deep(.el-dialog) {
  border-radius: 12px;
  overflow: hidden;
}

.gcash-modal :deep(.el-dialog__header) {
  background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
  color: white;
  padding: 20px 24px;
  margin: 0;
}

.gcash-modal :deep(.el-dialog__title) {
  color: white;
  font-weight: 600;
  font-size: 1.125rem;
}

.gcash-modal :deep(.el-dialog__headerbtn .el-dialog__close) {
  color: white;
  font-size: 1.25rem;
}

.modal-content {
  padding: 24px;
}

.payment-icon {
  text-align: center;
  margin-bottom: 24px;
}

.gcash-logo {
  height: 60px;
  width: auto;
}

.gcash-form :deep(.el-form-item__label) {
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.phone-input :deep(.el-input__prefix) {
  display: flex;
  align-items: center;
  padding-left: 12px;
}

.country-code {
  color: #666;
  font-weight: 500;
  margin-right: 8px;
}

.save-option {
  margin-top: 20px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.save-checkbox :deep(.el-checkbox__label) {
  font-weight: 500;
  color: #333;
}

.save-text {
  font-size: 0.875rem;
}

.form-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: flex-end;
  padding: 16px 0;
}

.cancel-btn {
  padding: 10px 20px;
  border: 1px solid #d9d9d9;
  background: white;
}

.cancel-btn:hover {
  border-color: #40a9ff;
  color: #40a9ff;
}

.confirm-btn {
  padding: 10px 24px;
  background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
  border: none;
  font-weight: 600;
  margin: 0;
}

.confirm-btn:hover {
  background: linear-gradient(135deg, #0099cc 0%, #007aa3 100%);
}
</style>
