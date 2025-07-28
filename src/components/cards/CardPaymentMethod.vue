<script setup lang="ts">
import { ref, defineEmits, computed } from 'vue'
import { ArrowRight, Plus } from '@element-plus/icons-vue'
import CardAddForm from './CardAddForm.vue'
import type { CreditCard, PaymentMethodDisplay } from '@/lib/types/globals'
import { getCardImage } from '@/lib/helpers'
import { useUserStore } from '@/stores/UserStore'
import { useAuthStore } from '@/stores/AuthStore'
import CardSelect from './CardSelect.vue'
import PaymentCODConfirm from '../payment/PaymentCODConfirm.vue'

// Emits
const emit = defineEmits(['methodSelected', 'cardAdded'])

const userStore = useUserStore()
const authStore = useAuthStore()

// Reactive data
const selectedMethod = ref('')
const showCardForm = ref(false)

// Get user's credit cards
const userCreditCards = computed(() => {
  const user = userStore.getUserById(authStore.user as string)
  return (
    (user?.paymentMethods.filter((method) => method.type === 'credit_card') as CreditCard[]) || []
  )
})

// Show card form automatically if no cards exist
const shouldShowCardForm = computed(() => {
  return (
    showCardForm.value || (selectedMethod.value === 'card' && userCreditCards.value.length === 0)
  )
})

// Show card selection if cards exist and not showing form
const shouldShowCardSelect = computed(() => {
  return selectedMethod.value === 'card' && userCreditCards.value.length > 0 && !showCardForm.value
})

// Methods
const selectMethod = (method: string) => {
  selectedMethod.value = method

  // Define method data based on selection
  let methodData = {}

  switch (method) {
    case 'cod':
      methodData = {
        id: 'cash_on_delivery',
        label: 'Cash on Delivery',
        type: 'Cash on Delivery',
        src: 'https://img.lazcdn.com/g/tps/tfs/TB1ZP8kM1T2gK0jSZFvXXXnFXXa-96-96.png_2200x2200q75.png_.webp',
        number: null,
      }
      break
    case 'gcash':
      methodData = {
        id: 'gcash',
        label: 'GCash e-Wallet',
        type: 'GCash e-Wallet',
        src: '/gcash-img.webp',
        number: null,
      }
      break
    case 'card':
      // For card, we'll handle it in the computed properties
      return
  }

  // Emit the method selection and close drawer
  emit('methodSelected', methodData)
}

// Handle when a card is successfully added
const handleCardAdded = (cardData: CreditCard) => {
  const cardMethod = {
    id: `card_${cardData._id}`,
    label: `${cardData.provider.toUpperCase()} ***********${cardData.lastFour}`,
    type: 'Credit/Debit Card',
    src: getCardImage(cardData.provider),
    number: `${cardData.provider.toUpperCase()} ***********${cardData.lastFour}`,
    paymentMethodData: cardData,
  }

  // Reset form state
  showCardForm.value = false
  selectedMethod.value = ''

  emit('cardAdded', cardMethod)
}

// Handle card selection from CreditCardSelect
const handleCardSelected = (paymentMethodDisplay: PaymentMethodDisplay) => {
  selectedMethod.value = ''
  emit('methodSelected', paymentMethodDisplay)
}

// Handle going back from card form or COD confirm
const handleGoBack = () => {
  if (showCardForm.value) {
    showCardForm.value = false
  } else {
    selectedMethod.value = ''
  }
}

// Show the add card form
const showAddCardForm = () => {
  showCardForm.value = true
}

// Handle cancel from card selection
const handleCardSelectCancel = () => {
  selectedMethod.value = ''
}
</script>

<template>
  <div class="payment-methods-container" v-if="selectedMethod === '' || selectedMethod === 'gcash'">
    <!-- Recommended Method -->
    <div class="section">
      <h3 class="section-title">Recommended method(s)</h3>

      <div class="payment-method" @click="selectedMethod = 'cod'">
        <div class="method-icon">
          <img
            src="https://img.lazcdn.com/g/tps/tfs/TB1ZP8kM1T2gK0jSZFvXXXnFXXa-96-96.png_2200x2200q75.png_.webp"
            alt="cod-icon"
            class="cod-img"
          />
        </div>

        <div class="method-content">
          <div class="method-name">Cash on Delivery</div>
          <div class="method-description">Cash on Delivery</div>
        </div>

        <div class="method-action">
          <el-icon :size="16" color="#c0c4cc">
            <ArrowRight />
          </el-icon>
        </div>
      </div>
    </div>

    <!-- Other Payment Methods -->
    <div class="section">
      <h3 class="section-title">Other Payment Methods</h3>

      <!-- GCash e-Wallet -->
      <div
        class="payment-method"
        :class="{ selected: selectedMethod === 'gcash' }"
        @click="selectedMethod = 'gcash'"
      >
        <div class="method-icon">
          <img src="/gcash-img.webp" alt="gcash-img" width="24px" height="24px" />
        </div>

        <div class="method-content">
          <div class="method-header">
            <div class="method-name">GCash e-Wallet</div>
          </div>
          <div class="method-description">GCash account required</div>
        </div>

        <div class="method-selection">
          <el-radio v-model="selectedMethod" value="gcash" size="large" />
        </div>
      </div>

      <!-- Credit/Debit Card -->
      <div class="payment-method" @click="selectMethod('card')">
        <div class="method-icon">
          <div class="card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="6" width="20" height="12" rx="2" fill="#4A90E2" />
              <rect x="2" y="10" width="20" height="2" fill="#333" />
            </svg>
          </div>
        </div>

        <div class="method-content">
          <div class="method-name">Credit/Debit Card</div>
          <div class="method-description">
            {{
              userCreditCards.length > 0
                ? `${userCreditCards.length} saved card${userCreditCards.length > 1 ? 's' : ''}`
                : 'Credit/Debit Card'
            }}
          </div>
        </div>

        <div class="method-extras">
          <el-icon :size="16" color="#c0c4cc">
            <ArrowRight />
          </el-icon>
        </div>
      </div>

      <el-button v-if="selectedMethod === 'gcash'" @click="() => selectMethod('gcash')">
        Confirm
      </el-button>
    </div>
  </div>

  <!-- COD Confirmation -->
  <PaymentCODConfirm
    v-else-if="selectedMethod === 'cod'"
    @go-back="handleGoBack"
    @confirmed="() => selectMethod('cod')"
  />

  <!-- Credit Card Selection (when user has saved cards) -->
  <div v-else-if="shouldShowCardSelect" class="credit-card-section">
    <!-- Header with Add Card button -->
    <div class="card-section-header">
      <h3 class="section-title">Select a card</h3>
      <el-button
        type="primary"
        size="small"
        :icon="Plus"
        @click="showAddCardForm"
        class="add-card-btn"
      >
        Add Card
      </el-button>
    </div>

    <!-- Credit Card Selection Component -->
    <CardSelect
      :credit-cards="userCreditCards"
      @save="handleCardSelected"
      @cancel="handleCardSelectCancel"
    />
  </div>

  <!-- Card Add Form (when no cards or user clicks add card) -->
  <CardAddForm
    v-else-if="shouldShowCardForm"
    opened-from="checkout"
    @go-back="handleGoBack"
    @card-added="handleCardAdded"
  />
</template>

<style scoped>
/* Mobile-First Base Styles */
.payment-methods-container {
  padding: 0;
}

.section {
  margin-bottom: 16px;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 8px 0;
  padding: 0 16px;
}

.payment-method {
  background: white;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  padding: 12px 16px;
  margin: 0 16px 8px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: rgba(0, 123, 255, 0.1);
}

.payment-method:active {
  transform: scale(0.98);
}

.payment-method:hover {
  border-color: #409eff;
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.1);
}

.payment-method.selected {
  border-color: #409eff;
  background: #f0f9ff;
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.15);
}

.payment-method.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.payment-method.disabled:hover {
  border-color: #e4e7ed;
  box-shadow: none;
}

.method-icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: #f0f2f5;
}

.cod-img,
.card-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.method-content {
  flex: 1;
  min-width: 0;
}

.method-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 2px;
  flex-wrap: wrap;
}

.method-name {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
  line-height: 1.4;
}

.method-description {
  font-size: 12px;
  color: #909399;
  line-height: 1.4;
}

.method-selection {
  flex-shrink: 0;
}

.method-action {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.method-extras {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

/* Credit Card Section Styles */
.credit-card-section {
  padding: 0;
}

.card-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px 12px 16px;
  border-bottom: 1px solid #ebeef5;
  margin-bottom: 0;
}

.add-card-btn {
  height: 32px;
  font-size: 12px;
  font-weight: 600;
  padding: 0 12px;
}

/* Small Mobile (320px+) */
@media (min-width: 320px) {
  .payment-method {
    padding: 14px 16px;
    gap: 14px;
  }

  .method-icon {
    width: 36px;
    height: 36px;
  }

  .method-name {
    font-size: 15px;
  }

  .method-description {
    font-size: 13px;
  }

  .add-card-btn {
    height: 34px;
    font-size: 13px;
    padding: 0 14px;
  }
}

/* Large Mobile (480px+) */
@media (min-width: 480px) {
  .payment-methods-container {
    padding: 0 4px;
  }

  .section {
    margin-bottom: 20px;
  }

  .section-title {
    font-size: 15px;
    margin-bottom: 12px;
    padding: 0 20px;
  }

  .payment-method {
    padding: 16px 20px;
    margin: 0 20px 12px 20px;
    gap: 16px;
  }

  .method-icon {
    width: 40px;
    height: 40px;
  }

  .method-name {
    font-size: 15px;
  }

  .method-description {
    font-size: 13px;
  }

  .method-extras {
    gap: 16px;
  }

  .card-section-header {
    padding: 0 20px 16px 20px;
  }

  .add-card-btn {
    height: 36px;
    font-size: 13px;
    padding: 0 16px;
  }
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .payment-methods-container {
    padding: 0 8px;
  }

  .section {
    margin-bottom: 24px;
  }

  .section-title {
    font-size: 16px;
    margin-bottom: 16px;
    padding: 0 24px;
  }

  .payment-method {
    padding: 18px 24px;
    margin: 0 24px 16px 24px;
    gap: 18px;
  }

  .method-icon {
    width: 44px;
    height: 44px;
  }

  .method-name {
    font-size: 16px;
  }

  .method-description {
    font-size: 14px;
  }

  .card-section-header {
    padding: 0 24px 20px 24px;
  }

  .add-card-btn {
    height: 38px;
    font-size: 14px;
    padding: 0 18px;
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .payment-methods-container {
    padding: 0 12px;
  }

  .section {
    margin-bottom: 28px;
  }

  .section-title {
    font-size: 17px;
    margin-bottom: 20px;
    padding: 0 28px;
  }

  .payment-method {
    padding: 20px 28px;
    margin: 0 28px 20px 28px;
    gap: 20px;
  }

  .method-icon {
    width: 48px;
    height: 48px;
  }

  .method-name {
    font-size: 17px;
  }

  .method-description {
    font-size: 15px;
  }

  .card-section-header {
    padding: 0 28px 24px 28px;
  }

  .add-card-btn {
    height: 40px;
    font-size: 14px;
    padding: 0 20px;
  }
}
</style>
