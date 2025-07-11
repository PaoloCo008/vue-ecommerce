<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref<boolean>(false)

function handleCloseDrawer() {
  drawer.value = false
}

function handleOpenDrawer() {
  drawer.value = true
}
</script>

<template>
  <slot name="trigger" :handleOpenDrawer></slot>
  <Teleport to="body">
    <el-drawer v-model="drawer" :size="`80%`">
      <slot name="default" :handleCloseDrawer></slot>
    </el-drawer>
  </Teleport>
</template>

<style scoped></style>
