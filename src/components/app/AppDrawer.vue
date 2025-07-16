<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watchEffect } from 'vue'

const drawer = ref<boolean>(false)
const props = defineProps<{ header?: string }>()

function handleCloseDrawer() {
  drawer.value = false
}

function handleOpenDrawer() {
  drawer.value = true
}

const windowWidth = ref(window.innerWidth)

// Computed properties
const drawerSize = computed(() => {
  if (windowWidth.value <= 480) return '100%'
  if (windowWidth.value <= 768) return '90%'
  if (windowWidth.value <= 1024) return '70%'
  return '500px'
})
// const size = ref(0)

// watchEffect(seeWindowWidth)

// function seeWindowWidth() {
//   if (window.innerWidth > 1200) {
//     size.value = 25
//   } else if (window.innerWidth > 500) {
//     size.value = 60
//   } else {
//     size.value = 90
//   }
// }

// onMounted(() => {
//   nextTick(() => {
//     window.addEventListener('resize', seeWindowWidth)
//   })
// })

// onUnmounted(() => window.removeEventListener('resize', seeWindowWidth))
</script>

<template>
  <slot name="trigger" :handleOpenDrawer></slot>
  <Teleport to="body">
    <el-drawer v-model="drawer" :size="drawerSize">
      <template #header v-if="props.header">
        <h3>{{ props.header }}</h3>
      </template>
      <slot name="default" :handleCloseDrawer></slot>
    </el-drawer>
  </Teleport>
</template>

<style scoped>
h3 {
  font-size: 1.125rem;
}
</style>
