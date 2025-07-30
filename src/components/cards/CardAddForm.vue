<script setup lang="ts">
import { ref, reactive } from 'vue'
import { QuestionFilled } from '@element-plus/icons-vue'
import { getCardProvider } from '@/lib/helpers'
import { useUserStore } from '@/stores/UserStore'
import { useAuthStore } from '@/stores/AuthStore'
import type { CardProviders, CreditCard } from '@/lib/types/globals'

const props = defineProps<{ openedFrom: string }>()

const userStore = useUserStore()
const authStore = useAuthStore()

// Save ref
const save = ref()

// Form reference
const formRef = ref()

// Form data
const form = reactive({
  cardNumber: '4532 1234 5678 9012',
  nameOnCard: 'John Michael Smith',
  expiration: '12/28',
  cvv: '123',
})

// Loading state
const isSubmitting = ref(false)

// Form validation rules
const rules = {
  cardNumber: [
    { required: true, message: 'Please enter card number', trigger: 'blur' },
    {
      validator: (rule: any, value: string, callback: Function) => {
        const cleaned = value.replace(/\s/g, '')
        if (cleaned.length < 15 || cleaned.length > 16) {
          callback(new Error('Card number should be 16 digits'))
        } else if (!/^\d+$/.test(cleaned)) {
          callback(new Error('Card number should only contain digits'))
        } else if (!getCardProvider(value)) {
          callback(new Error('Please provide a valid card number'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
  nameOnCard: [
    { required: true, message: 'Please enter name on card', trigger: 'blur' },
    { min: 2, message: 'Name must be at least 2 characters', trigger: 'blur' },
  ],
  expiration: [
    { required: true, message: 'Please enter expiration date', trigger: 'blur' },
    {
      validator: (rule: any, value: string, callback: Function) => {
        const pattern = /^(0[1-9]|1[0-2])\/\d{2}$/
        if (!pattern.test(value)) {
          callback(new Error('Please enter valid expiration date (MM/YY)'))
        } else {
          // Check if date is not in the past
          const [month, year] = value.split('/')
          const currentDate = new Date()
          const currentYear = currentDate.getFullYear() % 100
          const currentMonth = currentDate.getMonth() + 1

          const expYear = parseInt(year)
          const expMonth = parseInt(month)

          if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
            callback(new Error('Card has expired'))
          } else {
            callback()
          }
        }
      },
      trigger: 'blur',
    },
  ],
  cvv: [
    { required: true, message: 'Please enter CVV', trigger: 'blur' },
    {
      validator: (rule: any, value: string, callback: Function) => {
        if (!/^\d+$/.test(value)) {
          callback(new Error('CVV should only contain digits'))
        } else if (value.length < 3 || value.length > 4) {
          callback(new Error('CVV should be 3-4 digits'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
}

const emit = defineEmits<{
  (e: 'cardAdded', card: CreditCard): void
  (e: 'goBack'): void
  (e: 'cancel'): void
}>()

// Methods
const formatCardNumber = (value: string) => {
  // Remove all non-digits
  const cleaned = value.replace(/\D/g, '')

  // Add spaces every 4 digits
  const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ')

  form.cardNumber = formatted
}

const formatExpiration = (value: string) => {
  // Remove all non-digits
  const cleaned = value.replace(/\D/g, '')

  // Add slash after 2 digits
  if (cleaned.length >= 2) {
    form.expiration = cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4)
  } else {
    form.expiration = cleaned
  }
}

const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    const valid = await formRef.value.validate()
    if (valid) {
      isSubmitting.value = true

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newCard: CreditCard = {
        type: 'credit_card',
        _id: crypto.randomUUID(),
        provider: getCardProvider(form.cardNumber) as CardProviders,
        lastFour: form.cardNumber.slice(-4),
        cardName: form.nameOnCard,
        expiration: form.expiration,
        cvv: form.cvv,
      }

      if (props.openedFrom === 'checkout') {
        if (save.value) {
          userStore.addPaymentMethod(authStore.user as string, newCard)
        }
        emit('cardAdded', newCard)
      } else {
        userStore.addPaymentMethod(authStore.user as string, newCard)
      }

      isSubmitting.value = false
    }
  } catch (error) {
    console.error('Form validation failed:', error)
    isSubmitting.value = false
  }
}

const handleCancel = () => {
  if (props.openedFrom === 'checkout') {
    emit('goBack')
  } else {
    emit('cancel')
  }
}

// Reset form method
const resetForm = () => {
  formRef.value?.resetFields()
}

// Expose methods
defineExpose({
  resetForm,
})
</script>

<template>
  <div class="card-form-container">
    <h3 class="form-title" v-if="openedFrom === 'checkout'">Add Card</h3>
    <el-form ref="formRef" :model="form" :rules="rules" label-position="top" class="card-form">
      <!-- Card Number -->
      <el-form-item prop="cardNumber" class="card-number-item">
        <template #label>
          <div class="label-with-icons">
            <span>Card number</span>
            <div class="card-logos">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg"
                alt="American Express"
                class="card-logo amex"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg"
                alt="MasterCard"
                class="card-logo mastercard"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/40/JCB_logo.svg"
                alt="JCB"
                class="card-logo jcb"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                alt="Visa"
                class="card-logo visa"
              />
            </div>
          </div>
        </template>
        <el-input
          v-model="form.cardNumber"
          placeholder="Card number"
          maxlength="19"
          @input="formatCardNumber"
          class="card-input"
        />
      </el-form-item>

      <!-- Name on Card -->
      <el-form-item prop="nameOnCard">
        <template #label>
          <span>Name on card</span>
        </template>
        <el-input v-model="form.nameOnCard" placeholder="Name on card" class="card-input" />
      </el-form-item>

      <!-- Expiration and CVV Row -->
      <div class="form-row">
        <el-form-item prop="expiration" class="expiration-item">
          <template #label>
            <span>Expiration (MM/YY)</span>
          </template>
          <el-input
            v-model="form.expiration"
            placeholder="MM/YY"
            maxlength="5"
            @input="formatExpiration"
            class="card-input"
          />
        </el-form-item>

        <el-form-item prop="cvv" class="cvv-item">
          <template #label>
            <span>CVV</span>
            <el-tooltip content="3 or 4 digit security code on your card" placement="top">
              <el-icon class="cvv-info-icon">
                <QuestionFilled />
              </el-icon>
            </el-tooltip>
          </template>
          <el-input
            v-model="form.cvv"
            placeholder="CVV"
            maxlength="4"
            type="password"
            show-password
            class="card-input"
          />
        </el-form-item>
      </div>

      <!-- Action Buttons -->
      <div class="form-actions">
        <el-button class="cancel-button" @click="handleCancel" size="large"> CANCEL </el-button>
        <el-button
          type="primary"
          class="confirm-button"
          @click="handleSubmit"
          size="large"
          :loading="isSubmitting"
        >
          Confirm
        </el-button>
      </div>
    </el-form>
    <div class="save-container" v-if="openedFrom === 'checkout'">
      <p>Save Card</p>
      <el-switch v-model="save" />
    </div>
  </div>
</template>

<style scoped>
.form-title {
  margin-bottom: 1rem;
}
.save-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding: 1rem 2rem;
}

.card-form-container {
  max-width: 580px;
  width: 100%;
  margin: 0 auto;
  padding: 16px;
  border-radius: 8px;
}

.card-form {
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-number-item {
  margin-bottom: 24px;
}

.label-with-icons {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem;
}

:deep(.el-form-item__label span) {
  margin-left: 0.75rem;
}

:deep(.el-form-item__label::before) {
  position: absolute;
}

.card-logos {
  display: flex;
  gap: 8px;
  align-items: center;
}

.card-logo {
  height: 24px;
  width: auto;
  object-fit: contain;
}

.card-logo.amex {
  width: 32px;
}

.card-logo.mastercard {
  width: 32px;
}

.card-logo.jcb {
  width: 32px;
}

.card-logo.visa {
  width: 32px;
}

.card-input {
  height: 48px;
}

.card-input :deep(.el-input__inner) {
  height: 48px;
  font-size: 1rem;
  padding: 0 0.5rem;
}

.card-input :deep(.el-input__inner:focus) {
  border-color: #409eff;
}

.form-row {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-direction: column;
  gap: 0;
}

.expiration-item {
  flex: 1;
}

.cvv-item {
  flex: 1;
}

.cvv-info-icon {
  margin-left: 4px;
  color: #909399;
  cursor: pointer;
}

.cvv-info-icon:hover {
  color: #409eff;
}

.form-actions {
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: flex-end;
}

.cancel-button {
  background: #f5f5f5;
  border: 1px solid #dcdfe6;
  color: #606266;
  padding: 12px 32px;
  font-weight: 500;
  border-radius: 4px;
}

.cancel-button:hover {
  background: #e6e6e6;
  border-color: #c0c4cc;
}

.confirm-button {
  background: #17a2b8;
  border: 1px solid #17a2b8;
  padding: 12px 32px;
  font-weight: 500;
  border-radius: 4px;
  margin: 0;
}

.confirm-button:hover {
  background: #138496;
  border-color: #138496;
}

/* Form item styling */
:deep(.el-form-item__label) {
  color: #606266;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 8px;
  line-height: 1.4;
}

:deep(.el-form-item) {
  margin-bottom: 24px;
}

:deep(.el-form-item__error) {
  color: #f56c6c;
  font-size: 0.75rem;
  margin-top: 4px;
}

/* Responsive design */
@media (min-width: 525px) {
  .form-row {
    flex-direction: row;
    gap: 1rem;
  }
}
</style>
