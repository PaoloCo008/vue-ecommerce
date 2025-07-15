<script lang="ts" setup>
import { ref } from 'vue'

const modalVisible = ref(false)

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
    <el-dialog v-model="modalVisible" align-center :onSubmit>
      <slot></slot>
    </el-dialog>
  </Teleport>
</template>

<style>
.el-dialog {
  width: 95vw;
  max-width: 450px;
  padding: 1.5rem;
  text-transform: none;
  height: 380px;
  overflow: hidden;
}

@media screen and (min-width: 455px) {
  .el-dialog {
    padding: 2.25rem;
  }
}
</style>
