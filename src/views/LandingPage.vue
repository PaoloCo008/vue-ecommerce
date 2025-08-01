<template>
  <div class="landing-page">
    <!-- Slideshow -->
    <div class="slideshow-container">
      <!-- Main slide content -->
      <div class="slide-wrapper">
        <div class="slide" :style="{ backgroundImage: `url(${currentSlide.image})` }">
          <!-- <div class="slide-content">
            <h1 class="slide-title">{{ currentSlide.title }}</h1>
            <h2 class="slide-subtitle">{{ currentSlide.subtitle }}</h2>
            <p class="slide-description">{{ currentSlide.description }}</p>
          </div> -->
        </div>
      </div>

      <!-- Navigation controls -->
      <div class="navigation">
        <!-- Left arrow -->
        <button class="nav-button nav-left" @click="previousSlide" :disabled="currentIndex === 0">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <!-- Slide indicators -->
        <div class="slide-indicators">
          <span class="current-slide">{{ String(currentIndex + 1).padStart(2, '0') }}</span>
          <span class="separator">/</span>
          <span class="total-slides">{{ String(slides.length).padStart(2, '0') }}</span>
        </div>

        <!-- Right arrow -->
        <button
          class="nav-button nav-right"
          @click="nextSlide"
          :disabled="currentIndex === slides.length - 1"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>

      <!-- Shop button -->
      <button class="shop-button">
        SHOP
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 18L15 12L9 6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <!-- Collection Tabs -->
    <sections class="feature-section">
      <div class="feature-section-tabs">
        <div class="active-tab">Best Sellers</div>
        <div>New Arrivals</div>
        <div>Features Items</div>
      </div>
      <Swiper class="mobile-feature-products" />
      <ProductList class="desktop-feature-products" />
      <button class="feature-section-button">View All</button>
    </sections>

    <!-- Category Section -->
    <section class="categories-section">
      <div class="category">
        <img
          class="category-img"
          src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop"
          alt="test"
        />
        <p>Tees</p>
      </div>
      <div class="category">
        <img
          class="category-img"
          src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop"
          alt="test"
        />
        <p>Hoodies</p>
      </div>
      <div class="category">
        <img
          class="category-img"
          src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop"
          alt="test"
        />
        <p>Longsleeves</p>
      </div>
      <div class="category">
        <img
          class="category-img"
          src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop"
          alt="test"
        />
        <p>Bottoms</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import ProductList from '@/components/product/ProductList.vue'
import Swiper from '@/components/Swiper.vue'
import { ref, computed } from 'vue'

interface Slide {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
}

// Sample slides data
const slides = ref<Slide[]>([
  {
    id: 1,
    title: 'SUMMER',
    subtitle: 'SALE',
    description: 'Our favourite styles and colours are now up to 50% off for our Summer Sale.',
    image:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop&crop=center',
  },
  {
    id: 2,
    title: 'OUTDOOR',
    subtitle: 'COLLECTION',
    description: 'Discover our premium outdoor gear designed for your next adventure.',
    image:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop&crop=center',
  },
  {
    id: 3,
    title: 'BEACH',
    subtitle: 'ESSENTIALS',
    description: 'Everything you need for the perfect beach day and summer vibes.',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop&crop=center',
  },
])

const currentIndex = ref<number>(0)

const currentSlide = computed<Slide>(() => slides.value[currentIndex.value])

const nextSlide = (): void => {
  if (currentIndex.value < slides.value.length - 1) {
    currentIndex.value++
  }
}

const previousSlide = (): void => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

// Optional: Auto-play functionality
// const autoPlay = () => {
//   setInterval(() => {
//     if (currentIndex.value === slides.value.length - 1) {
//       currentIndex.value = 0
//     } else {
//       nextSlide()
//     }
//   }, 5000)
// }

// onMounted(() => {
//   autoPlay()
// })
</script>

<style scoped>
.categories-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  text-transform: uppercase;
  padding: 0.5rem;
}

.category {
  display: grid;
  gap: 1rem;
}

.category-img {
  height: 100%;
  max-height: 800px;
  width: 100%;
  vertical-align: top;
  object-fit: cover;
}

.desktop-feature-products {
  display: none;
}

.feature-section {
  display: grid;
  place-items: center;
  text-transform: uppercase;
  gap: 1rem;
}

.feature-section-tabs {
  display: flex;
  gap: 3rem;
  justify-self: start;
  margin-left: 1rem;
  margin-bottom: 2rem;
}

.active-tab {
  border-bottom: 1px solid #000;
  padding-bottom: 1rem;
}

.feature-section-button {
  border: none;
  background-color: #000;
  color: #fff;
  padding: 0.875rem 5rem;
  text-transform: inherit;
  cursor: pointer;
}

.landing-page {
  display: grid;
  gap: 5rem;
}

.feature-tabs {
  height: 100vh;
}

.slideshow-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.slide-wrapper {
  width: 100%;
  height: 100%;
}

.slide {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.slide::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.slide-content {
  text-align: center;
  color: white;
  z-index: 2;
  position: relative;
  max-width: 800px;
  padding: 0 2rem;
}

.slide-title {
  font-size: clamp(3rem, 8vw, 8rem);
  font-weight: 900;
  letter-spacing: 0.2em;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  -webkit-text-stroke: 2px transparent;
  color: transparent;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  background-clip: text;
}

.slide-subtitle {
  font-size: clamp(3rem, 8vw, 8rem);
  font-weight: 900;
  letter-spacing: 0.2em;
  margin: -1rem 0 2rem 0;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.slide-description {
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.navigation {
  position: absolute;
  bottom: 4rem;
  left: 4rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  z-index: 3;
}

.nav-button {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.5);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.nav-button:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.8);
  transform: scale(1.05);
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.slide-indicators {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.separator {
  opacity: 0.6;
}

.shop-button {
  position: absolute;
  bottom: 4rem;
  right: 4rem;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.8);
  color: white;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  backdrop-filter: blur(10px);
  z-index: 3;
}

.shop-button:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(5px);
}

@media screen and (min-width: 750px) {
  .desktop-feature-products {
    display: grid;
  }

  .mobile-feature-products {
    display: none;
  }

  .feature-section-tabs {
    justify-self: center;
  }
}

@media screen and (min-width: 765px) {
  .categories-section {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (min-width: 1024px) {
  .categories-section {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .navigation {
    bottom: 2rem;
    left: 2rem;
    gap: 1rem;
  }

  .nav-button {
    width: 40px;
    height: 40px;
  }

  .shop-button {
    bottom: 2rem;
    right: 2rem;
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }

  .slide-content {
    padding: 0 1rem;
  }

  .slide-description {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .navigation {
    bottom: 1rem;
    left: 1rem;
  }

  .shop-button {
    bottom: 1rem;
    right: 1rem;
  }
}
</style>
