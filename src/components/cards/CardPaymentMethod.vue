<template>
  <div class="payment-methods-container">
    <!-- Recommended Method -->
    <div class="section">
      <h3 class="section-title">Recommended method(s)</h3>

      <div class="payment-method recommended" @click="selectMethod('cod')">
        <div class="method-icon">
          <div class="cod-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="6" width="20" height="12" rx="2" fill="#4A90E2" />
              <rect x="4" y="8" width="16" height="2" fill="white" />
              <rect x="4" y="12" width="8" height="2" fill="white" />
            </svg>
          </div>
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
      <div class="payment-method" @click="selectMethod('gcash')">
        <div class="method-icon">
          <div class="gcash-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#007bff" />
              <text
                x="12"
                y="16"
                text-anchor="middle"
                fill="white"
                font-size="8"
                font-weight="bold"
              >
                G
              </text>
            </svg>
          </div>
        </div>

        <div class="method-content">
          <div class="method-header">
            <div class="method-name">GCash e-Wallet</div>
            <div class="discount-badge">Get ₱20.00 discount</div>
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
          <div class="method-description">Credit/Debit Card</div>
        </div>

        <div class="method-extras">
          <div class="card-types">
            <div class="card-type amex"></div>
            <div class="card-type mastercard"></div>
            <div class="card-type jcb"></div>
          </div>
          <el-icon :size="16" color="#c0c4cc">
            <ArrowRight />
          </el-icon>
        </div>
      </div>

      <!-- QR Ph -->
      <div class="payment-method" @click="selectMethod('qr')">
        <div class="method-icon">
          <div class="qr-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="7" rx="1" fill="#4A90E2" />
              <rect x="14" y="3" width="7" height="7" rx="1" fill="#4A90E2" />
              <rect x="3" y="14" width="7" height="7" rx="1" fill="#4A90E2" />
              <rect x="14" y="14" width="7" height="7" rx="1" fill="#4A90E2" />
            </svg>
          </div>
        </div>

        <div class="method-content">
          <div class="method-name">QR Ph</div>
          <div class="method-description">Scan QR code & pay</div>
        </div>

        <div class="method-action">
          <el-icon :size="16" color="#c0c4cc">
            <ArrowRight />
          </el-icon>
        </div>
      </div>

      <!-- Lazada Wallet -->
      <div class="payment-method" @click="selectMethod('lazada')">
        <div class="method-icon">
          <div class="lazada-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#ff6600" />
              <text
                x="12"
                y="16"
                text-anchor="middle"
                fill="white"
                font-size="8"
                font-weight="bold"
              >
                L
              </text>
            </svg>
          </div>
        </div>

        <div class="method-content">
          <div class="method-name">Lazada Wallet</div>
          <div class="method-description">Lazada Wallet</div>
        </div>

        <div class="method-extras">
          <div class="wallet-amount">₱0.00</div>
          <el-radio v-model="selectedMethod" value="lazada" size="large" />
        </div>
      </div>

      <!-- 0% Installment -->
      <div class="payment-method disabled">
        <div class="method-icon">
          <div class="installment-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#909399" />
              <text
                x="12"
                y="16"
                text-anchor="middle"
                fill="white"
                font-size="10"
                font-weight="bold"
              >
                0%
              </text>
            </svg>
          </div>
        </div>

        <div class="method-content">
          <div class="method-name">0% Installment</div>
          <div class="method-description">View payment disabled reason ></div>
        </div>

        <div class="method-action">
          <el-icon :size="16" color="#c0c4cc">
            <ArrowRight />
          </el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'

// Emits
const emit = defineEmits(['methodSelected'])

// Reactive data
const selectedMethod = ref('')

// Methods
const selectMethod = (method) => {
  if (method === 'gcash' || method === 'lazada') {
    selectedMethod.value = method
  }
  emit('methodSelected', method)
}
</script>

<style scoped>
/* Mobile-First Base Styles */
.payment-methods-container {
  padding: 0;
  background: #f5f7fa;
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

.payment-method.recommended {
  border-color: #17a2b8;
  background: #f0f9ff;
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

.cod-icon,
.gcash-icon,
.card-icon,
.qr-icon,
.lazada-icon,
.installment-icon {
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

.discount-badge {
  background: #f56c6c;
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  white-space: nowrap;
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

.card-types {
  display: flex;
  gap: 4px;
  align-items: center;
}

.card-type {
  width: 20px;
  height: 12px;
  border-radius: 2px;
  background: #ddd;
}

.card-type.amex {
  background: #2e77bb;
}

.card-type.mastercard {
  background: #eb001b;
}

.card-type.jcb {
  background: #0e4c96;
}

.wallet-amount {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
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

  .discount-badge {
    font-size: 11px;
    padding: 3px 8px;
  }

  .method-extras {
    gap: 16px;
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

  .discount-badge {
    font-size: 12px;
    padding: 4px 10px;
  }

  .card-types {
    gap: 6px;
  }

  .card-type {
    width: 24px;
    height: 16px;
  }

  .wallet-amount {
    font-size: 15px;
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

  .discount-badge {
    font-size: 12px;
    padding: 4px 12px;
  }

  .wallet-amount {
    font-size: 16px;
  }
}
</style>
