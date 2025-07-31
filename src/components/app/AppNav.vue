<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isNavHidden = ref(false)
const hovered = ref(false)
const open = ref(false)
let ticking = false
let hideTimeout: number | undefined

let lastScrollY = 0
let scrollPosition = 0

const toggleBodyScroll = (disable: boolean) => {
  if (disable) {
    scrollPosition = window.pageYOffset
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollPosition}px`
    document.body.style.width = '100%'
  } else {
    document.body.style.overflow = ''
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.width = ''
    window.scrollTo(0, scrollPosition)
  }
}

const updateNavbar = () => {
  const currentScrollY = window.scrollY

  console.log({ currentScrollY, lastScrollY })

  if (currentScrollY > lastScrollY && currentScrollY > 100 && !open.value) {
    isNavHidden.value = true
  } else {
    isNavHidden.value = false
  }

  lastScrollY = currentScrollY
  ticking = false
}

const requestTick = () => {
  if (!ticking && !hovered.value) {
    requestAnimationFrame(updateNavbar)
    ticking = true
  }
}

const handleDropdownLeave = () => {
  hideTimeout = setTimeout(() => {
    hovered.value = false
  }, 200)
}

const handleDropdownEnter = () => {
  if (open.value) open.value = false

  clearTimeout(hideTimeout)
  hovered.value = true
}

const handleSeachClick = () => {
  open.value = true
  toggleBodyScroll(true)
}

const handleExitSearch = () => {
  open.value = false
  toggleBodyScroll(false)
}

onMounted(() => {
  window.addEventListener('scroll', requestTick)
})

onUnmounted(() => {
  window.removeEventListener('scroll', requestTick)
})
</script>

<template>
  <div class="smart-navbar" :class="{ 'nav-hidden': isNavHidden }">
    <ul class="nav-links">
      <div class="link-group">
        <li class="link">link 1</li>
        <li class="link" @mouseenter="handleDropdownEnter" @mouseleave="handleDropdownLeave">
          link 1 <span v-if="!hovered">+</span><span v-else>-</span>
        </li>
      </div>

      <li class="link">link 1</li>

      <div class="link-group">
        <li class="link" @click="handleSeachClick">link 1</li>
        <li class="link">link 1</li>
      </div>
    </ul>
    <Transition name="slide-down">
      <div
        class="area"
        v-if="hovered"
        @mouseenter="handleDropdownEnter"
        @mouseleave="handleDropdownLeave"
      ></div>
    </Transition>
    <Transition name="slide-down">
      <div v-if="open" class="search-backdrop">
        <div class="search">
          <span @click="handleExitSearch">x</span>
          <p>Search</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.search {
  width: 100%;
  height: 100px;

  background-color: orange;
}

.search-backdrop {
  width: 100%;
  height: 100vh;
  transform-origin: top;
  background-color: rgba(3, 3, 3, 0.5);
  backdrop-filter: blur(10px);
  position: fixed;
}

.area {
  background-color: blue;
  width: 100%;
  height: 200px;
  position: absolute;
  top: 100%;
  left: 0;
  transform-origin: top;
}

.navbar {
  position: absolute;
}

.nav-links {
  list-style: none;
  display: flex;
  background-color: red;
  padding: 0;
  justify-content: space-between;
  position: relative;
  z-index: 2;
  cursor: pointer;
}

.link-group {
  display: flex;
  gap: 2rem;
}

.link {
  padding: 1rem 1.5rem;
}

.smart-navbar {
  position: fixed;
  top: 0;
  width: 100%;
  transition: transform 0.3s ease-in-out;
  z-index: 999;
  background-color: #fff;
}

.smart-navbar.nav-hidden {
  transform: translateY(-100%);
}

.slide-down-enter-active {
  transition: all 0.3s ease-out;
}

.slide-down-leave-active {
  transition: all 0.2s ease-in;
}

.slide-down-enter-from {
  transform: scaleY(0);
  opacity: 0;
}

.slide-down-leave-to {
  transform: scaleY(0);
  opacity: 0;
}

.slide-down-enter-to,
.slide-down-leave-from {
  transform: scaleY(1);
  opacity: 1;
}
</style>
