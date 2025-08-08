<script setup lang="ts">
import type { Product } from '@/lib/types/globals'
import { useProductStore } from '@/stores/ProductStore'
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

const productStore = useProductStore()

// Props
const props = withDefaults(
  defineProps<{
    featuredProducts: Product[]
    cardGap?: number
    containerPadding?: number
    peekAmount?: number
  }>(),
  { featuredProducts: () => [], cardGap: 16, containerPadding: 20, peekAmount: 50 },
)

// Template refs
const containerRef = ref(null)

// Reactive state
const currentIndex = ref(0)
const isDragging = ref(false)
const startX = ref(0)
const currentX = ref(0)
const containerWidth = ref(0)
const cardWidth = ref(0)
const itemsPerView = ref(1.2) // Show 1 full card + 20% of next

// Computed properties
const currentPage = computed(() => Math.floor(currentIndex.value / itemsPerView.value))

const maxIndex = computed(() => {
  return Math.max(0, props.featuredProducts.length - 1)
})

const translateX = computed(() => {
  let baseTranslate

  if (currentIndex.value === props.featuredProducts.length - 1) {
    // For the last item, position it at the right edge with same padding as first item
    // Calculate total width of all cards and gaps, then position to show last card properly
    const totalWidth =
      (cardWidth.value + props.cardGap) * (props.featuredProducts.length - 1) + cardWidth.value
    baseTranslate = containerWidth.value - totalWidth - props.containerPadding
  } else {
    // Regular positioning for other cards
    baseTranslate =
      -currentIndex.value * (cardWidth.value + props.cardGap) + props.containerPadding - 5
  }

  if (isDragging.value) {
    const dragOffset = currentX.value - startX.value
    return baseTranslate + dragOffset
  }

  return baseTranslate
})

// Calculate dimensions
const calculateDimensions = () => {
  if (!containerRef.value) return

  containerWidth.value = containerRef.value.offsetWidth

  // Calculate card width: container width minus padding, divided by items per view, minus gap
  const availableWidth = containerWidth.value - props.containerPadding * 2
  cardWidth.value = (availableWidth - props.cardGap * (itemsPerView.value - 1)) / itemsPerView.value
}

// Touch handlers
const handleTouchStart = (e) => {
  startDrag(e.touches[0].clientX)
}

const handleTouchMove = (e) => {
  if (isDragging.value) {
    e.preventDefault()
    currentX.value = e.touches[0].clientX
  }
}

const handleTouchEnd = () => {
  endDrag()
}

// Mouse handlers
const handleMouseDown = (e) => {
  startDrag(e.clientX)
}

const handleMouseMove = (e) => {
  if (isDragging.value) {
    e.preventDefault()
    currentX.value = e.clientX
  }
}

const handleMouseUp = () => {
  endDrag()
}

// Drag logic
const startDrag = (clientX) => {
  isDragging.value = true
  startX.value = clientX
  currentX.value = clientX
}

const endDrag = () => {
  if (!isDragging.value) return

  const dragDistance = currentX.value - startX.value
  const threshold = cardWidth.value * 0.2 // 20% of card width

  if (dragDistance > threshold && currentIndex.value > 0) {
    // Swipe right - go to previous
    currentIndex.value = Math.max(0, currentIndex.value - 1)
  } else if (dragDistance < -threshold && currentIndex.value < maxIndex.value) {
    // Swipe left - go to next
    currentIndex.value = Math.min(maxIndex.value, currentIndex.value + 1)
  }

  isDragging.value = false
}

// Update dimensions on resize
const updateDimensions = () => {
  calculateDimensions()
}

// Lifecycle
onMounted(async () => {
  await nextTick()
  calculateDimensions()
  window.addEventListener('resize', updateDimensions)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateDimensions)
})
</script>

<template>
  <div class="product-swiper">
    <div
      ref="containerRef"
      class="swiper-container"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      @mouseleave="handleMouseUp"
    >
      <div
        class="swiper-wrapper"
        :style="{
          transform: `translateX(${translateX}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out',
        }"
      >
        <div
          v-for="(product, index) in featuredProducts"
          :key="product?._id"
          class="product-card"
          :style="{
            width: `${cardWidth}px`,
            marginRight: index === featuredProducts.length - 1 ? '0px' : `${cardGap}px`,
          }"
        >
          <div class="product-image-container">
            <img
              :src="productStore.getProductPrimaryImageById(product._id)"
              :alt="product.name"
              class="product-image"
              draggable="false"
            />
          </div>

          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <div class="product-pricing">
              <span class="price">${{ product.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Prevent horizontal scroll on the entire component */
.product-swiper {
  width: 100%;
  max-width: 100vw;
  overflow: hidden;
  box-sizing: border-box;
}

.swiper-container {
  width: 100%;
  max-width: 100%;
  height: auto;
  overflow: hidden;
  cursor: grab;
  user-select: none;
  position: relative;
  box-sizing: border-box;
}

.swiper-container:active {
  cursor: grabbing;
}

.swiper-wrapper {
  display: flex;
  height: auto;
  will-change: transform;
  box-sizing: border-box;
}

.product-card {
  flex: 0 0 auto;
  background: #ffffff;
  overflow: hidden;
  transition: transform 0.2s ease;
  box-sizing: border-box;
}

.product-image-container {
  position: relative;
  width: 100%;
  height: 580px;
  max-width: 580px;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
  transition: transform 0.2s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-info {
  padding: 16px 0 16px 0;
}

.product-name {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 8px 0;
  line-height: 1.3;
}

.product-pricing {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.price {
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
}

.original-price {
  font-size: 14px;
  color: #999;
  text-decoration: line-through;
}
</style>
