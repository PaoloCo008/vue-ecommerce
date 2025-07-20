<script setup lang="ts">
import { formatPrice } from '@/lib/helpers'
import type { CartItem } from '@/lib/types/globals'
import { useAuthStore } from '@/stores/AuthStore'
import { useCartStore } from '@/stores/CartStore'
import { useProductStore } from '@/stores/ProductStore'
import { computed, ref } from 'vue'

const props = defineProps<{ item: CartItem }>()

const productStore = useProductStore()
const cartStore = useCartStore()
const authStore = useAuthStore()

const count = ref(props.item.quantity)

const product = productStore.getProductById(props.item.productId)
const productPrimaryImage = productStore.getProductPrimaryImageById(props.item.productId)

function handleNumberChange(number: number) {
  cartStore.updateUserCartItemQuantityByProductId(
    authStore.user as string,
    product?._id as string,
    number,
  )
}

const isSelected = computed({
  get: () => cartStore.isCartItemSelected(product?._id as string),
  set: (value: boolean) => {
    if (value) {
      cartStore.addItemToSelection(product?._id as string)
    } else {
      cartStore.removeItemFromSelection(product?._id as string)
    }
  },
})

function handleSelect() {
  cartStore.toggleIdFromSelection(product?._id as string)
}
</script>

<template>
  <div :class="{ 'product-item': true, selected: isSelected }" @click="handleSelect">
    <div class="flex-align-center">
      <el-checkbox class="item-checkbox opaque" v-model="isSelected" @click.stop />
      <el-image class="product-image" :src="productPrimaryImage" />
    </div>
    <h4>
      {{ product?.name }}
    </h4>
    <div class="flex-align-center">
      <div class="product-item__price">
        <span class="price">{{ formatPrice(product?.price as number) }}</span>
        <el-icon class="opaque"><Delete /></el-icon>
      </div>
      <el-input-number
        v-model="count"
        :min="1"
        size="default"
        @change="handleNumberChange"
        @click.stop
      />
    </div>
  </div>
</template>

<style scoped>
.selected {
  background-color: var(--color-main-transparent);
}

.product-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  text-align: center;
  padding: 1rem;
}

.el-input-number {
  margin-left: 1.5rem;
}

.item-checkbox {
  display: none;
}

.product-item__price {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.product-image {
  width: clamp(110px, 20vw, 120px);
  height: 120px;
}

.price {
  font-size: 1.25rem;
  color: var(--color-main);
}

@media screen and (min-width: 700px) {
  .product-item {
    flex-direction: row;
    text-align: left;
  }

  .product-item__price {
    flex-direction: column;
    justify-content: flex-start;
    align-items: start;
    gap: unset;
  }

  .item-checkbox {
    display: inline;
    transform: translateY(8px);
  }
}
</style>
