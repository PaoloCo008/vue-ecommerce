<script setup lang="ts">
import { formatPrice } from '@/lib/helpers'
import { useProductStore } from '@/stores/ProductStore'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import AppDrawer from './app/AppDrawer.vue'
import { useCartStore } from '@/stores/CartStore'
import { useAuthStore } from '@/stores/AuthStore'
import CartDrawerItemsList from './CartDrawerItemsList.vue'
import AppNumberInput from './AppNumberInput.vue'

const route = useRoute()
const cartStore = useCartStore()
const authStore = useAuthStore()

const productStore = useProductStore()

const quantity = ref(1)

const productId = computed(() => route.params.slug.split('-').at(-1))

const product = computed(() => productStore.getProductById(productId.value))

const productName = ref('M1 MONO')
const productPrice = ref('£165.00')
const productDescription = ref(
  'A reimagined classic. The M1 Mono channels the same DNA as some of our most beloved releases, blending timeless monochromatic shades with elevated details that push boundaries. Featuring ultra-wearable grey panels that mix suede and premium leather for that signature NTW feel, this silhouette is crafted to go wherever the day takes you.',
)

const productImages = computed(() => product.value?.images.map((image) => image.url))

const currentImageIndex = ref(0)

const activeCollapse = ref('1')

function openCartDrawer(openModal: () => void) {
  openModal()

  cartStore.addToCart({
    _id: crypto.randomUUID(),
    productId: product.value?._id as string,
    quantity: quantity.value,
    image: productStore.getProductPrimaryImageById(product.value?._id as string),
    price: product.value?.price as number,
    name: product.value?.name as string,
  })
}

const cartDrawerHeader = computed(
  () =>
    `Your Cart (${
      authStore.isAuthenticated
        ? cartStore.getUserCartItemsCount(authStore.user)
        : cartStore.getGuestCartItems
    })`,
)

function updateQuantity(count: number) {
  quantity.value = count
}
</script>

<template>
  <div class="product-page">
    <!-- Product Gallery -->
    <div class="product-gallery">
      <div class="main-image">
        <img
          :src="productImages?.[currentImageIndex]"
          :alt="productName"
          class="main-product-image"
        />
      </div>
      <div class="thumbnail-gallery">
        <div
          v-for="(image, index) in productImages"
          :key="index"
          class="thumbnail"
          :class="{ active: index === currentImageIndex }"
          @click="currentImageIndex = index"
        >
          <img :src="image" :alt="`${productName} view ${index + 1}`" />
        </div>
      </div>
    </div>

    <div>
      <el-image
        v-for="(image, index) in productImages"
        :key="index"
        :src="image"
        :alt="product?.name"
        class="product-image"
        :preview-src-list="productImages"
        :initial-index="index"
        fit="cover"
        :preview-teleported="true"
        :z-index="9999"
      />
    </div>

    <!-- Product Information -->
    <div class="product-info">
      <div class="product-wrapper">
        <h1 class="product-title">{{ product?.name }}</h1>

        <div class="product-description">
          <p>{{ product?.description }}</p>
        </div>

        <!-- Price and Add to Cart -->
        <div class="purchase-section">
          <div class="price">{{ formatPrice(product?.price as number) }}</div>
          <AppDrawer :header="cartDrawerHeader" destroy>
            <template #trigger="props">
              <el-button
                type="primary"
                size="large"
                class="add-to-cart-btn"
                @click="openCartDrawer(props.handleOpenDrawer)"
              >
                Add to Cart
              </el-button>
            </template>

            <CartDrawerItemsList />
          </AppDrawer>
        </div>

        <!-- Quantity Button -->
        <AppDrawer :header="cartDrawerHeader" destroy>
          <template #trigger="props">
            <AppNumberInput
              :handler="updateQuantity"
              @on-input="openCartDrawer(props.handleOpenDrawer)"
            />
          </template>

          <CartDrawerItemsList />
        </AppDrawer>

        <!-- Pickup Availability -->
        <div class="pickup-info">
          <p class="pickup-text">Couldn't load pickup availability</p>
        </div>

        <!-- Collapsible Sections -->
        <div class="product-details">
          <el-collapse v-model="activeCollapse" accordion>
            <el-collapse-item title="STYLE DETAILS" name="style">
              <div class="detail-content">
                <ul>
                  <li>Premium leather and suede construction</li>
                  <li>Monochromatic grey colorway</li>
                  <li>Signature NTW branding</li>
                  <li>Comfortable padded interior</li>
                  <li>Durable rubber outsole</li>
                </ul>
              </div>
            </el-collapse-item>

            <el-collapse-item title="SHIPPING / RETURNS" name="shipping">
              <div class="detail-content">
                <div class="shipping-section">
                  <h4>What is your return policy?</h4>
                  <p>
                    You can return any unworn and unused item in its original packaging with tags
                    attached within 14 days of receiving your order for a refund or exchange.
                  </p>
                  <p>
                    The full Return and Refund Policy can be found
                    <a href="#" class="policy-link">here</a>.
                  </p>
                </div>

                <div class="shipping-section">
                  <h4>Do you offer international shipping?</h4>
                  <p>Yes, we ship worldwide.</p>
                </div>

                <div class="shipping-section">
                  <h4>How much does shipping cost?</h4>
                  <p>
                    Shipping costs are calculated based on your location and calculated at checkout.
                    All orders are sent via a fully trackable service.
                  </p>

                  <div class="shipping-details">
                    <p><strong>UK Orders:</strong></p>
                    <p>
                      Shipping to UK mainland addresses is free for orders over £130, and £3.99 for
                      orders under £130. All UK orders are sent via Royal Mail.
                    </p>

                    <p><strong>International Orders:</strong></p>
                    <p>
                      International orders are sent via DPD (EU), FedEx(RoW), or Starlinks(RoW)
                      depending on your location.
                    </p>
                    <p>
                      Shipping costs charged by notwoways do not include customs/duties charges, and
                      these may be due on delivery to the carrier depending on your location.
                    </p>
                  </div>
                </div>

                <div class="shipping-section">
                  <h4>How long will it take for my order to arrive?</h4>
                  <p>
                    The estimated delivery time for UK orders is 4-7 business days, and for
                    International orders 7-14 business days. Once your order is dispatched from our
                    warehouse, you will receive email confirmation with your tracking number.
                  </p>
                </div>

                <div class="shipping-section">
                  <h4>Will I have to pay customs duties and taxes?</h4>
                  <p>
                    For international orders, customs duties and taxes may apply depending on your
                    country's regulations. These fees are the responsibility of the customer.
                  </p>
                  <p>
                    For all deliveries to the EU, with a total order value of under 150 EUR, no
                    taxes or duties will be due as notwoways is registered under the Import One Stop
                    Shop (IOSS) scheme.
                  </p>
                </div>
              </div>
            </el-collapse-item>

            <el-collapse-item title="PAYMENT METHODS" name="payment">
              <div class="detail-content">
                <p>We accept VISA, Mastercard, Maestro, AMEX and PayPal.</p>
                <p>
                  We recommend that you <a href="#" class="policy-link">register an account</a> with
                  notwoways, and sign up for ShopPay as this will facilitate 1-click purchase and
                  speedy check out on release day.
                </p>
              </div>
            </el-collapse-item>

            <el-collapse-item title="HELP & CONTACT US" name="contact">
              <div class="detail-content">
                <p>
                  If you need help or have any questions, please contact us at
                  <a href="mailto:support@notwoways.com" class="policy-link"
                    >support@notwoways.com</a
                  >
                </p>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-details :deep(.el-collapse-item__wrap) {
  border: none;
  background: none;
  /* Remove the existing height and overflow rules */
}

.product-details :deep(.el-collapse-item__content) {
  padding: 0; /* Remove padding from content wrapper */
  border-bottom: 1px solid #e5e5e5;
  max-height: 300px; /* Set your desired fixed height */
  overflow-y: auto; /* Enable vertical scrolling */
  overflow-x: hidden; /* Hide horizontal overflow */
}

.detail-content {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #666;
  padding: 1.5rem 0; /* Move padding here instead */
  padding-right: 1rem;
}

/* Optional: Style the scrollbar for better appearance */
.product-details :deep(.el-collapse-item__content)::-webkit-scrollbar {
  width: 6px;
}

.product-details :deep(.el-collapse-item__content)::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.product-details :deep(.el-collapse-item__content)::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.product-details :deep(.el-collapse-item__content)::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.product-page {
  display: grid;
  grid-template-columns: 1fr;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Product Gallery */
.product-gallery {
  width: 100%;
  position: relative;
  overflow-y: scroll;
}

.main-image {
  margin-bottom: 1rem;
  aspect-ratio: 1;
  overflow: hidden;
  background-color: #f8f8f8;
}

.main-product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-wrapper {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 1rem;
}

/* Updated styles for el-image */
.product-image {
  width: 100%;
  height: 100vh;
  object-fit: cover;
  cursor: pointer;
  display: none;
}

.thumbnail-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
  gap: 0.5rem;
}

.thumbnail {
  aspect-ratio: 1;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.2s;
}

.thumbnail.active {
  border-color: #1a1a1a;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Product Information */
.product-info {
  width: 100%;
  position: relative;
}

.product-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1a1a1a;
  letter-spacing: 0.02em;
}

.product-description {
  margin-bottom: 2rem;
}

.product-description p {
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
}

/* Purchase Section */
.purchase-section {
  margin-bottom: 1.5rem;
}

.price {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1rem;
}

.add-to-cart-btn {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  background: #1a1a1a;
  border: none;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.add-to-cart-btn:hover {
  background: #333;
}

.add-to-cart-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* Pickup Info */
.pickup-info {
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f8f8f8;
  border-radius: 4px;
}

.pickup-text {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
}

/* Product Details */
.product-details {
  margin-bottom: 2rem;
}

.product-details :deep(.el-collapse) {
  border: none;
}

.product-details :deep(.el-collapse-item__header) {
  background: none;
  border: none;
  border-bottom: 1px solid #e5e5e5;
  padding: 1.5rem 0;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.shipping-section {
  margin-bottom: 1.5rem;
}

.shipping-section h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.shipping-section p {
  margin-bottom: 0.75rem;
}

.shipping-details {
  margin-top: 1rem;
}

.detail-content ul {
  list-style: none;
  padding: 0;
}

.detail-content li {
  padding: 0.25rem 0;
  position: relative;
  padding-left: 1rem;
}

.detail-content li:before {
  content: '•';
  position: absolute;
  left: 0;
  color: #1a1a1a;
}

.policy-link {
  color: #1a1a1a;
  text-decoration: underline;
}

.policy-link:hover {
  color: #666;
}

/* Mobile First Responsive Design */
@media (max-width: 640px) {
  .product-page {
    gap: 1.5rem;
  }

  .product-title {
    font-size: 1.75rem;
  }

  .thumbnail-gallery {
    grid-template-columns: repeat(6, 1fr);
  }

  .size-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 768px) {
  .thumbnail-gallery {
    grid-template-columns: repeat(6, 1fr);
  }

  .size-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (min-width: 1024px) {
  .product-gallery {
    display: none;
  }

  .product-image {
    display: block;
  }

  .product-wrapper {
    position: sticky;
    transform: translateY(-50%);
    top: 50%;
    bottom: 10px;
  }

  .main-image {
    margin-bottom: 1rem;
    aspect-ratio: 1;
    overflow: hidden;
    background-color: #f8f8f8;
  }

  .product-page {
    grid-template-columns: 1fr 1fr;
  }

  .thumbnail-gallery {
    grid-template-columns: repeat(6, 1fr);
    gap: 0.75rem;
  }
}
</style>
