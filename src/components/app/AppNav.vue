<script setup lang="ts">
import type { CollapseModelValue } from 'element-plus'
import { Search, ShoppingCart, X } from 'lucide-vue-next'
import { ref, onMounted, onUnmounted } from 'vue'

const isNavHidden = ref(false)
const hovered = ref(false)
const open = ref(false)
const mobileMenuOpen = ref(false)
const activeTab = ref(0)

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

  if (
    currentScrollY > lastScrollY &&
    currentScrollY > 100 &&
    !open.value &&
    !mobileMenuOpen.value
  ) {
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

  if (mobileMenuOpen.value) {
    mobileMenuOpen.value = false
  }
}

const handleExitSearch = () => {
  open.value = false
  toggleBodyScroll(false)
}

const handleMobileMenuToggle = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value

  if (open.value) {
    open.value = false
  }

  if (mobileMenuOpen.value === true) {
    toggleBodyScroll(true)
  } else {
    toggleBodyScroll(false)
  }
}

const handleBackdropClick = () => {
  toggleBodyScroll(false)

  open.value = false
  mobileMenuOpen.value = false
}

const handleChangeTab = (val: CollapseModelValue) => {
  activeTab.value = Number(val)
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
    <!-- Desktop Links -->
    <ul class="nav-links browser-links">
      <div class="link-group">
        <li class="link">Shop All</li>
        <li class="link" @mouseenter="handleDropdownEnter" @mouseleave="handleDropdownLeave">
          Categories <span v-if="!hovered">+</span><span v-else>-</span>
        </li>
      </div>

      <li class="link">Logo</li>

      <div class="link-group">
        <li class="link search-link" @click="handleSeachClick">
          <Search class="nav-icon" /><span> Search </span>
        </li>
        <li class="link"><ShoppingCart class="nav-icon" /></li>
      </div>
    </ul>

    <!-- Desktop Links -->
    <ul class="nav-links mobile-links">
      <div class="link-group">
        <li class="link" @click="handleMobileMenuToggle">
          Menu <span v-if="!mobileMenuOpen">+</span><span v-else>-</span>
        </li>
        <li class="link search-link" @click="handleSeachClick">
          <Search class="nav-icon" />
        </li>
      </div>

      <li class="link logo">Logo</li>

      <div class="link-group">
        <li class="link"><ShoppingCart class="nav-icon" /></li>
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
      <div v-if="open" class="backdrop" @click="handleBackdropClick">
        <div class="search">
          <p>Search</p>
          <div class="input-group">
            <div class="search-wrapper">
              <Search class="nav-icon" />
              <input type="text" class="nav-search" placeholder="Search" />
            </div>
            <button class="search-button">search</button>
          </div>
          <X class="search-exit" @click="handleExitSearch" />
        </div>
      </div>
    </Transition>

    <Transition name="slide-down">
      <div v-if="mobileMenuOpen" class="backdrop" @click.self="handleBackdropClick">
        <el-collapse class="mobile-menu-collapse" v-model="activeTab" @change="handleChangeTab">
          <el-collapse-item class="mobile-menu-collapse__item" title="Featured" name="1">
            <div>Shop All</div>
          </el-collapse-item>
          <el-collapse-item class="mobile-menu-collapse__item" title="Categories" name="2">
            <div>Title2</div>
            <div>Container2</div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.search-exit {
  justify-self: end;
}

.search-wrapper {
  display: flex;
  gap: 0.5rem;
  border-bottom: 1px solid black;
  padding: 0.5rem 0.25rem;
}

.input-group {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-search {
  border: none;
  background: transparent;
}

.nav-search::placeholder {
  color: #000;
}

.search-button {
  width: 135px;
  height: 45px;
  padding: 0.5rem;
  text-transform: uppercase;
}

.mobile-menu-collapse {
  background-color: black;
  height: fit-content;

  border: none;
}

.mobile-menu-collapse__item {
  padding: 0.5rem 0.75rem;
}

:deep(.el-collapse-item__header) {
  font-size: 1.125rem;
  padding: 1rem;
  background-color: transparent;
  color: #fff;
  border: none;
}

:deep(.el-collapse-item__wrap) {
  background-color: #000;
  border: none;
}

:deep(.el-collapse-item__content div) {
  padding: 1rem;
  color: #fff;
  font-weight: bold;
  font-size: 1rem;
}

.logo {
  font-size: 1.25rem;
}

.mobile-links {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

.search {
  text-transform: uppercase;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  width: 100%;
  height: 100px;
  padding: 1rem;
  background-color: orange;
}

.backdrop {
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
  font-size: 0.875rem;
  list-style: none;
  padding: 0;
  z-index: 2;
  cursor: pointer;
  position: relative;
  background-color: red;
}

.browser-links {
  /* display: grid; */
  display: none;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  /* background-color: red; */
  /* justify-content: space-between; */
}

.link-group {
  display: flex;
  /* gap: 2rem; */
}

.link-group:last-of-type {
  justify-self: end;
}

.link {
  /* padding: 1.5rem 1.75rem; */
  padding: 1rem 0.75rem;
  text-transform: uppercase;
}

.search-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-icon {
  /* width: 20px;
  height: 20px; */
  width: 1.125rem;
  height: 1.125rem;
  display: flex;
  align-items: center;
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

@media screen and (min-width: 700px) {
  .mobile-links {
    display: none;
  }

  .browser-links {
    display: grid;
  }
}
</style>
