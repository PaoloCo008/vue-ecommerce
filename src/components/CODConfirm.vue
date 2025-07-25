<template>
  <div class="delivery-confirmation">
    <!-- Cash on Delivery Info -->
    <div class="info-item">
      <span class="bullet">-</span>
      <p class="info-text">
        You may pay in cash to our courier upon receiving your parcel at the doorstep
      </p>
    </div>

    <!-- Delivery Status Check -->
    <div class="info-item">
      <span class="bullet">-</span>
      <p class="info-text">
        Before agreeing to receive the parcel, check if your delivery status has been updated to
        'Out for Delivery'
      </p>
    </div>

    <!-- Package Icon -->
    <div class="icon-container">
      <div class="package-icon">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L2 7V17L12 22L22 17V7L12 2Z"
            stroke="#3b82f6"
            stroke-width="2"
            stroke-linejoin="round"
          />
          <path d="M2 7L12 12L22 7" stroke="#3b82f6" stroke-width="2" stroke-linejoin="round" />
          <path d="M12 12V22" stroke="#3b82f6" stroke-width="2" stroke-linejoin="round" />
        </svg>
      </div>
    </div>

    <!-- Airway Bill Check -->
    <div class="info-item">
      <span class="bullet">-</span>
      <p class="info-text">
        Before receiving, confirm that the airway bill shows that the parcel is from Lazada
      </p>
    </div>

    <!-- Order Verification -->
    <div class="info-item">
      <span class="bullet">-</span>
      <p class="info-text">
        Before you make payment to the courier, confirm your order number, sender information and
        tracking number on the parcel
      </p>
    </div>

    <!-- Confirm Button -->
    <button class="confirm-button" @click="handleConfirmSelection">Confirm Selection</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// You can add reactive data here if needed
const isConfirmed = ref(false)

// Method to handle confirmation
const handleConfirmSelection = () => {
  isConfirmed.value = true
  console.log('Selection confirmed')
  // Add your confirmation logic here
}

// Static delivery instructions data
const deliveryInstructions = ref([
  {
    id: 1,
    text: 'You may pay in cash to our courier upon receiving your parcel at the doorstep',
  },
  {
    id: 2,
    text: "Before agreeing to receive the parcel, check if your delivery status has been updated to 'Out for Delivery'",
  },
  {
    id: 3,
    text: 'Before receiving, confirm that the airway bill shows that the parcel is from Lazada',
  },
  {
    id: 4,
    text: 'Before you make payment to the courier, confirm your order number, sender information and tracking number on the parcel',
  },
])
</script>

<style scoped>
.delivery-confirmation {
  max-width: 400px;
  background: white;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.5;
}

.info-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 8px;
}

.bullet {
  color: #666;
  font-weight: 500;
  margin-top: 2px;
  flex-shrink: 0;
}

.info-text {
  margin: 0;
  color: #333;
  font-size: 14px;
  line-height: 1.4;
}

.icon-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.package-icon {
  width: 48px;
  height: 48px;
  background-color: #e1f5fe;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.confirm-button {
  width: 100%;
  background-color: #1db4d1;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 24px;
  transition: background-color 0.2s ease;
}

.confirm-button:hover {
  background-color: #158ba3;
}

.confirm-button:active {
  background-color: #0f6b7a;
}

.confirm-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(29, 180, 209, 0.3);
}
</style>
