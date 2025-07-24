<script lang="ts" setup>
import { useAuthStore } from '@/stores/AuthStore'
import { computed, provide, ref } from 'vue'
import { useRoute } from 'vue-router'

const modalVisible = ref(false)
const authStore = useAuthStore()
const route = useRoute()

const notInAddressForm = computed(() => authStore.getAuthCurrentStep <= 3)
const isSpecificRoute = computed(() => route.name === 'checkout')

const headerStyles = computed(() => {
  if (isSpecificRoute.value) {
    return {
      '--header-margin-bottom': '1rem',
    }
  }
  return {
    '--el-dialog-padding-primary': '0',
  }
})

const props = defineProps<{
  dialogStyle: {
    width?: string
    maxWidth?: string
    height?: string
  }

  title?: string
}>()

function onTriggerClick() {
  modalVisible.value = true
}

function closeModal() {
  modalVisible.value = false
}

provide('closeModal', closeModal)
</script>

<template>
  <slot name="trigger" :onTriggerClick></slot>

  <Teleport to="body">
    <el-dialog
      destroy-on-close
      v-model="modalVisible"
      :width="notInAddressForm ? props.dialogStyle.width : '100%'"
      :style="{
        maxWidth: notInAddressForm ? props.dialogStyle.maxWidth : '700px',
        height: notInAddressForm ? props.dialogStyle.height : '620px',
        overflow: notInAddressForm ? 'hidden' : 'auto',
        textTransform: 'none',
        padding: '2rem',
        ...headerStyles,
      }"
      align-center
      :title="title"
    >
      <slot name="default" :closeModal></slot>
    </el-dialog>
  </Teleport>
</template>
