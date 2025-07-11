<script lang="ts" setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watchEffect } from 'vue'
import { truncate } from '../lib/helpers'

const props = defineProps<{
  text: string
  maxChars: number
  breakpoint: number
  fontSize: number
}>()

const expanded = ref(false)
const hasTrigger = computed(() => props.text.length > props.maxChars)

onMounted(() => {
  nextTick(() => {
    window.addEventListener('resize', onResize)
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})

watchEffect(onResize)

function onResize() {
  if (window.innerWidth > props.breakpoint) {
    expanded.value = true
  } else if (window.innerWidth < props.breakpoint) {
    expanded.value = false
  }
}
</script>

<template>
  <div class="expander-wrapper">
    <p :style="{ fontSize: `${fontSize}px` }">
      {{ !expanded ? truncate(props.text, maxChars) : props.text }}
    </p>

    <el-button v-if="hasTrigger" @click="expanded = !expanded">
      <el-icon v-if="!expanded"><ArrowRight /></el-icon>
      <el-icon v-else><ArrowDown /></el-icon>
    </el-button>
  </div>
</template>

<style scoped>
.expander-wrapper {
  width: 100%;
  position: relative;
  line-height: 1.25rem;
}

p {
  margin-right: 35px;
  line-height: 1.5rem;
}

.el-button {
  border: 0;
  height: 25px;
  width: 25px;
  position: absolute;
  top: 0;
  right: 0;
}

@media screen and (min-width: 765px) {
  .el-button {
    display: none;
  }

  p {
    margin-right: 0;
  }
}
</style>
