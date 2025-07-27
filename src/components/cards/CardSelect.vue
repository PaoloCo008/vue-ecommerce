<script setup lang="ts">
import { ref, defineEmits, computed } from 'vue'
import { Check } from '@element-plus/icons-vue'
import type { CreditCard } from '@/lib/types/globals'
import { useUserStore } from '@/stores/UserStore'
import { useAuthStore } from '@/stores/AuthStore'
import { getCardImage } from '@/lib/helpers'

const props = defineProps<{
  creditCards: CreditCard[]
}>()

const userStore = useUserStore()
const authStore = useAuthStore()

// Emits
const emit = defineEmits(['save', 'cancel'])

// Reactive data
const selectedCardId = ref<string | undefined>(undefined)

const selectedCard = computed(() => {
  if (selectedCardId.value) {
    return props.creditCards.find((card) => card._id === selectedCardId.value)
  }
  return null
})

// Get card provider icon/image
const getCardIcon = (provider: string) => {
  const icons = {
    visa: '/visa-icon.svg',
    mastercard: '/mastercard-icon.svg',
    'american-express': '/amex-icon.svg',
    jcb: '/jcb-icon.svg',
  }
  return icons[provider as keyof typeof icons] || '/card-icon.svg'
}

// Get card provider display name
const getCardProviderName = (provider: string) => {
  const names = {
    visa: 'VISA',
    mastercard: 'MASTERCARD',
    'american-express': 'AMERICAN EXPRESS',
    jcb: 'JCB',
  }
  return names[provider as keyof typeof names] || provider.toUpperCase()
}

// Convert credit card to payment method display format
const convertCardToPaymentMethodDisplay = (card: CreditCard) => {
  return {
    id: `card_${card._id}`,
    label: `${card.provider} ************${card.lastFour}`,
    type: 'Credit/Debit Card',
    src: getCardImage(card.provider),
    number: `${card.provider} ************${card.lastFour}`,
    paymentMethodData: card,
  }
}

const selectCard = (id: string) => {
  selectedCardId.value = id
}

const handleSave = () => {
  if (selectedCard.value) {
    const paymentMethodDisplay = convertCardToPaymentMethodDisplay(selectedCard.value)
    emit('save', paymentMethodDisplay)
  }
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<template>
  <div class="credit-card-container">
    <!-- Card List -->
    <div class="card-list" v-if="creditCards.length">
      <div
        v-for="card in creditCards"
        :key="card._id"
        class="card-item"
        :class="{ selected: card._id === selectedCardId }"
        @click="selectCard(card._id)"
      >
        <!-- Card Content -->
        <div class="card-content">
          <!-- Card Info -->
          <div class="card-info">
            <div class="card-header">
              <div class="card-provider">
                <img :src="getCardImage(card.provider)" :alt="card.provider" class="card-icon" />
              </div>
              <!-- Radio Check Icon -->
              <div class="radio-check">
                <el-radio
                  v-if="card._id !== selectedCardId"
                  :model-value="false"
                  :value="true"
                  size="large"
                  @click.stop="selectCard(card._id)"
                />
                <el-icon v-if="card._id === selectedCardId" :size="18" color="#17a2b8">
                  <Check />
                </el-icon>
              </div>
            </div>

            <div class="card-details">
              <div class="card-number">************{{ card.lastFour }}</div>
              <div class="card-meta">
                <span class="card-name">{{ card.cardName }}</span>
                <span class="expiration">Expires {{ card.expiration }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="no-cards">
      <p>No saved credit cards found. Add a credit card to continue.</p>
    </div>

    <!-- Action Buttons -->
    <div class="action-buttons">
      <el-button size="large" class="cancel-btn" @click="handleCancel"> Cancel </el-button>
      <el-button
        type="primary"
        size="large"
        class="save-btn"
        :disabled="!selectedCardId"
        @click="handleSave"
      >
        USE THIS CARD
      </el-button>
    </div>
  </div>
</template>

<style scoped>
/* Mobile-First Base Styles */
.credit-card-container {
  padding: 0;
  display: flex;
  height: 100%;
  flex-direction: column;
}

.card-list {
  flex: 1;
  padding: 12px 16px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.card-item {
  background: white;
  border: 1px solid #e4e7ed;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  -webkit-tap-highlight-color: rgba(23, 162, 184, 0.1);
}

.card-item:active {
  transform: scale(0.98);
}

.card-item:hover {
  border-color: #17a2b8;
  box-shadow: 0 4px 16px rgba(23, 162, 184, 0.12);
}

.card-item.selected {
  border-color: #17a2b8;
  background: linear-gradient(135deg, #f8fdff 0%, #e8f7fa 100%);
  box-shadow: 0 4px 16px rgba(23, 162, 184, 0.15);
}

.card-content {
  width: 100%;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.card-provider {
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-icon {
  width: 32px;
  height: 20px;
  object-fit: contain;
  border-radius: 4px;
}

.provider-name {
  font-weight: 600;
  color: #303133;
  font-size: 13px;
  letter-spacing: 0.5px;
}

.radio-check {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-number {
  font-family: 'Courier New', monospace;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  letter-spacing: 1px;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.card-name {
  color: #606266;
  font-size: 13px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.expiration {
  color: #909399;
  font-size: 12px;
  font-weight: 500;
  flex-shrink: 0;
}

.no-cards {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  text-align: center;
}

.no-cards p {
  color: #909399;
  font-size: 14px;
  margin: 0;
}

.action-buttons {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  background: white;
  border-top: 1px solid #ebeef5;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
}

.cancel-btn {
  flex: 1;
  height: 40px;
  background: #f5f7fa;
  border: 1px solid #dcdfe6;
  color: #606266;
  font-weight: 500;
  font-size: 13px;
}

.cancel-btn:hover,
.cancel-btn:focus {
  background: #ecf5ff;
  border-color: #b3d8ff;
  color: #409eff;
}

.save-btn {
  flex: 1;
  height: 40px;
  background: #17a2b8;
  border-color: #17a2b8;
  font-weight: 600;
  letter-spacing: 0.5px;
  font-size: 13px;
}

.save-btn:hover:not(:disabled),
.save-btn:focus:not(:disabled) {
  background: #138496;
  border-color: #138496;
}

.save-btn:disabled {
  background: #c0c4cc;
  border-color: #c0c4cc;
  cursor: not-allowed;
}

/* Small Mobile (320px+) */
@media (min-width: 320px) {
  .card-item {
    padding: 18px;
  }

  .card-icon {
    width: 36px;
    height: 22px;
  }

  .provider-name {
    font-size: 14px;
  }

  .card-number {
    font-size: 17px;
  }

  .card-name {
    font-size: 13px;
  }
}

/* Large Mobile (480px+) */
@media (min-width: 480px) {
  .card-list {
    padding: 16px 20px;
  }

  .card-item {
    padding: 20px;
    margin-bottom: 14px;
  }

  .card-icon {
    width: 40px;
    height: 24px;
  }

  .provider-name {
    font-size: 14px;
  }

  .card-number {
    font-size: 18px;
  }

  .card-meta {
    gap: 16px;
  }

  .card-name {
    font-size: 14px;
  }

  .expiration {
    font-size: 13px;
  }

  .action-buttons {
    padding: 16px 20px;
    gap: 12px;
  }

  .cancel-btn,
  .save-btn {
    height: 44px;
    font-size: 14px;
  }
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .card-list {
    padding: 20px 24px;
  }

  .card-item {
    padding: 24px;
    margin-bottom: 16px;
  }

  .card-header {
    margin-bottom: 16px;
  }

  .card-provider {
    gap: 10px;
  }

  .card-icon {
    width: 44px;
    height: 28px;
  }

  .provider-name {
    font-size: 15px;
  }

  .radio-check {
    width: 20px;
    height: 20px;
  }

  .card-details {
    gap: 10px;
  }

  .card-number {
    font-size: 19px;
  }

  .card-name {
    font-size: 14px;
  }

  .expiration {
    font-size: 13px;
  }

  .action-buttons {
    padding: 20px 24px;
    gap: 16px;
  }

  .cancel-btn,
  .save-btn {
    height: 48px;
    font-size: 15px;
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .card-list {
    padding: 24px;
  }

  .card-item {
    padding: 28px;
    margin-bottom: 18px;
  }

  .card-header {
    margin-bottom: 18px;
  }

  .card-provider {
    gap: 12px;
  }

  .card-icon {
    width: 48px;
    height: 30px;
  }

  .provider-name {
    font-size: 16px;
  }

  .radio-check {
    width: 22px;
    height: 22px;
  }

  .card-details {
    gap: 12px;
  }

  .card-number {
    font-size: 20px;
  }

  .card-meta {
    gap: 20px;
  }

  .card-name {
    font-size: 15px;
  }

  .expiration {
    font-size: 14px;
  }

  .action-buttons {
    padding: 24px;
  }

  .cancel-btn,
  .save-btn {
    height: 52px;
    font-size: 16px;
  }
}
</style>
