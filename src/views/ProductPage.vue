<script setup lang="ts">
import { ref } from 'vue'
import { formatPrice } from '@/lib/helpers'
import TextExpander from '@/components/TextExpander.vue'
import Carousel from '@/components/Carousel.vue'

const value = ref(1)
</script>

<template>
  <div class="wrapper">
    <div class="product-grid">
      <!-- Carousel -->
      <div class="carousel">
        <Carousel />
      </div>

      <!-- Body -->
      <div class="product-body">
        <div class="product-title">
          <TextExpander
            text="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea veritatis nesciunt id alias mollitia. Totam dicta nobis in nesciunt veritatis ipsam eum est? Saepe fugiat culpa quam, sunt totam nam."
            :max-chars="60"
            :breakpoint="765"
            :font-size="18"
          />
        </div>
        <p class="product-price">{{ formatPrice(100) }}</p>
        <div>
          <span>Quantity</span>
          <el-input-number v-model="value" :min="1" :max="10" @change="handleChange" />
        </div>

        <div class="product-buttons">
          <el-button class="product-body__button button--secondary">Buy Now</el-button>
          <el-button class="product-body__button button--primary">Add to Cart</el-button>
        </div>
      </div>
    </div>
  </div>

  <!-- description -->
  <div class="product-description">
    <p class="description-header">Product details of [[Title]] does this work on anything</p>

    <div class="description-body">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia quis voluptates magni
      exercitationem libero, illum sunt qui ab animi repudiandae totam deserunt quae temporibus
      laudantium quidem accusantium. Velit, recusandae molestias.
    </div>
  </div>
</template>

<style scoped>
.wrapper {
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
  background-color: green;
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
    grid-template-columns: 1.5fr 1.25fr;
    grid-template-areas:
      'carousel body'
      'carousel body'
      'carousel body';
  }
}
</style>
