<template>
  <div class="checkout-container">
    <div class="checkout-content">
      <!-- Left Column -->
      <div class="left-column">
        <!-- Shipping Address -->
        <div class="section">
          <div class="section-header">
            <h3>Shipping Address</h3>
            <el-button type="text" class="edit-btn">Edit</el-button>
          </div>
          <div class="address-info">
            <div class="customer-name">Isabella Appumado 09220115407</div>
            <div class="address-badge">
              <el-tag type="danger" size="small">HOME</el-tag>
              <span class="address-text">26 Mabini St. Purok 2, Mojon, Malolos, Bulacan</span>
            </div>
          </div>
        </div>

        <!-- Package Info -->
        <div class="section">
          <div class="package-header">
            <h4>Package 1 of 1</h4>
            <div class="shipped-by">Shipped by <strong>homesalesph2019</strong></div>
          </div>
          
          <!-- Delivery Option -->
          <div class="delivery-option">
            <div class="delivery-title">Choose your delivery option</div>
            <el-card class="delivery-card selected">
              <div class="delivery-info">
                <el-radio v-model="deliveryOption" label="standard" size="large">
                  <div class="delivery-details">
                    <div class="delivery-price">₱38.00</div>
                    <div class="delivery-type">Standard</div>
                    <div class="delivery-date">Get by 1-1-19 Jul</div>
                  </div>
                </el-radio>
              </div>
            </el-card>
          </div>

          <!-- Product Item -->
          <div class="product-item">
            <div class="product-image">
              <img src="https://via.placeholder.com/80x80" alt="Product" />
            </div>
            <div class="product-details">
              <div class="product-name">
                Multipurpose Lanyard ID Badge Holder PU Leather Zipper Pocket with 4 Card Slots for Offices School Credit
              </div>
              <div class="product-color">Black</div>
              <div class="product-pricing">
                <div class="current-price">₱278.02</div>
                <div class="original-price">₱270.02</div>
                <div class="discount-label">Discounted</div>
              </div>
              <div class="product-meta">
                <div class="original-price-crossed">₱534.58</div>
                <div class="discount-percent">-45%</div>
              </div>
            </div>
            <div class="product-quantity">
              <span>Qty: 1</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="right-column">
        <!-- Payment Method -->
        <div class="section">
          <div class="section-header">
            <h3>Select payment method</h3>
            <el-button type="text" class="view-all-btn">View all methods ></el-button>
          </div>
          
          <div class="payment-options">
            <el-card class="payment-card selected">
              <div class="payment-method">
                <el-radio v-model="paymentMethod" label="gcash" size="large">
                  <div class="payment-info">
                    <div class="payment-icon gcash-icon"></div>
                    <div class="payment-details">
                      <div class="payment-number">63-9****1507</div>
                      <div class="payment-type">GCash e-Wallet</div>
                    </div>
                  </div>
                </el-radio>
              </div>
            </el-card>

            <el-card class="payment-card">
              <div class="payment-method">
                <el-radio v-model="paymentMethod" label="visa" size="large">
                  <div class="payment-info">
                    <div class="payment-icon visa-icon"></div>
                    <div class="payment-details">
                      <div class="payment-number">VISA ***********1225</div>
                      <div class="payment-type">Credit/Debit Card</div>
                    </div>
                  </div>
                </el-radio>
              </div>
            </el-card>
          </div>
        </div>

        <!-- Voucher -->
        <div class="section">
          <h3>Voucher</h3>
          <div class="voucher-input">
            <el-input
              v-model="voucherCode"
              placeholder="Enter Voucher Code"
              size="large"
            />
            <el-button type="primary" class="apply-btn">APPLY</el-button>
          </div>
        </div>

        <!-- Invoice and Contact -->
        <div class="section">
          <div class="section-header">
            <h3>Invoice and Contact Info</h3>
            <el-button type="text" class="edit-btn">Edit</el-button>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="section">
          <h3>Order Summary</h3>
          <div class="summary-item">
            <span>Subtotal (1 Items)</span>
            <span>₱278.02</span>
          </div>
          <div class="summary-item">
            <span>Shipping Fee</span>
            <span>₱38.00</span>
          </div>
          <div class="summary-item">
            <span>Seller vouchers ></span>
            <span>₱0.00</span>
          </div>
          <el-divider />
          <div class="summary-total">
            <span>Total</span>
            <span class="total-amount">₱308.02</span>
          </div>
        </div>

        <!-- Place Order Button -->
        <el-button type="primary" size="large" class="place-order-btn">
          PLACE ORDER NOW
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'CheckoutPage',
  setup() {
    const deliveryOption = ref('standard')
    const paymentMethod = ref('gcash')
    const voucherCode = ref('')

    return {
      deliveryOption,
      paymentMethod,
      voucherCode
    }
  }
}
</script>

<style scoped>
.checkout-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
}

.checkout-content {
  display: flex;
  gap: 24px;
}

.left-column {
  flex: 2;
}

.right-column {
  flex: 1;
}

.section {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.edit-btn,
.view-all-btn {
  color: #1890ff;
  padding: 0;
}

.address-info {
  margin-bottom: 16px;
}

.customer-name {
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

.address-badge {
  display: flex;
  align-items: center;
  gap: 8px;
}

.address-text {
  color: #666;
  font-size: 14px;
}

.package-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.package-header h4 {
  margin: 0;
  font-size: 14px;
  color: #333;
}

.shipped-by {
  font-size: 12px;
  color: #666;
}

.delivery-option {
  margin-bottom: 24px;
}

.delivery-title {
  font-size: 14px;
  color: #333;
  margin-bottom: 12px;
}

.delivery-card {
  border: 2px solid #e6f7ff;
  border-radius: 8px;
}

.delivery-card.selected {
  border-color: #1890ff;
}

.delivery-card :deep(.el-card__body) {
  padding: 16px;
}

.delivery-info {
  display: flex;
  align-items: center;
}

.delivery-details {
  margin-left: 8px;
}

.delivery-price {
  font-weight: 600;
  font-size: 16px;
  color: #333;
}

.delivery-type {
  font-size: 14px;
  color: #333;
  margin: 2px 0;
}

.delivery-date {
  font-size: 12px;
  color: #666;
}

.product-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 16px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
}

.product-image img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
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

.product-color {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}

.product-pricing {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.current-price {
  font-size: 16px;
  font-weight: 600;
  color: #ff4d4f;
}

.original-price {
  font-size: 14px;
  color: #ff4d4f;
}

.discount-label {
  font-size: 12px;
  color: #ff4d4f;
  background: #fff2f0;
  padding: 2px 6px;
  border-radius: 4px;
}

.product-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.original-price-crossed {
  font-size: 12px;
  color: #999;
  text-decoration: line-through;
}

.discount-percent {
  font-size: 12px;
  color: #ff4d4f;
}

.product-quantity {
  font-size: 14px;
  color: #666;
}

.payment-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.payment-card {
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  cursor: pointer;
}

.payment-card.selected {
  border-color: #1890ff;
}

.payment-card :deep(.el-card__body) {
  padding: 16px;
}

.payment-method {
  display: flex;
  align-items: center;
}

.payment-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: 8px;
}

.payment-icon {
  width: 32px;
  height: 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  color: white;
}

.gcash-icon {
  background: #007bff;
}

.visa-icon {
  background: #1a1f71;
}

.payment-details {
  flex: 1;
}

.payment-number {
  font-size: 14px;
  color: #333;
  margin-bottom: 2px;
}

.payment-type {
  font-size: 12px;
  color: #666;
}

.voucher-input {
  display: flex;
  gap: 12px;
}

.voucher-input .el-input {
  flex: 1;
}

.apply-btn {
  background: #17a2b8;
  border-color: #17a2b8;
  min-width: 80px;
}

.apply-btn:hover {
  background: #138496;
  border-color: #138496;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;
  color: #666;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.total-amount {
  color: #ff4d4f;
  font-size: 18px;
}

.place-order-btn {
  width: 100%;
  height: 48px;
  background: #ff6b35;
  border-color: #ff6b35;
  font-size: 16px;
  font-weight: 600;
  margin-top: 16px;
}

.place-order-btn:hover {
  background: #ff5722;
  border-color: #ff5722;
}

@media (max-width: 768px) {
  .checkout-content {
    flex-direction: column;
  }
  
  .left-column,
  .right-column {
    flex: 1;
  }
}
</style>
