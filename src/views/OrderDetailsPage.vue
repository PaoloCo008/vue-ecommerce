<script setup lang="ts">
import { formatDate, formatPrice } from '@/lib/helpers'
import type { Order } from '@/lib/types/globals'
import { useAuthStore } from '@/stores/AuthStore'
import { useOrderStore } from '@/stores/OrderStore'
import { useUserStore } from '@/stores/UserStore'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const orderStore = useOrderStore()
const userStore = useUserStore()
const authStore = useAuthStore()

const order = computed(() =>
  orderStore.getOrderById(orderStore.decodeOrderId(route.params.orderId as string) as string),
)

const address = userStore.getUserAddressByAddressId(
  authStore.user as string,
  order.value?.shippingAddress as string,
)

// Main steps - keep Order Placed as first step
const steps = ref([
  {
    id: 1,
    title: 'Order Placed',
    description: '',
    icon: 'Document',
    field: 'placedAt',
  },
  {
    id: 2,
    title: 'Order Paid',
    description: '',
    icon: 'CreditCard',
    field: 'paidAt',
  },
  {
    id: 3,
    title: 'Order Shipped Out',
    description: '',
    icon: 'Truck',
    field: 'shippedAt',
  },
  {
    id: 4,
    title: 'Order Received',
    description: '',
    icon: 'Box',
    field: 'receivedAt',
  },
])

// Enhanced tracking steps with more detail and action buttons
const trackingSteps = computed(() => {
  if (!order.value) return []

  const baseSteps = []

  // If delivered
  if (order.value.receivedAt) {
    baseSteps.push({
      title: 'Delivered',
      description: `${formatDate(order.value.receivedAt)} - Parcel has been delivered successfully - View Proof of Delivery`,
      status: 'success',
      showButton: false,
    })

    baseSteps.push({
      title: 'Out for delivery',
      description: `${formatDate(order.value.shippedAt!)} - Package is out for delivery to your address`,
      status: 'finish',
      showButton: false,
    })

    baseSteps.push({
      title: 'Package departed facility',
      description: `${formatDate(order.value.shippedAt!)} - Package has departed from sorting facility`,
      status: 'finish',
      showButton: false,
    })

    baseSteps.push({
      title: 'Package arrived at facility',
      description: `${formatDate(order.value.shippedAt!)} - Package has arrived at delivery hub`,
      status: 'finish',
      showButton: false,
    })
  }
  // If shipped but not delivered
  else if (order.value.shippedAt) {
    baseSteps.push({
      title: 'Out for delivery',
      description: `${formatDate(order.value.shippedAt)} - Package is out for delivery to your address`,
      status: 'process',
      showButton: true,
      buttonLabel: 'Mark as Received',
      buttonAction: () => updateOrderStatus('receivedAt'),
      buttonVariant: 'success',
    })

    baseSteps.push({
      title: 'Package departed facility',
      description: `${formatDate(order.value.shippedAt)} - Package has departed from sorting facility`,
      status: 'finish',
      showButton: false,
    })

    baseSteps.push({
      title: 'Package arrived at facility',
      description: `${formatDate(order.value.shippedAt)} - Package has arrived at delivery hub`,
      status: 'finish',
      showButton: false,
    })
  }
  // If paid but not shipped
  else if (order.value.paidAt) {
    baseSteps.push({
      title: 'Processing',
      description: `${formatDate(order.value.paidAt)} - Your order is being prepared for shipment`,
      status: 'process',
      showButton: true,
      buttonLabel: 'Ship Order',
      buttonAction: () => updateOrderStatus('shippedAt'),
      buttonVariant: 'primary',
    })
  }

  // Always show initial steps
  if (order.value.paidAt) {
    baseSteps.push({
      title: 'Payment confirmed',
      description: `${formatDate(order.value.paidAt)} - Payment has been confirmed and order is processing`,
      status: 'finish',
      showButton: false,
    })
  }

  if (order.value.placedAt) {
    baseSteps.push({
      title: 'Order placed',
      description: `${formatDate(order.value.placedAt)} - Order has been placed successfully`,
      status: 'finish',
      showButton: false,
    })
  }

  return baseSteps
})

// Current step calculation with all 4 steps
const currentStep = computed(() => {
  if (!order.value) return 0

  if (order.value.status === 'received' || order.value.receivedAt) return 4
  if (order.value.status === 'shipped' || order.value.shippedAt) return 3
  if (order.value.status === 'paid' || order.value.paidAt) return 2
  if (order.value.status === 'placed' || order.value.placedAt) return 1
  return 0
})

const updateStepDescriptions = () => {
  if (!order.value) return

  steps.value.forEach((step) => {
    if (step.field && order.value[step.field]) {
      const date = order.value[step.field]
      step.description = formatDate(date)

      // Add pricing info for paid step
      if (step.field === 'paidAt' && order.value.pricing) {
        step.description = `${step.description} (${formatPrice(order.value.pricing.total)})`
      }
    }
  })
}

const updateOrderStatus = async (field: string) => {
  if (!order.value) return

  try {
    const updates: Partial<Order> = {}
    updates[field] = new Date()

    // Update order status based on the field
    if (field === 'shippedAt') {
      updates.status = 'shipped'
    } else if (field === 'receivedAt') {
      updates.status = 'received'
    }

    orderStore.updateOrder(order.value._id, updates)
    updateStepDescriptions()

    console.log(`Order ${field} updated successfully`)
  } catch (error) {
    console.error(`Error updating order ${field}:`, error)
  }
}

onMounted(() => {
  updateStepDescriptions()
})
</script>

<template>
  <div class="order-page">
    <div class="header">
      <button class="back-btn" @click="router.back()">
        <span>‹</span>
        <span>BACK</span>
      </button>
      <div class="order-info">
        <div class="order-id">ORDER NUMBER: {{ order?.orderNumber }}</div>
        <div class="order-status">ORDER {{ order?.status }}</div>
      </div>
    </div>

    <div class="progress-section">
      <!-- Desktop Steps using Element Plus -->
      <div class="desktop-steps">
        <el-steps
          :active="currentStep"
          finish-status="success"
          process-status="process"
          class="custom-steps"
        >
          <el-step
            v-for="step in steps"
            :key="step.id"
            :title="step.title"
            :description="step.description"
          />
        </el-steps>
      </div>

      <!-- Mobile Steps using Element Plus -->
      <div class="mobile-steps">
        <el-steps
          :active="currentStep"
          direction="vertical"
          finish-status="success"
          process-status="process"
        >
          <el-step
            v-for="step in steps"
            :key="step.id"
            :title="step.title"
            :description="step.description"
          />
        </el-steps>
      </div>
    </div>

    <div class="delivery-info">
      <div class="delivery-address">
        <h3 class="section-title">Delivery Address</h3>
        <div class="address-details">
          <strong>{{ address?.fullName }}</strong
          ><br />
          <div class="contact-info">(+63) {{ address?.mobileNumber }}</div>
          <div>{{ address?.unitNumber }} {{ address?.address }}</div>
          <div>{{ address?.province }}, {{ address?.district }}, {{ address?.ward }}</div>
        </div>
        <div class="express-info">
          {{ order?.shippedBy.carrier }}<br />
          {{ order?.shippedBy.trackingNumber }}
        </div>
      </div>

      <div class="delivery-tracking">
        <h3 class="section-title">Tracking Information</h3>
        <div class="tracking-steps">
          <div class="tracking-step" v-for="(track, index) in trackingSteps" :key="index">
            <!-- Step indicator and content -->
            <div class="step-wrapper">
              <div :class="['step-indicator', `step-${track.status}`]">
                <div class="step-dot"></div>
                <div v-if="index < trackingSteps.length - 1" class="step-line"></div>
              </div>
              <div class="step-content">
                <div class="step-title">{{ track.title }}</div>
                <div class="step-description">{{ track.description }}</div>

                <!-- Action button for current active step -->
                <div v-if="track.showButton" class="step-action">
                  <button
                    :class="['btn', 'btn-sm', `btn-${track.buttonVariant}`]"
                    @click="track.buttonAction"
                  >
                    {{ track.buttonLabel }}
                  </button>
                  <p class="action-hint">Click to progress to next stage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="test">
      <div v-for="item in order?.items" :key="item._id" class="product-item">
        <img :src="item.image" :alt="item.name" class="product-image" />
        <div class="product-details">
          <div class="product-name">
            {{ item.name }}
          </div>
          <div class="product-quantity">x{{ item.quantity }}</div>
        </div>
      </div>

      <div class="price-summary">
        <div class="price-row">
          <div class="price-label">
            <span class="bundle-tag">Bundle</span>
            Buy {{ order?.items.length }}
          </div>
          <div class="price-value">{{ formatPrice(order?.pricing.total as number) }}</div>
        </div>

        <div class="price-row">
          <div class="price-label">Merchandise Subtotal</div>
          <div class="price-value">{{ formatPrice(order?.pricing.subtotal as number) }}</div>
        </div>

        <div class="price-row">
          <div class="price-label">Shipping Fee</div>
          <div class="price-value">{{ formatPrice(order?.pricing.shipping as number) }}</div>
        </div>

        <div class="price-row price-total">
          <div class="price-label">Order Total</div>
          <div class="price-value">{{ formatPrice(order?.pricing.total as number) }}</div>
        </div>

        <div class="payment-method">
          <div class="price-row">
            <div class="price-label">Payment Method</div>
            <div class="payment-method-value">[[ TBD ]]</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tracking-steps {
  margin-top: 10px;
}

.tracking-step {
  margin-bottom: 0;
}

.step-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding-bottom: 20px;
}

.step-indicator {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.step-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #ddd;
  background: white;
  transition: all 0.3s ease;
}

.step-line {
  width: 2px;
  height: 30px;
  background: #ddd;
  margin-top: 4px;
}

.step-success .step-dot {
  background: #4caf50;
  border-color: #4caf50;
}

.step-success .step-line {
  background: #4caf50;
}

.step-finish .step-dot {
  background: #4caf50;
  border-color: #4caf50;
}

.step-finish .step-line {
  background: #4caf50;
}

.step-process .step-dot {
  background: #ff9800;
  border-color: #ff9800;
  animation: pulse-orange 2s infinite;
}

.step-process .step-line {
  background: #ddd;
}

@keyframes pulse-orange {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 152, 0, 0.4);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(255, 152, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 152, 0, 0);
  }
}

.step-content {
  flex: 1;
  padding-top: 0;
}

.step-title {
  font-size: 13px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.step-description {
  font-size: 12px;
  color: #666;
  line-height: 1.4;
  margin-bottom: 8px;
}

.step-action {
  margin-top: 12px;
}

.btn-sm {
  padding: 8px 16px;
  font-size: 12px;
  border-radius: 4px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  color: white;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #0056b3 0%, #004085 100%);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);
}

.btn-success {
  background: linear-gradient(135deg, #28a745 0%, #1e7e34 100%);
  color: white;
}

.btn-success:hover {
  background: linear-gradient(135deg, #1e7e34 0%, #155724 100%);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(40, 167, 69, 0.3);
}

.action-hint {
  margin: 6px 0 0 0;
  font-size: 10px;
  color: #999;
  font-style: italic;
}

/* All your existing styles remain the same */
.order-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: white;
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
  text-transform: uppercase;
}

.progress-section {
  margin-bottom: 40px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 40px;
  border-radius: 16px;
  border: 1px solid #dee2e6;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.desktop-steps {
  display: block;
}

.mobile-steps {
  display: none;
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

  .delivery-info {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .product-image {
    width: 60px;
    height: 60px;
  }

  .step-wrapper {
    gap: 12px;
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

  .section-title {
    font-size: 14px;
    margin-bottom: 15px;
  }

  .product-name {
    font-size: 13px;
  }

  .address-details {
    font-size: 13px;
  }

  .step-wrapper {
    gap: 10px;
  }

  .step-title {
    font-size: 12px;
  }

  .step-description {
    font-size: 11px;
  }
}
</style>
