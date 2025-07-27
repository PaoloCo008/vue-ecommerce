<script lang="ts" setup>
import { formatPrice } from '@/lib/helpers'
import type { Order } from '@/lib/types/globals'
import { format } from 'date-fns'
import { useRouter } from 'vue-router'
import { useOrderStore } from '../../stores/OrderStore'

const props = defineProps<{ orders: Order[] }>()
const orderStore = useOrderStore()

const router = useRouter()

const tableOrderData = props.orders.map((order) => ({
  _id: order._id,
  orderNumber: order.orderNumber,
  placedAt: format(order.placedAt as Date, 'yyyy-MM-dd'),
  items: order.items.map((item) => ({ name: item.name, image: item.image })).slice(0, 4),
  additionalItems: order.items.length > 4 ? `${order.items.length - 4} more` : null,
  total: `${formatPrice(order.pricing.total)}`,
}))
</script>

<template>
  <el-table :data="tableOrderData" style="width: 100%">
    <el-table-column prop="orderNumber" label="Order #" width="200" />
    <el-table-column prop="placedAt" label="Placed On" width="150" />
    <el-table-column label="Items" width="300">
      <template #default="scope">
        <div class="order-items">
          <div class="item-images">
            <img
              v-for="(item, index) in scope.row.items"
              :key="index"
              :src="item.image"
              :alt="item.name"
              class="item-image"
            />
            <span v-if="scope.row.additionalItems" class="additional-items">
              + {{ scope.row.additionalItems }}
            </span>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="total" label="Total" width="120" />
    <el-table-column label="Action" width="100">
      <template #default="scope">
        <el-button
          link
          type="primary"
          @click="
            router.push({
              name: 'order-details',
              params: { orderId: orderStore.encodeOrderId(scope.row._id) },
            })
          "
          >MANAGE</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>
.order-items {
  display: flex;
  align-items: center;
}

.item-images {
  display: flex;
  align-items: center;
  gap: 4px;
}

.item-image {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  object-fit: cover;
  border: 1px solid #e0e0e0;
}

.additional-items {
  color: #666;
  font-size: 14px;
  margin-left: 8px;
}
</style>
