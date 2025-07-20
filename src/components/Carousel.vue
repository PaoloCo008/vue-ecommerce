<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Sample images for testing
const sampleImages = [
  {
    src: 'https://picsum.photos/600/400?random=1',
    thumb: 'https://picsum.photos/80/60?random=1',
    alt: 'Beautiful Mountain Landscape',
  },
  {
    src: 'https://picsum.photos/600/400?random=2',
    thumb: 'https://picsum.photos/80/60?random=2',
    alt: 'Urban City Skyline',
  },
  {
    src: 'https://picsum.photos/600/400?random=3',
    thumb: 'https://picsum.photos/80/60?random=3',
    alt: 'Peaceful Ocean Waves',
  },
  {
    src: 'https://picsum.photos/600/400?random=4',
    thumb: 'https://picsum.photos/80/60?random=4',
    alt: 'Autumn Forest Path',
  },
  {
    src: 'https://picsum.photos/600/400?random=5',
    thumb: 'https://picsum.photos/80/60?random=5',
    alt: 'Snow Mountain Peak',
  },
  {
    src: 'https://picsum.photos/600/400?random=6',
    thumb: 'https://picsum.photos/80/60?random=6',
    alt: 'Desert Sunset',
  },
]

// Props
const props = defineProps({
  images: {
    type: Array,
    default: () => [],
  },
  loop: {
    type: Boolean,
    default: true,
  },
  autoplay: {
    type: Boolean,
    default: false,
  },
  autoplayInterval: {
    type: Number,
    default: 3000,
  },
})

// Use sample images if no images provided
const displayImages = computed(() => {
  return props.images.length > 0 ? props.images : sampleImages
})

// Emits
const emit = defineEmits(['change'])

// Reactive data
const currentIndex = ref(0)
let autoplayTimer = null

// Methods
const goToImage = (index) => {
  currentIndex.value = index
  emit('change', index)
}

const nextImage = () => {
  if (props.loop) {
    currentIndex.value = (currentIndex.value + 1) % displayImages.value.length
  } else if (currentIndex.value < displayImages.value.length - 1) {
    currentIndex.value++
  }
  emit('change', currentIndex.value)
}

const previousImage = () => {
  if (props.loop) {
    currentIndex.value =
      currentIndex.value === 0 ? displayImages.value.length - 1 : currentIndex.value - 1
  } else if (currentIndex.value > 0) {
    currentIndex.value--
  }
  emit('change', currentIndex.value)
}

const startAutoplay = () => {
  if (props.autoplay) {
    autoplayTimer = setInterval(nextImage, props.autoplayInterval)
  }
}

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

// Keyboard navigation
const handleKeydown = (event) => {
  if (event.key === 'ArrowLeft') {
    previousImage()
  } else if (event.key === 'ArrowRight') {
    nextImage()
  }
}

// Lifecycle
onMounted(() => {
  startAutoplay()
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  stopAutoplay()
  document.removeEventListener('keydown', handleKeydown)
})

// Expose methods
defineExpose({
  goToImage,
  nextImage,
  previousImage,
  getCurrentIndex: () => currentIndex.value,
})
</script>

<template>
  <div class="product-carousel">
    <!-- Main Image Display -->
    <div class="main-image-container">
      <img
        :src="displayImages[currentIndex].src"
        :alt="displayImages[currentIndex].alt"
        class="main-image"
      />

      <!-- Navigation Arrows -->
      <button
        class="nav-arrow nav-arrow--left"
        @click="previousImage"
        :disabled="!loop && currentIndex === 0"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </button>

      <button
        class="nav-arrow nav-arrow--right"
        @click="nextImage"
        :disabled="!loop && currentIndex === displayImages.length - 1"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      </button>

      <!-- Image Title Overlay -->
      <div class="image-overlay" v-if="displayImages[currentIndex].alt">
        <p class="image-title">{{ displayImages[currentIndex].alt }}</p>
      </div>
    </div>

    <!-- Thumbnail Strip -->
    <div class="thumbnail-strip">
      <button
        v-for="(image, index) in displayImages"
        :key="index"
        class="thumbnail-button"
        :class="{ 'thumbnail-button--active': index === currentIndex }"
        @click="goToImage(index)"
      >
        <img :src="image.thumb" :alt="`Thumbnail ${index + 1}`" class="thumbnail-image" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.product-carousel {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 200px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.main-image-container {
  position: relative;
  flex: 1;
  min-height: 420px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-arrow:hover:not(:disabled) {
  background: white;
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.nav-arrow:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-arrow--left {
  left: 8px;
}

.nav-arrow--right {
  right: 8px;
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
  padding: 8px 12px;
}

.image-title {
  margin: 0;
  font-size: 0.85rem;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.thumbnail-strip {
  display: flex;
  gap: 6px;
  padding: 12px;
  background: #fafafa;
  border-top: 1px solid #eee;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  justify-content: center;
}

.thumbnail-strip::-webkit-scrollbar {
  display: none;
}

.thumbnail-button {
  flex-shrink: 0;
  border: 2px solid transparent;
  border-radius: 6px;
  padding: 0;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.thumbnail-button:hover {
  border-color: #409eff;
  transform: scale(1.05);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.thumbnail-button--active {
  border-color: #409eff;
  box-shadow: 0 2px 6px rgba(64, 158, 255, 0.3);
}

.thumbnail-image {
  width: 50px;
  height: 38px;
  object-fit: cover;
  display: block;
}

/* Tablet styles */
@media (min-width: 765px) {
  .product-carousel {
    min-height: 250px;
  }

  .main-image-container {
    min-height: 420px;
  }

  .nav-arrow {
    width: 32px;
    height: 32px;
  }

  .nav-arrow--left {
    left: 12px;
  }

  .nav-arrow--right {
    right: 12px;
  }

  .image-overlay {
    padding: 12px 16px;
  }

  .image-title {
    font-size: 0.9rem;
  }

  .thumbnail-strip {
    gap: 8px;
    padding: 14px;
  }

  .thumbnail-image {
    width: 60px;
    height: 45px;
  }
}

/* Desktop styles */
@media (min-width: 1024px) {
  .product-carousel {
    min-height: 300px;
  }

  .main-image-container {
    min-height: 420px;
  }

  .nav-arrow {
    width: 36px;
    height: 36px;
  }

  .nav-arrow svg {
    width: 14px;
    height: 14px;
  }

  .nav-arrow--left {
    left: 16px;
  }

  .nav-arrow--right {
    right: 16px;
  }

  .image-overlay {
    padding: 16px 20px;
  }

  .image-title {
    font-size: 1rem;
  }

  .thumbnail-strip {
    gap: 10px;
    padding: 16px;
  }

  .thumbnail-image {
    width: 70px;
    height: 53px;
  }
}

/* Large desktop */
@media (min-width: 1200px) {
  .thumbnail-image {
    width: 75px;
    height: 56px;
  }

  .thumbnail-strip {
    gap: 12px;
    padding: 18px;
  }
}

/* Small mobile adjustments */
@media (max-width: 480px) {
  .product-carousel {
    min-height: 180px;
    border-radius: 6px;
  }

  .main-image-container {
    min-height: 420px;
  }

  .nav-arrow {
    width: 24px;
    height: 24px;
  }

  .nav-arrow svg {
    width: 10px;
    height: 10px;
  }

  .nav-arrow--left {
    left: 6px;
  }

  .nav-arrow--right {
    right: 6px;
  }

  .image-overlay {
    padding: 6px 10px;
  }

  .image-title {
    font-size: 0.75rem;
  }

  .thumbnail-strip {
    gap: 4px;
    padding: 8px;
  }

  .thumbnail-image {
    width: 42px;
    height: 32px;
  }
}
</style>
