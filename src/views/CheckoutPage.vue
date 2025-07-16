<script setup lang="ts">
import AppAddressTag from '@/components/app/AppAddressTag.vue'
import AppDrawer from '@/components/app/AppDrawer.vue'
import AppModal from '@/components/app/AppModal.vue'
import AddressForm from '@/components/forms/AddressForm.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const deliveryOption = ref('standard')
const paymentMethod = ref('gcash')

function handleModalOpen(closeDrawer: () => void, openModal: () => void) {
  closeDrawer()
  openModal()
}

const dialogStyle = {
  width: '100%',
  maxWidth: '1200px',
}
</script>

<template>
  <div class="checkout-container">
    <div class="checkout-content">
      <!-- Left Column -->
      <div class="left-column">
        <!-- Shipping Address -->
        <div class="section">
          <div class="section-header">
            <h3>Shipping Address</h3>
            <AppDrawer header="Shipping Address">
              <template #trigger="props">
                <el-button type="text" class="edit-btn" @click="props.handleOpenDrawer"
                  >Edit</el-button
                >
              </template>
              <template #default="drawerProps">
                <div class="shipping">
                  <AppModal :dialog-style="dialogStyle">
                    <template #trigger="modalProps">
                      <el-button
                        link
                        @click="
                          handleModalOpen(drawerProps.handleCloseDrawer, modalProps.onTriggerClick)
                        "
                        class="modal-trigger"
                        type="primary"
                        >Add new address</el-button
                      >
                    </template>

                    <AddressForm />
                  </AppModal>
                  <div></div>
                </div>
              </template>
            </AppDrawer>
          </div>
          <div class="address-info">
            <div class="customer-name">Isabella Agumaldo 09220115407</div>
            <div class="address-badge">
              <AppAddressTag label="home" />
              <span class="address-text">26 Mabini St. Purok 2, Mojon, Malolos, Bulacan</span>
            </div>
          </div>
        </div>

        <!-- Package Info -->
        <div class="section">
          <div class="package-header">
            <h4>Package 1 of 1</h4>
            <!-- <div class="shipped-by">Shipped by <strong>homesalesph2019</strong></div> -->
          </div>

          <!-- Delivery Option -->
          <div class="delivery-option">
            <div class="delivery-title">Choose your delivery option</div>
            <div class="delivery-card selected">
              <div class="delivery-info">
                <el-radio v-model="deliveryOption" label="standard" size="large">
                  <div class="delivery-details">
                    <div class="delivery-price">₱38.00</div>
                    <div class="delivery-type">Standard</div>
                    <div class="delivery-date">Get by 11-19 Jul</div>
                  </div>
                </el-radio>
              </div>
            </div>
          </div>

          <!-- Product Item -->
          <div class="product-item">
            <div class="product-image">
              <img src="/Product+Showcase-1.jpg" alt="Product" />
            </div>
            <div class="product-details">
              <div class="product-name">
                Multipurpose Lanyard ID Badge Holder PU Leather Zipper Pocket with 4 Card Slots for
                Offices School Credit
              </div>
              <div class="product-color">Black</div>
              <div class="product-meta">
                <div class="current-price">₱278.02</div>

                <span>Qty: 1</span>
              </div>
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
            <AppDrawer header="Select Payment Method">
              <template #trigger="props">
                <el-button type="text" class="view-all-btn" @click="props.handleOpenDrawer"
                  >View all methods ></el-button
                >
              </template>
            </AppDrawer>
          </div>

          <div class="payment-options">
            <div class="payment-card selected">
              <div class="payment-method">
                <el-radio v-model="paymentMethod" label="gcash" size="large">
                  <div class="payment-info">
                    <div class="payment-icon gcash-icon">G</div>
                    <div class="payment-details">
                      <div class="payment-number">63-9****1507</div>
                      <div class="payment-type">GCash e-Wallet</div>
                    </div>
                  </div>
                </el-radio>
                <div class="payment-checkmark">✓</div>
              </div>
            </div>

            <div class="payment-card">
              <div class="payment-method">
                <el-radio v-model="paymentMethod" label="visa" size="large">
                  <div class="payment-info">
                    <div class="payment-icon visa-icon">VISA</div>
                    <div class="payment-details">
                      <div class="payment-number">VISA ***********1225</div>
                      <div class="payment-type">Credit/Debit Card</div>
                    </div>
                  </div>
                </el-radio>
              </div>
            </div>
          </div>
        </div>

        <!-- Voucher -->
        <!-- <div class="section">
          <h3>Voucher</h3>
          <div class="voucher-input">
            <el-input v-model="voucherCode" placeholder="Enter Voucher Code" size="large" />
            <el-button type="primary" class="apply-btn">APPLY</el-button>
          </div>
        </div> -->

        <!-- Invoice and Contact -->
        <!-- <div class="section">
          <div class="section-header">
            <h3>Invoice and Contact Info</h3>
            <el-button type="text" class="edit-btn">Edit</el-button>
          </div>
        </div> -->

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
            <span>Seller vouchers</span>
            <span>₱0.00</span>
          </div>
          <div class="summary-divider"></div>
          <div class="summary-total">
            <span>Total</span>
            <span class="total-amount">₱308.02</span>
          </div>
        </div>

        <!-- Place Order Button -->
        <el-button type="primary" size="large" class="place-order-btn">PLACE ORDER NOW</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shipping {
  background-color: red;
  width: 100%;
  height: 500px;
}

.modal-trigger {
  position: absolute;
  font-size: 0.875rem;
  top: 2rem;
  right: 5rem;
}

.checkout-container {
  padding: 1rem;
}

.checkout-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.left-column {
  flex: 1.5;
}

.right-column {
  flex: 1;
}

.section {
  background: white;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e8e8e8;
}

.section h3 {
  margin-bottom: 1rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.section-header h3 {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 600;
  color: #333;
}

.edit-btn,
.view-all-btn {
  color: #1890ff;
  padding: 0;
  font-size: 0.75rem;
}

.address-info {
  margin-bottom: 16px;
}

.customer-name {
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
  font-size: 14px;
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
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 16px;
}

.package-header h4 {
  margin: 0;
  font-size: 14px;
  color: #333;
  font-weight: 600;
}

.delivery-option {
  margin-bottom: 24px;
}

.delivery-title {
  font-size: 14px;
  color: #333;
  margin-bottom: 12px;
  font-weight: 500;
}

.delivery-card {
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  padding: 16px;
  background: white;
}

.delivery-card.selected {
  border-color: #1890ff;
  background: #f6f9ff;
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
  font-size: 0.875rem;
  color: #333;
}

.delivery-type {
  font-size: 0.75rem;
  color: #333;
  margin: 2px 0;
}

.delivery-date {
  font-size: 0.6875rem;
  color: #666;
}

.product-item {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  padding: 16px;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  background: #fafafa;
}

.product-image {
  margin: 0 auto;
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
  font-size: 0.875rem;
  color: #333;
  margin-bottom: 8px;
  line-height: 1.4;
  text-align: center;
}

.product-color {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
  text-align: center;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-pricing {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 4px;
}

.current-price {
  font-size: 16px;
  font-weight: 600;
  color: #ff4d4f;
}

.product-quantity {
  font-size: 14px;
  color: #666;
  align-self: flex-end;
}

.payment-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.payment-card {
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  padding: 0.75rem;
  cursor: pointer;
  background: white;
}

.payment-card.selected {
  border-color: #1890ff;
  background: #f6f9ff;
}

.payment-method {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.payment-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: 8px;
  flex: 1;
  min-width: 0;
}

.payment-icon {
  width: 36px;
  height: 22px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
  color: white;
  flex-shrink: 0;
}

.gcash-icon {
  background: #007bff;
}

.visa-icon {
  background: #1a1f71;
  font-size: 8px;
}

.payment-details {
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.payment-number {
  font-size: 0.6875rem;
  color: #333;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.payment-type {
  font-size: 0.625rem;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.payment-checkmark {
  color: #52c41a;
  font-size: 16px;
  font-weight: bold;
  flex-shrink: 0;
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
  font-weight: 600;
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

.summary-divider {
  height: 1px;
  background: #e8e8e8;
  margin: 16px 0;
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
  font-weight: 700;
}

.place-order-btn {
  width: 100%;
  height: 48px;
  background: #ff6b35;
  border-color: #ff6b35;
  font-size: 16px;
  font-weight: 600;
  margin-top: 16px;
  text-transform: uppercase;
}

.place-order-btn:hover {
  background: #ff5722;
  border-color: #ff5722;
}

@media screen and (min-width: 400px) {
  .section-header h3 {
    font-size: 0.875rem;
  }

  .view-all-btn {
    font-size: 0.875rem;
  }
}

@media screen and (min-width: 575px) {
  .section-header h3 {
    font-size: 1rem;
  }

  .payment-number {
    font-size: 0.875rem;
  }

  .payment-type {
    font-size: 0.875rem;
  }

  .payment-card {
    padding: 1rem;
  }

  .delivery-card {
    padding: 1.25rem;
  }

  .product-item {
    flex-direction: row;
    align-items: center;
  }

  .product-name,
  .product-color {
    text-align: left;
  }
}

@media screen and (min-width: 785px) {
  .checkout-content {
    flex-direction: row;
  }

  .section-header {
    flex-wrap: wrap;
  }
}
</style>
