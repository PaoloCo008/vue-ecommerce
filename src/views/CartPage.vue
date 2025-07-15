<script lang="ts" setup>
import { formatPrice } from '@/lib/helpers'
import { Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'

const selected = ref(false)
const count = ref(1)

function handleNumberChange(e) {
  console.log(e)
}

function handleClick(e) {
  console.log(e.target)
}
</script>

<template>
  <div class="wrapper">
    <div class="cart-grid">
      <!-- Controls -->
      <div class="cart-controls">
        <el-checkbox class="opaque" label="Select All (1)" value="Value 1 " />
        <el-button class="opaque" type="" :icon="Delete" text> delete </el-button>
      </div>

      <!-- Products -->
      <div class="cart-products">
        <div :class="{ 'product-item': true, selected }" @click.self="selected = !selected">
          <div class="flex-align-center">
            <el-checkbox
              class="item-checkbox opaque"
              v-model="selected"
              @change.stop="selected = !selected"
            />
            <el-image
              class="product-image"
              src="/Product+Showcase-1.jpg"
              @click="selected = !selected"
            />
          </div>
          <h4 @click.self="selected = !selected">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non velit eum repellat
            pariatur, ipsum et ipsa cupiditate cum facilis voluptates quos,
          </h4>
          <div class="flex-align-center">
            <div class="product-item__price">
              <span class="price" @click.self="selected = !selected">{{ formatPrice(310) }}</span>
              <el-icon class="opaque"><Delete /></el-icon>
            </div>
            <el-input-number
              v-model="count"
              :min="1"
              :max="10"
              size="default"
              @change.self="handleNumberChange"
              @click.self="handleNumberChange"
            />
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div class="cart-summary">
        <div>
          <span class="opaque">Location</span>
          <p class="summary-location">
            <el-icon class="opaque"><Location /></el-icon> Some Location
          </p>
        </div>
        <div class="summary-order top-margin">
          <h3>Order Summary</h3>
          <p class="flex-between">
            <span class="opaque">Subtotal (# item(s))</span><span>{{ formatPrice(278) }}</span>
          </p>
          <p class="flex-between">
            <span class="opaque">Shipping Fee</span><span>{{ formatPrice(40) }}</span>
          </p>
          <p class="flex-between top-margin">
            <span>Subtotal</span><span class="price">{{ formatPrice(310) }}</span>
          </p>

          <el-button class="checkout-button top-margin">Proceed to checkout(1)</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  padding: 0 1rem;
}

.cart-grid {
  display: grid;

  gap: 1rem;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-template-areas:
    'controls'
    'products'
    'summary';
}

.selected {
  background-color: var(--color-main-transparent);
}

/* Controls */
.cart-controls {
  display: flex;
  justify-content: space-between;
  grid-area: controls;
  background-color: #fff;
  padding: 0.5rem 1rem;
  flex-wrap: wrap;
}

.cart-controls > * {
  text-transform: uppercase;
  font-weight: bold;
}

/* Products */

.cart-products {
  grid-area: products;
  background-color: #fff;
  height: fit-content;
  padding: 1rem;
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
}

/* Summary */
.cart-summary {
  grid-area: summary;
  background-color: #fff;
  padding: 1rem;
}

.summary-location {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.summary-order {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.price {
  font-size: 1.25rem;
  color: var(--color-main);
}

.checkout-button {
  background-color: var(--color-main);
  color: #fff;
  padding: 1.25rem 0;
  text-transform: uppercase;
  border: 1px solid var(--color-main);
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

@media screen and (min-width: 1050px) {
  .cart-grid {
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 50px 1fr;
    grid-template-areas:
      'controls summary'
      'products summary'
      'products summary';
  }
}
</style>
