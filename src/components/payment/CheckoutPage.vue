<script setup lang="ts">
import AppAddressTag from '@/components/app/AppAddressTag.vue'
import AppDrawer from '@/components/app/AppDrawer.vue'
import AppModal from '@/components/app/AppModal.vue'
import AddressForm from '@/components/address/AddressForm.vue'
import { ref } from 'vue'
import AddressShippingSelect from '@/components/address/AddressShippingSelect.vue'
import CardPaymentMethod from '@/components/cards/CardPaymentMethod.vue'

import { useUserStore } from '@/stores/UserStore'
import { useAuthStore } from '@/stores/AuthStore'
import { formatPrice } from '@/lib/helpers'
import { useOrderStore } from '@/stores/OrderStore'
import { useRoute } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import type { PaymentMethod, PaymentMethodDisplay } from '@/lib/types/globals'
import PaymentGCashModal from '@/components/payment/PaymentGCashModal.vue'

const userStore = useUserStore()
const authStore = useAuthStore()
const orderStore = useOrderStore()
const route = useRoute()

const orderId = orderStore.decodeOrderId(route.params.pendingOrderId as string)
const pendingOrder = orderStore.getPendingOrderById(orderId as string)

const addresses = userStore.getUserAddressesById(authStore.user as string)
const products = ref(orderStore.getSelectedItemsByPendingOrderId(orderId as string))

const address = ref(
  userStore.getUserAddressByAddressId(
    authStore.user as string,
    pendingOrder?.shippingAddress as string,
  ) || userStore.getUserDefaultShippingAddressById(authStore.user as string),
)

const availablePaymentMethods = ref(pendingOrder?.availablePaymentMethods || [])
const paymentMethod = ref(pendingOrder?.selectedPaymentMethodId || '')

function updatePaymentMethodSelection(methodId: string) {
  paymentMethod.value = methodId
  orderStore.updatePendingOrder(orderId as string, {
    selectedPaymentMethodId: methodId,
  })
}

function handlePaymentMethodSelected(methodData: PaymentMethodDisplay, closeModal: () => void) {
  orderStore.updatePendingOrderPaymentMethods(orderId as string, methodData)

  const updatedOrder = orderStore.getPendingOrderById(orderId as string)
  if (updatedOrder) {
    availablePaymentMethods.value = updatedOrder.availablePaymentMethods || []
    paymentMethod.value = updatedOrder.selectedPaymentMethodId || ''
  }

  closeModal()
}

function handleSelectedAddress(addressId: string, closeDrawer: () => void) {
  address.value = userStore.getUserAddressByAddressId(authStore.user as string, addressId)
  orderStore.updatePendingOrder(orderId as string, { shippingAddress: addressId })
  closeDrawer()
}

function handleNewAddress(closeModal: () => void, openDrawer: () => void) {
  closeModal()
  openDrawer()
}

const deliveryOption = ref('standard')
const showGCashModal = ref(false)

function handlePlaceOrder() {
  const selectedPaymentMethodData = availablePaymentMethods.value.find(
    (method) => method.id === paymentMethod.value,
  )

  let actualPaymentMethod: PaymentMethod | null = null

  if (selectedPaymentMethodData?.paymentMethodData) {
    // If it's a saved payment method (credit card, etc.)
    actualPaymentMethod = selectedPaymentMethodData?.paymentMethodData
    completeOrderWithPaymentMethod(actualPaymentMethod)
  } else {
    // If it's a default method (COD, GCash), handle accordingly
    if (selectedPaymentMethodData?.id === 'cash_on_delivery') {
      actualPaymentMethod = {
        type: 'cash_on_delivery',
        _id: crypto.randomUUID(),
      } as PaymentMethod
      completeOrderWithPaymentMethod(actualPaymentMethod)
    } else if (selectedPaymentMethodData?.id === 'gcash') {
      showGCashModal.value = true
      return
    }
  }
}

// Helper function to complete the order
function completeOrderWithPaymentMethod(paymentMethod: PaymentMethod) {
  orderStore.completePendingOrder(orderId as string, {
    paymentMethod: paymentMethod,
  })
}

// Handle GCash modal confirmation
function handleGCashConfirm(paymentMethod: PaymentMethod) {
  completeOrderWithPaymentMethod(paymentMethod)
}

// Handle GCash modal cancellation
function handleGCashCancel() {
  // User cancelled GCash setup, just close modal
  // Don't complete the order
}

function handleModalOpen(closeDrawer: () => void, openModal: () => void) {
  closeDrawer()
  openModal()
}

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure you want to cancel without saving what you selected?').then(
    () => {
      done()
    },
  )
}

const dialogStyle = {
  width: '100%',
  maxWidth: '700px',
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
            <AppDrawer header="Shipping Address" :handleClose>
              <template #trigger="props">
                <el-button type="text" class="edit-btn" @click="props.handleOpenDrawer"
                  >Edit</el-button
                >
              </template>
              <template #default="drawerProps">
                <div class="shipping">
                  <AppModal :dialog-style="dialogStyle" title="Add new shipping address">
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

                    <template #default="modalProps">
                      <AddressForm
                        rendered-from="checkout"
                        @cancel-add="modalProps.closeModal"
                        @add-new-address="
                          handleNewAddress(modalProps.closeModal, drawerProps.handleOpenDrawer)
                        "
                      />
                    </template>
                  </AppModal>

                  <AddressShippingSelect
                    :selectedAddressId="address?._id"
                    :addresses
                    @save="
                      (addressId) => handleSelectedAddress(addressId, drawerProps.handleCloseDrawer)
                    "
                    @cancel="() => handleClose(drawerProps.handleCloseDrawer)"
                  />
                </div>
              </template>
            </AppDrawer>
          </div>
          <div class="address-info" v-if="address">
            <div class="customer-name">{{ address?.fullName }} {{ address?.mobileNumber }}</div>
            <div class="address-badge">
              <AppAddressTag v-if="address?.deliveryLabel === 'home'" label="home" />
              <AppAddressTag v-else label="office" />
              <span class="address-text"
                >{{ address?.unitNumber }} {{ address?.address }}, {{ address?.province }},
                {{ address?.district }}, {{ address?.ward }}
              </span>
            </div>
          </div>
          <p v-else>Select a address for for you shipping address to continue your purchase.</p>
        </div>

        <!-- Package Info -->
        <div class="section">
          <div class="package-header">
            <h4>Package 1 of 1</h4>
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
          <div v-for="product in products" :key="product._id" class="product-item">
            <div class="product-image">
              <img :src="product.image" :alt="product.name" />
            </div>
            <div class="product-details">
              <div class="product-name">
                {{ product.name }}
              </div>
              <div class="product-meta">
                <div class="current-price">{{ formatPrice(product.price) }}</div>
                <span>Qty: {{ product.quantity }}</span>
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
            <AppDrawer header="Select Payment Method" destroy>
              <template #trigger="props">
                <el-button type="text" class="view-all-btn" @click="props.handleOpenDrawer"
                  >View all methods ></el-button
                >
              </template>

              <template #default="props">
                <CardPaymentMethod
                  @method-selected="
                    (method: PaymentMethodDisplay) =>
                      handlePaymentMethodSelected(method, props.handleCloseDrawer)
                  "
                  @card-added="
                    (method: PaymentMethodDisplay) =>
                      handlePaymentMethodSelected(method, props.handleCloseDrawer)
                  "
                />
              </template>
            </AppDrawer>
          </div>

          <div class="payment-options">
            <div
              v-for="method in availablePaymentMethods"
              :key="method.id"
              class="payment-card"
              :class="{ selected: paymentMethod === method.id }"
              @click="updatePaymentMethodSelection(method.id)"
            >
              <div class="payment-method">
                <el-radio
                  :model-value="paymentMethod"
                  :label="method.id"
                  size="large"
                  @change="updatePaymentMethodSelection(method.id)"
                >
                  <div class="payment-info">
                    <div class="payment-img-container">
                      <img :src="method.src" :alt="method.label" class="payment-img" />
                    </div>
                    <div class="payment-details">
                      <div class="payment-number">{{ method.number ?? method.label }}</div>
                      <div class="payment-type">{{ method.type }}</div>
                    </div>
                  </div>
                </el-radio>
                <div v-if="paymentMethod === method.id" class="payment-checkmark">✓</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="section">
          <h3>Order Summary</h3>
          <div class="summary-item">
            <span>Subtotal ({{ products?.length }} Items)</span>
            <span>{{ formatPrice(pendingOrder?.pricing.subtotal as number) }}</span>
          </div>
          <div class="summary-item">
            <span>Shipping Fee</span>
            <span>{{ formatPrice(pendingOrder?.pricing.shipping as number) }}</span>
          </div>

          <div class="summary-divider"></div>
          <div class="summary-total">
            <span>Total</span>
            <span class="total-amount">{{
              formatPrice(pendingOrder?.pricing.total as number)
            }}</span>
          </div>
        </div>

        <!-- Place Order Button -->
        <el-button
          type="primary"
          size="large"
          class="place-order-btn"
          @click="handlePlaceOrder"
          :disabled="!paymentMethod || !address"
        >
          PLACE ORDER NOW</el-button
        >
      </div>

      <PaymentGCashModal
        v-model="showGCashModal"
        :user-id="authStore.user"
        @confirm="handleGCashConfirm"
        @cancel="handleGCashCancel"
      />
    </div>
  </div>
</template>

<style scoped>
.payment-img-container {
  width: 36px;
  height: 36px;
  display: grid;
  place-content: center;
}

.payment-img {
  display: block;
  width: 32px;
  height: 32px;
}

.shipping {
  width: 100%;
  height: 100%;
}

.modal-trigger {
  position: absolute;
  font-size: 0.875rem;
  top: 1.375rem;
  right: 3.5rem;
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

.place-order-btn:disabled,
.place-order-btn:hover:disabled {
  background: #c0c4cc;
  border-color: #c0c4cc;
  cursor: not-allowed;
}

@media screen and (min-width: 400px) {
  .section-header h3 {
    font-size: 0.875rem;
  }

  .view-all-btn {
    font-size: 0.875rem;
  }
}

@media screen and (min-width: 450px) {
  .modal-trigger {
    top: 1.625rem;
    right: 3.25rem;
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
