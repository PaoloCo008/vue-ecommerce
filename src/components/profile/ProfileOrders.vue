<script setup lang="ts">
import { computed, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import ProfileContentLayout from '@/layouts/ProfileContentLayout.vue'
import { formatPrice } from '@/lib/helpers'
import { useAuthStore } from '@/stores/AuthStore'
import { useOrderStore } from '@/stores/OrderStore'
import { useRouter } from 'vue-router'
import useSearchParams from '@/composables/useSearchParams'

const router = useRouter()

const authStore = useAuthStore()
const orderStore = useOrderStore()

const filter = useSearchParams('filter', 'all', 'orders')
const query = useSearchParams('search', '', 'orders', { debounce: true })

const orders = computed(() =>
  orderStore.getUserFilteredOrders(
    authStore.user as string,
    filter.value as string,
    query.value as string,
  ),
)

function handleClick(tabName: string) {
  filter.value = tabName
}
</script>

<template>
  <ProfileContentLayout page-title="My Orders">
    <div class="my-orders-container">
      <el-tabs v-model="filter" class="order-tabs" @tab-change="handleClick">
        <el-tab-pane label="All" name="all"></el-tab-pane>
        <el-tab-pane label="To pay" name="to-pay"></el-tab-pane>
        <el-tab-pane label="To ship" name="to-ship"></el-tab-pane>
        <el-tab-pane label="To receive" name="to-receive"></el-tab-pane>
      </el-tabs>

      <div class="search-container">
        <el-input
          v-model="query"
          placeholder="Search by order ID or product name"
          class="search-input"
          clearable
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </div>

      <!-- Orders List -->
      <div class="orders-list" v-if="!!orders.length">
        <RouterLink
          :to="{ name: 'order-details', params: { orderId: orderStore.encodeOrderId(order._id) } }"
          v-for="order in orders"
          :key="order._id"
          class="order-link"
        >
          <div class="order-group">
            <div class="order-header">
              <span class="order-number">{{ order.orderNumber }}</span>

              <div class="order-status">{{ order.status }}</div>
            </div>

            <div class="order-item" v-for="item in order.items" :key="item._id">
              <div class="product-image">
                <img :src="item.image" :alt="item.name" />
              </div>
              <div class="product-details">
                <h3 class="product-title">
                  {{ item.name }}
                </h3>
              </div>
              <div class="product-amount">
                <div class="product-price">{{ formatPrice(item.price) }}</div>
                <div class="product-quantity">
                  <span class="qty-number">x{{ item.quantity }}</span>
                </div>
              </div>
            </div>
          </div>
        </RouterLink>
      </div>
      <el-empty description="You have no orders placed yet." v-else>
        <el-button type="primary" @click="router.push({ name: 'homepage' })" class="reroute-button"
          >Continue Shopping</el-button
        >
      </el-empty>
    </div>
  </ProfileContentLayout>
</template>

<style scoped>
.reroute-button {
  background-color: transparent;
  color: var(--color-main);
  border: 1px solid var(--color-main);
}
.my-orders-container {
  max-width: 1200px;
}

.order-tabs {
  margin-bottom: 20px;
  border-bottom: 1px solid #6b778c;
}

.search-container {
  margin-bottom: 20px;
  background-color: white;
  padding: 0.5rem;
}

:deep(.el-input__wrapper) {
  border-radius: 0;
  background-color: #eff0f5;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.order-link {
  padding: 0;
}

.order-group {
  background-color: white;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 100%;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fafafa;
}

.seller-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.store-icon {
  font-size: 16px;
  color: #666;
}

.order-number {
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

.order-status {
  color: #666;
  font-size: 14px;
  font-weight: 500;
  text-transform: capitalize;
}

.order-item {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  gap: 16px;
}

.product-image {
  flex-shrink: 0;
}

.product-image img {
  width: 80px;
  height: 80px;
  display: block;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
}

.product-details {
  width: 100%;
  text-align: center;
}

.product-title {
  font-size: 14px;
  font-weight: 400;
  color: #333;
  margin: 0 0 8px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-variant {
  font-size: 13px;
  color: #999;
  margin: 0 0 8px 0;
}

.product-tag {
  margin-top: 8px;
}

.free-returns {
  display: inline-block;
  padding: 2px 8px;
  background-color: #e8f4fd;
  color: #1890ff;
  font-size: 12px;
  border-radius: 4px;
  border: 1px solid #bae7ff;
}

.product-price {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  flex-shrink: 0;
}

.product-quantity {
  font-size: 14px;
  color: #666;
  flex-shrink: 0;
  min-width: 60px;
  text-align: right;
}

.product-amount {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.qty-number {
  font-weight: 500;
  color: #333;
}

:deep(.el-tabs__header) {
  margin: 0;
}

:deep(.el-tabs__nav-wrap::after) {
  display: none;
}

:deep(.el-tabs__item) {
  font-size: 14px;
  color: #666;
  font-weight: 400;
  padding: 0 0.75rem;
}

:deep(.el-tabs__item.is-active) {
  color: #1890ff;
  font-weight: 500;
}

:deep(.el-tabs__active-bar) {
  background-color: #1890ff;
}

:deep(.el-input__wrapper) {
  border-radius: 8px;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  box-shadow: none;
}

:deep(.el-input__wrapper:hover) {
  border-color: #1890ff;
}

:deep(.el-input__wrapper.is-focus) {
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
}

:deep(.el-input__inner) {
  font-size: 14px;
  color: #333;
}

:deep(.el-input__inner::placeholder) {
  color: #999;
}

:deep(.el-input__prefix) {
  color: #999;
}

@media (min-width: 768px) {
  .order-item {
    flex-direction: row;
    gap: 12px;
  }

  .product-details {
    text-align: left;
  }

  .product-amount {
    flex-direction: column;
    align-items: flex-end;
  }
}
</style>
