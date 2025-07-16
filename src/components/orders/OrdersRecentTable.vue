<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const recentOrders = [
  {
    orderNumber: 'ORD-2024-001234',
    placedOn: '2024-07-10',
    items: [
      {
        name: 'Wireless Headphones',
        image: 'https://via.placeholder.com/40x40/4a90e2/ffffff?text=HP',
      },
      {
        name: 'Phone Case',
        image: 'https://via.placeholder.com/40x40/7ed321/ffffff?text=PC',
      },
    ],
    additionalItems: null,
    total: '₱2,450.00',
  },
  {
    orderNumber: 'ORD-2024-001235',
    placedOn: '2024-07-08',
    items: [
      {
        name: 'Laptop Stand',
        image: 'https://via.placeholder.com/40x40/f5a623/ffffff?text=LS',
      },
      {
        name: 'Mouse Pad',
        image: 'https://via.placeholder.com/40x40/bd10e0/ffffff?text=MP',
      },
      {
        name: 'USB Cable',
        image: 'https://via.placeholder.com/40x40/b8e986/ffffff?text=UC',
      },
      {
        name: 'USB Cable',
        image: 'https://via.placeholder.com/40x40/b8e986/ffffff?text=UC',
      },
    ],
    additionalItems: '2 more',
    total: '₱3,200.00',
  },
  {
    orderNumber: 'ORD-2024-001236',
    placedOn: '2024-07-05',
    items: [
      {
        name: 'Bluetooth Speaker',
        image: 'https://via.placeholder.com/40x40/50e3c2/ffffff?text=BS',
      },
    ],
    additionalItems: null,
    total: '₱1,800.00',
  },
  {
    orderNumber: 'ORD-2024-001237',
    placedOn: '2024-07-03',
    items: [
      {
        name: 'Smart Watch',
        image: 'https://via.placeholder.com/40x40/d0021b/ffffff?text=SW',
      },
      {
        name: 'Watch Band',
        image: 'https://via.placeholder.com/40x40/9013fe/ffffff?text=WB',
      },
    ],
    additionalItems: '1 more',
    total: '₱8,500.00',
  },
  {
    orderNumber: 'ORD-2024-001238',
    placedOn: '2024-06-28',
    items: [
      {
        name: 'Tablet',
        image: 'https://via.placeholder.com/40x40/417505/ffffff?text=TB',
      },
    ],
    additionalItems: null,
    total: '₱15,000.00',
  },
]
</script>

<template>
  <el-table :data="recentOrders" style="width: 100%">
    <el-table-column prop="orderNumber" label="Order #" width="200" />
    <el-table-column prop="placedOn" label="Placed On" width="150" />
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
      <template #default>
        <el-button
          link
          type="primary"
          @click="router.push({ name: 'orderdetails', params: { id: 1, orderId: 1 } })"
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
