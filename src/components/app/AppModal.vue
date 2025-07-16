<script lang="ts" setup>
import { ref } from 'vue'

const modalVisible = ref(false)

defineProps<{
  dialogStyle: {
    width?: string
    maxWidth?: string
    height?: string
  }
}>()

function onTriggerClick() {
  modalVisible.value = true
}

function onSubmit() {
  modalVisible.value = false
}
</script>

<template>
  <slot name="trigger" :onTriggerClick></slot>

  <Teleport to="body">
    <el-dialog v-model="modalVisible" align-center :onSubmit :style="dialogStyle">
      <slot></slot>
    </el-dialog>
  </Teleport>
</template>

<style>
.el-dialog {
  padding: 1.5rem;
  text-transform: none;
  overflow: hidden;
}

@media screen and (min-width: 575px) {
  .el-dialog {
    padding: 2.25rem;
  }
}
</style>
