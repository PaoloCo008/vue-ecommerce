<script lang="ts" setup>
defineProps<{ label: 'home' | 'office' }>()
</script>

<template>
  <el-tag
    type="success"
    size="small"
    :class="{ tag: true, home: label === 'home', office: label === 'office' }"
    >{{ label }}</el-tag
  >
</template>

<style scoped>
.tag {
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.5);
}

.home {
  border-color: var(--color-main);
  background-color: var(--color-main-transparent);
  box-shadow: 0 0 5px 1px var(--color-main-transparent);
}

.office {
  background-color: unset;
  border-color: var(--color-tertiary);
  box-shadow: 0 0 5px 1px var(--color-tertiary-opaque);
}
</style>
