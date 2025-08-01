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
          v-for="(product, index) in products"
          :key="product.id"
          class="product-card"
          :style="{
            width: `${cardWidth}px`,
            marginRight: index === products.length - 1 ? '0px' : `${cardGap}px`,
          }"
        >
          <div class="product-image-container">
            <img :src="product.image" :alt="product.name" class="product-image" draggable="false" />
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

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

// Props
const props = defineProps({
  products: {
    type: Array,
    default: () => [
      {
        id: 1,
        name: 'Oversized Hoodie That Has A Long Name For The Sake Of Testing',
        price: 89,
        originalPrice: 129,
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop',
        badge: 'Sale',
        colors: ['#000000', '#666666', '#ffffff'],
      },
      {
        id: 2,
        name: 'Graphic Tee',
        price: 45,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
        colors: ['#000000', '#ff6b6b', '#4ecdc4'],
      },
      {
        id: 3,
        name: 'Denim Jacket',
        price: 120,
        image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=500&fit=crop',
        badge: 'New',
        colors: ['#4a90e2', '#2c3e50'],
      },
      {
        id: 4,
        name: 'Cargo Pants',
        price: 75,
        originalPrice: 95,
        image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop',
        colors: ['#8b4513', '#556b2f', '#000000'],
      },
      {
        id: 5,
        name: 'Sneakers',
        price: 150,
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop',
        badge: 'Limited',
        colors: ['#ffffff', '#000000', '#ff6b6b'],
      },
      {
        id: 6,
        name: 'Beanie',
        price: 25,
        image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=500&fit=crop',
        colors: ['#000000', '#8b4513', '#2c3e50'],
      },
    ],
  },
  cardGap: {
    type: Number,
    default: 16,
  },
  containerPadding: {
    type: Number,
    default: 20,
  },
  peekAmount: {
    type: Number,
    default: 60,
  },
})

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
  return Math.max(0, props.products.length - 1)
})

const translateX = computed(() => {
  let baseTranslate

  if (currentIndex.value === props.products.length - 1) {
    // For the last item, position it at the right edge with same padding as first item
    // Calculate total width of all cards and gaps, then position to show last card properly
    const totalWidth =
      (cardWidth.value + props.cardGap) * (props.products.length - 1) + cardWidth.value
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
