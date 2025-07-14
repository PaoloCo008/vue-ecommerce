<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref<boolean>(false)
const props = defineProps<{ header?: string }>()

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
    <el-drawer v-model="drawer" :size="`90%`">
      <template #header v-if="props.header">
        <h3>{{ props.header }}</h3>
      </template>
      <slot name="default" :handleCloseDrawer></slot>
    </el-drawer>
  </Teleport>
</template>

<style scoped></style>
