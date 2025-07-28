<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { formatPrice } from '@/lib/helpers'
import TextExpander from '@/components/TextExpander.vue'
import { useProductStore } from '@/stores/ProductStore'
import type { AuthMode } from '@/lib/types/stores'
import { useAuthStore } from '@/stores/AuthStore'
import AppModal from '@/components/app/AppModal.vue'
import AuthTransitionWrapper from '@/components/auth/AuthTransitionWrapper.vue'
import { useCartStore } from '@/stores/CartStore'
import { useUserStore } from '@/stores/UserStore'
import ProductCarousel from '@/components/product/ProductCarousel.vue'
import { useRoute, useRouter } from 'vue-router'

const dialogStyle = {
  width: '100%',
  maxWidth: '450px',
  height: '450px',
}

const quantity = ref(1)

const productStore = useProductStore()
const cartStore = useCartStore()
const authStore = useAuthStore()
const userStore = useUserStore()
const route = useRoute()

const slug = computed(() => route.params.slug as string)

const searchParam = computed(() => slug.value.split('-'))

const product = computed(() =>
  productStore.getProductById(searchParam.value.slice(-1)[0] as string),
)

const userDefaultShippingAddressId = computed(
  () => userStore.getUserDefaultShippingAddressById(authStore.user as string)?._id,
)

function handleBuyClick(openFn: () => void, authMode: AuthMode) {
  if (authStore.isAuthenticated) {
    const item = {
      _id: crypto.randomUUID(),
      productId: product.value?._id,
      quantity: quantity.value,
      image: productStore.getProductPrimaryImageById(product.value?._id as string),
      price: product.value?.price as number,
      name: product.value?.name as string,
    }
    cartStore.proceedToCheckout(userDefaultShippingAddressId.value as string, 'product', item)
  } else {
    openFn()
    authStore.setAuthMode(authMode)
  }
}

function handleAddClick() {
  cartStore.addToCart({
    _id: crypto.randomUUID(),
    productId: product.value?._id as string,
    quantity: quantity.value,
    image: productStore.getProductPrimaryImageById(product.value?._id as string),
    price: product.value?.price as number,
    name: product.value?.name as string,
  })
}
</script>

<template>
  <div class="product-page">
    <div class="product-main">
      <div class="product-grid">
        <!-- Carousel -->
        <div class="carousel">
          <ProductCarousel />
        </div>

        <!-- Body -->
        <div class="product-body">
          <div class="product-title">
            <TextExpander :text="product.name" :max-chars="60" :breakpoint="765" :font-size="18" />
          </div>
          <p class="product-price">{{ formatPrice(product?.price) }}</p>
          <div>
            <span>Quantity</span>
            <el-input-number v-model="quantity" :min="1" />
          </div>

          <div class="product-buttons">
            <AppModal :dialog-style="dialogStyle">
              <template #trigger="props">
                <el-button
                  class="product-body__button button--secondary"
                  @click="handleBuyClick(props.onTriggerClick, 'login')"
                  >Buy Now</el-button
                >
              </template>

              <AuthTransitionWrapper />
            </AppModal>

            <el-button class="product-body__button button--primary" @click="handleAddClick"
              >Add to Cart</el-button
            >
          </div>
        </div>
      </div>
    </div>

    <!-- description -->
    <div class="product-description">
      <p class="description-header">Product details of {{ product.name }}</p>

      <div class="description-body">
        {{ product.description }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-page {
  margin-bottom: 1rem;
}

.product-main {
  background-color: #fff;
  border-radius: 1rem;
}

.product-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-template-areas:
    'carousel'
    'body';
}

/* Carousel */
.carousel {
  grid-area: carousel;
}

/* Body */
.product-title {
  font-size: 0.875rem;
  line-height: 1.35;
}

.product-price {
  font-size: 1.75rem;
  letter-spacing: 1px;
  color: var(--color-main);
}

.el-input-number {
  margin-left: 2rem;
}

.product-body {
  grid-area: body;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem 1rem 2rem;
}

.product-buttons {
  display: flex;
  margin-top: 1rem;
}

.product-body__button {
  width: 100%;
  color: #fff;
  padding: 1.5rem;
}

.button--primary {
  background-color: var(--color-main);
}

.button--secondary {
  background-color: var(--color-secondary);
}

/* description */
.product-description {
  background-color: #fff;
  margin-top: 2rem;
}

.description-header {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 1.125rem;
  background-color: var(--color-background-secondary);
  padding: 1rem;
}

.description-body {
  padding: 1rem;
}

@media screen and (min-width: 765px) {
  .wrapper {
    padding: 1rem;
  }

  .product-title {
    padding: 0;
    margin-right: 1.5rem;
    font-size: 1rem;
  }

  .product-body {
    padding: 0;
  }

  .product-grid {
    padding: 1rem;
    grid-template-columns: 1.5fr 1.25fr;
    grid-template-areas:
      'carousel body'
      'carousel body'
      'carousel body';
  }
}
</style>
