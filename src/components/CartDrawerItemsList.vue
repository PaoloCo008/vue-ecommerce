<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import AppNumberInput from './AppNumberInput.vue'
import { useCartStore } from '@/stores/CartStore'
import { useAuthStore } from '@/stores/AuthStore'
import { useProductStore } from '@/stores/ProductStore'

const cartStore = useCartStore()
const authStore = useAuthStore()
const productStore = useProductStore()

const items = computed(() =>
  authStore.isAuthenticated
    ? cartStore.getCartByUserId(authStore.user)?.items
    : cartStore.guestCart,
)

// // Props
// const props = defineProps({
//   items: {
//     type: Array,
//     default: () => [],
//   },
// })

// Emits
const emit = defineEmits(['remove-item', 'update-quantity'])

// Reactive cart items
// const cartItems = reactive(
//   props.items.length > 0
//     ? props.items
//     : [
//         {
//           id: 1,
//           title: 'The 2025 Digital Astro Planner: Digital Only (PDF)',
//           subtitle: '',
//           price: 16800.0,
//           quantity: 8,
//           image: '/api/placeholder/80/120',
//         },
//         {
//           id: 2,
//           title: 'The 2025 Digital Yearbook: Digital Only (PDF)',
//           subtitle: '',
//           price: 5800.0,
//           quantity: 2,
//           image: '/api/placeholder/80/120',
//         },
//       ],
// )

// Methods
// const removeItem = (itemId) => {
//   const index = cartItems.findIndex((item) => item.id === itemId)
//   if (index > -1) {
//     cartItems.splice(index, 1)
//     emit('remove-item', itemId)
//   }
// }

// const updateQuantity = (itemId, newQuantity) => {
//   const item = cartItems.find((item) => item.id === itemId)
//   if (item) {
//     item.quantity = newQuantity
//     emit('update-quantity', itemId, newQuantity)
//   }
// }

function handleCartItemQuantity(productId: string) {
  return (count: number) => cartStore.updateCartItemQuantityByProductId(productId, count)
}
</script>

<template>
  <div class="cart-items">
    <div v-for="item in items" :key="item._id" class="cart-item">
      <!-- Product Image -->
      <div class="item-image">
        <img :src="productStore.getProductPrimaryImageById(item.productId)" :alt="item.name" />
      </div>

      <!-- Product Details -->
      <div class="item-details">
        <h3 class="item-title">{{ item.name }}</h3>

        <el-button type="text" class="remove-btn" @click="removeItem(item._id)"> Remove </el-button>
      </div>

      <!-- Price and Quantity -->
      <div class="item-controls">
        <div class="item-price">₱{{ item.price.toLocaleString() }}</div>

        <AppNumberInput
          :handler="handleCartItemQuantity(item.productId)"
          :initial-value="item.quantity"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-items {
  padding: 0;
}

/* Mobile-first design */
.cart-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-image {
  flex-shrink: 0;
  width: 60px;
  height: 90px;
  border-radius: 6px;
  overflow: hidden;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item-title {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  margin: 0;
  color: #303133;
}

.item-subtitle {
  font-size: 12px;
  color: #909399;
  margin: 0;
}

.remove-btn {
  padding: 0;
  font-size: 12px;
  color: #409eff;
  text-decoration: underline;
  align-self: flex-start;
}

.remove-btn:hover {
  color: #337ecc;
}

.item-controls {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  min-width: 80px;
}

.item-price {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  white-space: nowrap;
}

.quantity-control {
  display: flex;
  align-items: center;
}

:deep(.el-input-number) {
  width: 80px;
}

:deep(.el-input-number .el-input__inner) {
  text-align: center;
  font-size: 12px;
  padding: 0 4px;
}

:deep(.el-input-number .el-input-number__decrease),
:deep(.el-input-number .el-input-number__increase) {
  width: 20px;
}

/* Tablet and up */
@media (min-width: 768px) {
  .cart-item {
    gap: 16px;
    padding: 20px 0;
  }

  .item-image {
    width: 80px;
    height: 120px;
    border-radius: 8px;
  }

  .item-details {
    gap: 10px;
  }

  .item-title {
    font-size: 16px;
    margin-bottom: 4px;
  }

  .item-subtitle {
    font-size: 14px;
  }

  .remove-btn {
    font-size: 14px;
  }

  .item-controls {
    gap: 12px;
    min-width: 100px;
  }

  .item-price {
    font-size: 18px;
  }

  :deep(.el-input-number) {
    width: 100px;
  }

  :deep(.el-input-number .el-input__inner) {
    font-size: 14px;
    padding: 0 8px;
  }

  :deep(.el-input-number .el-input-number__decrease),
  :deep(.el-input-number .el-input-number__increase) {
    width: 32px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .cart-item {
    gap: 20px;
    padding: 24px 0;
  }

  .item-controls {
    min-width: 120px;
  }
}

/* Touch-friendly interactions for mobile */
@media (max-width: 767px) {
  .remove-btn {
    min-height: 44px;
    display: flex;
    align-items: center;
  }

  :deep(.el-input-number .el-input-number__decrease),
  :deep(.el-input-number .el-input-number__increase) {
    min-height: 32px;
    min-width: 32px;
  }
}
</style>
