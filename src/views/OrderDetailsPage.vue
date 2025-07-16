<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const steps = ref([
  {
    id: 1,
    title: 'Order Placed',
    description: '07/05/2025 04:36',
    icon: 'Document',
  },
  {
    id: 2,
    title: 'Order Paid (₱518)',
    description: '07/05/2025 04:36',
    icon: 'CreditCard',
  },
  {
    id: 3,
    title: 'Order Shipped Out',
    description: '07/05/2025 17:05',
    icon: 'Truck',
  },
  {
    id: 4,
    title: 'Order Received',
    description: '07/06/2025 10:14',
    icon: 'Box',
  },
  {
    id: 5,
    title: 'To Rate',
    description: '',
    icon: 'Star',
  },
])

const trackingSteps = ref([
  {
    title: 'Delivered',
    description: '07/06/2025 10:14 - Parcel has been delivered - View Proof of Delivery',
    status: 'finish',
  },
  {
    title: 'In transit',
    description: '07/06/2025 08:48 - Parcel is out for delivery',
    status: 'process',
  },
  {
    title: 'Processing',
    description: '07/06/2025 08:06 - Your parcel has arrived at the delivery hub',
    status: 'wait',
  },
  {
    title: 'Processing',
    description: '07/05/2025 21:58 - Parcel has departed from sorting facility',
    status: 'wait',
  },
  {
    title: 'Processing',
    description: '07/05/2025 21:53 - Parcel has arrived at sorting facility',
    status: 'wait',
  },
  {
    title: 'Processing',
    description: '07/05/2025 17:05 - Parcel has arrived at sorting facility',
    status: 'wait',
  },
])
</script>

<template>
  <div class="order-page">
    <!-- Header -->
    <div class="header">
      <button class="back-btn" @click="router.back()">
        <span>‹</span>
        <span>BACK</span>
      </button>
      <div class="order-info">
        <div class="order-id">ORDER ID: 250705A3BETUD0</div>
        <div class="order-status">ORDER COMPLETED</div>
      </div>
    </div>

    <!-- Progress Steps -->
    <div class="progress-section">
      <!-- Desktop optimized steps -->
      <div class="desktop-steps">
        <div class="progress-container">
          <div class="progress-line">
            <div class="progress-line-fill" :style="{ width: '80%' }"></div>
          </div>
          <div
            v-for="(step, index) in steps"
            :key="step.id"
            class="desktop-step"
            :class="{
              completed: index < 4,
              current: index === 4,
              pending: index > 4,
            }"
          >
            <div class="desktop-step-icon">
              <span v-if="index < 4">✓</span>
              <span v-else-if="index === 4">{{ step.id }}</span>
              <span v-else>{{ step.id }}</span>
            </div>
            <div class="desktop-step-content">
              <div class="desktop-step-title">{{ step.title }}</div>
              <div class="desktop-step-description" v-if="step.description">
                {{ step.description }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile optimized steps -->
      <div class="mobile-steps">
        <div
          v-for="(step, index) in steps"
          :key="step.id"
          class="mobile-step"
          :class="{
            completed: index < 4,
            current: index === 4,
            pending: index > 4,
          }"
        >
          <div class="mobile-step-icon">
            <div class="step-number">
              <span v-if="index < 4">✓</span>
              <span v-else>{{ step.id }}</span>
            </div>
          </div>
          <div class="mobile-step-content">
            <div class="mobile-step-title">{{ step.title }}</div>
            <div class="mobile-step-description" v-if="step.description">
              {{ step.description }}
            </div>
          </div>
          <div class="mobile-step-line" v-if="index < steps.length - 1"></div>
        </div>
      </div>
    </div>

    <!-- Return Notice -->
    <div class="return-notice">Request for return/refund by 07/21/2025 if necessary</div>

    <!-- Action Buttons -->
    <div class="action-buttons">
      <el-button type="danger" size="large" style="width: 100%">Rate</el-button>
      <el-button size="large" style="width: 100%">Request For Return/Refund</el-button>
      <el-button size="large" style="width: 100%">Contact Seller</el-button>
      <el-button size="large" style="width: 100%">Buy Again</el-button>
      <el-button size="large" style="width: 100%">View E-Invoice</el-button>
    </div>

    <!-- Delivery Address & Tracking -->
    <div class="delivery-info">
      <div class="delivery-address">
        <h3 class="section-title">Delivery Address</h3>
        <div class="address-details">
          <strong>Paolo Henry Co</strong><br />
          <div class="contact-info">(+63) 9178777471</div>
          <div>840 L12-5 Winter Green Street, South Green Heights,</div>
          <div>Putatan, Muntinlupa City, Putatan, Muntinlupa City,</div>
          <div>Metro Manila, Metro Manila, 1772</div>
        </div>
        <div class="express-info">
          J10 Express<br />
          206804148729836
        </div>
      </div>

      <div class="delivery-tracking">
        <div class="tracking-steps">
          <el-steps :active="0" direction="vertical" finish-status="success">
            <el-step
              v-for="(track, index) in trackingSteps"
              :key="index"
              :title="track.title"
              :description="track.description"
              :status="track.status"
            />
          </el-steps>
          <div class="see-more">See More</div>
        </div>
      </div>
    </div>

    <!-- Seller Info -->
    <div class="seller-info">
      <div class="seller-badge">Mall</div>
      <div class="seller-name">ankerphilippines</div>
      <div class="seller-actions">
        <a href="#" class="action-link">💬 Chat</a>
        <a href="#" class="action-link">👁 View Shop</a>
      </div>
    </div>

    <!-- Products -->
    <div class="product-item">
      <img
        src="https://via.placeholder.com/80x80/f0f0f0/999?text=Product"
        alt="Product"
        class="product-image"
      />
      <div class="product-details">
        <div class="product-name">
          Anker Zolo 30W/20W Fast Wall Charger Compact Size Foldable Plug for iPhone 16/15/14 Series
        </div>
        <div class="product-variant">Variation: White,30W</div>
        <div class="product-quantity">x1</div>
      </div>
    </div>

    <div class="product-item">
      <img
        src="https://via.placeholder.com/80x80/f0f0f0/999?text=Product"
        alt="Product"
        class="product-image"
      />
      <div class="product-details">
        <div class="product-name">
          Anker 322 USB C to USB C 3ft Nylon Braided Cable Fast Charging
        </div>
        <div class="product-variant">x1</div>
      </div>
    </div>

    <!-- Price Summary -->
    <div class="price-summary">
      <div class="price-row">
        <div class="price-label">
          <span class="bundle-tag">Bundle</span>
          Buy 2, Saved ₱31
        </div>
        <div class="price-value">₱745</div>
      </div>

      <div class="price-row">
        <div class="price-label">Merchandise Subtotal</div>
        <div class="price-value">₱745</div>
      </div>

      <div class="price-row">
        <div class="price-label">Shipping Fee</div>
        <div class="price-value">₱36</div>
      </div>

      <div class="price-row">
        <div class="price-label">Shipping Discount Subtotal</div>
        <div class="price-discount">-₱36</div>
      </div>

      <div class="price-row">
        <div class="price-label">Shopee Voucher Applied</div>
        <div class="price-discount">-₱147</div>
      </div>

      <div class="price-row">
        <div class="price-label">Shop Voucher Applied</div>
        <div class="price-discount">-₱80</div>
      </div>

      <div class="price-row price-total">
        <div class="price-label">Order Total</div>
        <div class="price-value">₱518</div>
      </div>

      <div class="payment-method">
        <div class="price-row">
          <div class="price-label">Payment Method</div>
          <div class="payment-method-value">BPI Online</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.order-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  border: none;
  background: none;
}

.back-btn:hover {
  color: #ee4d2d;
}

.order-info {
  text-align: right;
  font-size: 14px;
}

.order-id {
  color: #ee4d2d;
  font-weight: 500;
}

.order-status {
  color: #ee4d2d;
  font-weight: 600;
  margin-top: 4px;
}

/* Progress Section Styles */
.progress-section {
  margin-bottom: 40px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 40px;
  border-radius: 16px;
  border: 1px solid #dee2e6;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* Desktop Steps (Custom Design) */
.desktop-steps {
  display: block;
}

.progress-container {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 100%;
}

.progress-line {
  position: absolute;
  top: 30px;
  left: 60px;
  right: 60px;
  height: 3px;
  background-color: #e9ecef;
  border-radius: 2px;
  z-index: 1;
}

.progress-line-fill {
  height: 100%;
  background: linear-gradient(90deg, #4caf50 0%, #66bb6a 100%);
  border-radius: 2px;
  transition: width 0.6s ease;
}

.desktop-step {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
  z-index: 2;
  max-width: 160px;
}

.desktop-step-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.desktop-step.completed .desktop-step-icon {
  background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
  color: white;
  transform: scale(1.1);
}

.desktop-step.current .desktop-step-icon {
  background: linear-gradient(135deg, #ee4d2d 0%, #ff6b47 100%);
  color: white;
  transform: scale(1.1);
  animation: pulse 2s infinite;
}

.desktop-step.pending .desktop-step-icon {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  color: #6c757d;
  border: 2px solid #dee2e6;
}

@keyframes pulse {
  0% {
    box-shadow: 0 4px 12px rgba(238, 77, 45, 0.3);
  }
  50% {
    box-shadow: 0 4px 20px rgba(238, 77, 45, 0.6);
  }
  100% {
    box-shadow: 0 4px 12px rgba(238, 77, 45, 0.3);
  }
}

.desktop-step-content {
  min-height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.desktop-step-title {
  font-size: 15px;
  font-weight: 600;
  color: #212529;
  margin-bottom: 8px;
  line-height: 1.3;
}

.desktop-step-description {
  font-size: 13px;
  color: #6c757d;
  line-height: 1.4;
  font-weight: 500;
}

.desktop-step.completed .desktop-step-title {
  color: #4caf50;
}

.desktop-step.current .desktop-step-title {
  color: #ee4d2d;
  font-weight: 700;
}

.desktop-step.pending .desktop-step-title {
  color: #adb5bd;
}

/* Mobile Steps (Custom) */
.mobile-steps {
  display: none;
}

.mobile-step {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 15px 0;
}

.mobile-step-icon {
  position: relative;
  z-index: 2;
  flex-shrink: 0;
}

.step-number {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.mobile-step.completed .step-number {
  background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
  color: white;
}

.mobile-step.current .step-number {
  background: linear-gradient(135deg, #ee4d2d 0%, #ff6b47 100%);
  color: white;
}

.mobile-step.pending .step-number {
  background: #f8f9fa;
  color: #6c757d;
  border: 2px solid #dee2e6;
}

.mobile-step-content {
  flex: 1;
  padding-top: 4px;
}

.mobile-step-title {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
  line-height: 1.3;
}

.mobile-step-description {
  font-size: 12px;
  color: #666;
  line-height: 1.3;
}

.mobile-step-line {
  position: absolute;
  left: 15px;
  top: 47px;
  bottom: -15px;
  width: 2px;
  background: #ddd;
  z-index: 1;
}

.mobile-step.completed .mobile-step-line {
  background: #4caf50;
}

.mobile-step:last-child .mobile-step-line {
  display: none;
}

.return-notice {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 4px;
  padding: 12px;
  margin-bottom: 30px;
  font-size: 13px;
  color: #856404;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 30px;
}

.btn-primary {
  background: #ee4d2d;
  border: none;
  color: white;
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.btn-secondary {
  background: white;
  border: 1px solid #ddd;
  color: #666;
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.btn-secondary:hover {
  border-color: #ee4d2d;
  color: #ee4d2d;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
}

.delivery-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;
}

.delivery-address {
  grid-column: 1;
}

.delivery-tracking {
  grid-column: 2;
}

.address-details {
  font-size: 14px;
  line-height: 1.5;
  color: #666;
}

.contact-info {
  margin-top: 10px;
}

.express-info {
  font-size: 12px;
  color: #999;
  text-align: right;
  margin-top: 10px;
}

.tracking-steps {
  margin-top: 10px;
}

.tracking-steps .el-steps {
  flex-direction: column;
  align-items: flex-start;
}

.tracking-steps .el-step {
  padding-bottom: 15px;
}

.tracking-steps .el-step__head {
  width: 20px;
  height: 20px;
}

.tracking-steps .el-step__icon {
  width: 20px;
  height: 20px;
  font-size: 12px;
  line-height: 20px;
}

.tracking-steps .el-step__title {
  font-size: 13px !important;
  font-weight: 500 !important;
  color: #333 !important;
  margin-bottom: 2px !important;
}

.tracking-steps .el-step__description {
  font-size: 12px !important;
  color: #666 !important;
  line-height: 1.3 !important;
}

.tracking-steps .el-step__main {
  margin-left: 30px;
}

.tracking-steps .el-step__line {
  left: 10px;
  top: 20px;
  height: calc(100% - 5px);
}

.tracking-steps .el-step__head.is-finish .el-step__icon {
  background-color: #4caf50 !important;
  border-color: #4caf50 !important;
}

.tracking-steps .el-step__head.is-process .el-step__icon {
  background-color: #ff9800 !important;
  border-color: #ff9800 !important;
}

.tracking-steps .el-step__line.is-finish {
  background-color: #4caf50 !important;
}

.see-more {
  color: #ee4d2d;
  font-size: 12px;
  cursor: pointer;
  margin-left: 35px;
  margin-top: 10px;
}

.seller-info {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.seller-badge {
  background: #ee4d2d;
  color: white;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 11px;
  font-weight: 500;
}

.seller-name {
  font-weight: 500;
  font-size: 14px;
}

.seller-actions {
  display: flex;
  gap: 10px;
  margin-left: auto;
}

.action-link {
  color: #666;
  font-size: 12px;
  text-decoration: none;
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 3px;
}

.action-link:hover {
  color: #ee4d2d;
  border-color: #ee4d2d;
}

.product-item {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.product-image {
  width: 80px;
  height: 80px;
  border-radius: 4px;
  object-fit: cover;
  flex-shrink: 0;
  background: #f0f0f0;
}

.product-details {
  flex: 1;
}

.product-name {
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
  line-height: 1.4;
}

.product-variant {
  font-size: 12px;
  color: #666;
  margin-bottom: 10px;
}

.product-quantity {
  font-size: 14px;
  color: #666;
}

.price-summary {
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.price-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
}

.price-label {
  color: #666;
}

.price-value {
  color: #333;
}

.price-discount {
  color: #4caf50;
}

.price-total {
  font-weight: 600;
  font-size: 16px;
  color: #ee4d2d;
  border-top: 1px solid #eee;
  padding-top: 10px;
  margin-top: 10px;
}

.bundle-tag {
  background: #ff6b35;
  color: white;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 11px;
  margin-right: 8px;
}

.payment-method {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.payment-method-value {
  font-weight: 500;
  color: #333;
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .order-page {
    padding: 15px;
  }

  .progress-section {
    margin-bottom: 30px;
    padding: 25px 20px;
  }

  .el-steps {
    padding: 0 10px;
  }

  .el-step__title {
    font-size: 13px !important;
  }

  .el-step__description {
    font-size: 11px !important;
  }

  .el-step__icon {
    font-size: 20px !important;
    width: 36px !important;
    height: 36px !important;
  }

  .delivery-info {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .delivery-address {
    grid-column: 1;
  }

  .delivery-tracking {
    grid-column: 1;
  }

  .express-info {
    text-align: left;
  }
}

@media (max-width: 768px) {
  .order-page {
    padding: 10px;
  }

  .header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }

  .order-info {
    text-align: center;
  }

  /* Switch to mobile steps */
  .desktop-steps {
    display: none;
  }

  .mobile-steps {
    display: block;
  }

  .progress-section {
    margin-bottom: 25px;
    background: #f8f9fa;
    padding: 20px 15px;
    border-radius: 8px;
  }

  .mobile-step-title {
    font-size: 13px;
  }

  .mobile-step-description {
    font-size: 11px;
  }

  .delivery-info {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .action-buttons {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .product-item {
    grid-template-columns: 60px 1fr;
    gap: 10px;
  }

  .product-image {
    width: 60px;
    height: 60px;
  }

  .seller-actions {
    flex-direction: column;
    gap: 5px;
  }

  .price-row {
    flex-direction: column;
    gap: 5px;
    align-items: flex-start;
  }

  .price-row .price-value,
  .price-row .price-discount {
    align-self: flex-end;
  }
}

@media (max-width: 480px) {
  .order-page {
    padding: 8px;
  }

  .header {
    margin-bottom: 20px;
  }

  .progress-section {
    margin-bottom: 20px;
    padding: 15px 12px;
    border-radius: 6px;
  }

  .mobile-step {
    padding: 12px 0;
    gap: 12px;
  }

  .step-number {
    width: 28px;
    height: 28px;
    font-size: 12px;
  }

  .mobile-step-line {
    left: 13px;
    top: 40px;
  }

  .mobile-step-title {
    font-size: 12px;
    font-weight: 500;
  }

  .mobile-step-description {
    font-size: 10px;
  }

  .section-title {
    font-size: 14px;
    margin-bottom: 15px;
  }

  .product-name {
    font-size: 13px;
  }

  .product-variant {
    font-size: 11px;
  }

  .address-details {
    font-size: 13px;
  }

  .tracking-steps .el-step__title {
    font-size: 12px !important;
  }

  .tracking-steps .el-step__description {
    font-size: 11px !important;
  }
}

/* Extra small devices */
@media (max-width: 360px) {
  .mobile-step-title {
    font-size: 11px;
    line-height: 1.2;
  }

  .mobile-step-description {
    font-size: 9px;
  }

  .step-number {
    width: 26px;
    height: 26px;
    font-size: 11px;
  }

  .mobile-step-line {
    left: 12px;
  }
}
</style>
