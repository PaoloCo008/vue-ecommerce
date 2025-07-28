<template>
  <div class="payment-details-container">
    <!-- Payment Method Icon -->
    <div class="payment-icon">
      <div class="cod-icon">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="4" y="8" width="24" height="16" rx="2" fill="#4A90E2" />
          <rect x="6" y="11" width="20" height="2" fill="white" />
          <rect x="6" y="16" width="12" height="2" fill="white" />
          <rect x="6" y="19" width="8" height="2" fill="white" />
        </svg>
      </div>
    </div>

    <!-- Instructions List -->
    <div class="instructions-list">
      <div class="instruction-item">
        <div class="instruction-text">
          - You may pay in cash to our courier upon receiving your parcel at the doorstep
        </div>
      </div>

      <div class="instruction-item">
        <div class="instruction-text">
          - Before agreeing to receive the parcel, check if your delivery status has been updated to
          'Out for Delivery'
        </div>
      </div>

      <div class="instruction-item">
        <div class="instruction-text">
          - Before receiving, confirm that the airway bill shows that the parcel is from Lazada
        </div>
      </div>

      <div class="instruction-item">
        <div class="instruction-text">
          - Before you make payment to the courier, confirm your order number, sender information
          and tracking number on the parcel
        </div>
      </div>
    </div>

    <!-- Confirm Button -->
    <div class="confirm-section">
      <el-button type="primary" size="large" class="confirm-btn" @click="handleConfirm">
        Confirm Selection
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'

// Emits
const emit = defineEmits(['confirm'])

// Methods
const handleConfirm = () => {
  emit('confirm')
}
</script>

<style scoped>
/* Mobile-First Base Styles */
.payment-details-container {
  padding: 16px;
  background: white;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.payment-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.cod-icon {
  width: 48px;
  height: 48px;
  background: #e8f4f8;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.instructions-list {
  flex: 1;
  margin-bottom: 24px;
}

.instruction-item {
  margin-bottom: 16px;
  padding: 0 4px;
}

.instruction-text {
  font-size: 14px;
  line-height: 1.6;
  color: #303133;
  text-align: left;
}

.confirm-section {
  padding-top: 16px;
  border-top: 1px solid #ebeef5;
}

.confirm-btn {
  width: 100%;
  height: 44px;
  background: #17a2b8;
  border-color: #17a2b8;
  font-weight: 600;
  font-size: 15px;
  border-radius: 8px;
}

.confirm-btn:hover,
.confirm-btn:focus {
  background: #138496;
  border-color: #138496;
}

.confirm-btn:active {
  transform: scale(0.98);
}

/* Small Mobile (320px+) */
@media (min-width: 320px) {
  .payment-details-container {
    padding: 18px;
  }

  .cod-icon {
    width: 52px;
    height: 52px;
  }

  .instruction-text {
    font-size: 14px;
  }

  .confirm-btn {
    height: 46px;
    font-size: 15px;
  }
}

/* Large Mobile (480px+) */
@media (min-width: 480px) {
  .payment-details-container {
    padding: 20px;
  }

  .payment-icon {
    margin-bottom: 24px;
  }

  .cod-icon {
    width: 56px;
    height: 56px;
  }

  .instructions-list {
    margin-bottom: 28px;
  }

  .instruction-item {
    margin-bottom: 18px;
    padding: 0 8px;
  }

  .instruction-text {
    font-size: 15px;
    line-height: 1.7;
  }

  .confirm-section {
    padding-top: 20px;
  }

  .confirm-btn {
    height: 48px;
    font-size: 16px;
  }
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .payment-details-container {
    padding: 24px;
    max-width: 600px;
    margin: 0 auto;
  }

  .payment-icon {
    margin-bottom: 28px;
  }

  .cod-icon {
    width: 60px;
    height: 60px;
  }

  .instructions-list {
    margin-bottom: 32px;
  }

  .instruction-item {
    margin-bottom: 20px;
    padding: 0 12px;
  }

  .instruction-text {
    font-size: 16px;
    line-height: 1.8;
  }

  .confirm-section {
    padding-top: 24px;
  }

  .confirm-btn {
    height: 52px;
    font-size: 17px;
    max-width: 300px;
    margin: 0 auto;
    display: block;
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .payment-details-container {
    padding: 32px;
    max-width: 700px;
  }

  .payment-icon {
    margin-bottom: 32px;
  }

  .cod-icon {
    width: 64px;
    height: 64px;
  }

  .instructions-list {
    margin-bottom: 36px;
  }

  .instruction-item {
    margin-bottom: 24px;
    padding: 0 16px;
  }

  .instruction-text {
    font-size: 17px;
    line-height: 1.8;
  }

  .confirm-section {
    padding-top: 28px;
  }

  .confirm-btn {
    height: 56px;
    font-size: 18px;
    max-width: 320px;
  }
}

/* Extra Large Desktop (1440px+) */
@media (min-width: 1440px) {
  .payment-details-container {
    padding: 40px;
    max-width: 800px;
  }

  .instruction-text {
    font-size: 18px;
    line-height: 1.9;
  }

  .confirm-btn {
    height: 60px;
    font-size: 19px;
    max-width: 350px;
  }
}
</style>
