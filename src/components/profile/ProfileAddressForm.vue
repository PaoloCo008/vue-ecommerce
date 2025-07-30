<script setup lang="ts">
import ProfileContentLayout from '@/layouts/ProfileContentLayout.vue'

import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AddressForm from '../address/AddressForm.vue'

const route = useRoute()

const isEditting = computed(() => route.meta.operation === 'edit')
</script>

<template>
  <ProfileContentLayout :page-title="isEditting ? 'Edit My Address' : 'Add New Address'">
    <AddressForm />
  </ProfileContentLayout>
</template>

<style scoped>
.el-form {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  background-color: #fff;
  padding: 1.5rem;

  gap: 1rem;
}

.el-form-item {
  margin-bottom: 2rem;
}

.el-input {
  --el-input__wrapper-border-color: var(--color-background);
  --el-input-focus-border-color: var(--el-border-color-hover);
}

.el-button {
  --el-button-outline-color: var(--color-main-opaque);
}

:deep(.el-input__wrapper) {
  padding: 0.875rem 0.75rem;
}

.button-label {
  --el-button-hover-text-color: none;
  padding: 1.5rem 1.25rem;
  text-transform: uppercase;
  width: 100%;
}

.office {
  --el-button-border-color: var(--color-tertiary);
}

.home {
  --el-button-border-color: var(--color-main);
  --el-button-bg-color: var(--color-main-transparent);
  box-shadow: 0 0 5px 1px var(--color-main-transparent);
  --el-button-hover-bg-color: var(--color-main-transparent);
  --el-button-hover-border-color: var(--color-main);
  margin: 0;
}

.cancel-button {
  background-color: #e0e0e0;
  border-color: #e0e0e0;
  color: #666;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 500;
  text-transform: capitalize;
}

.cancel-button:hover {
  background-color: #d0d0d0;
  border-color: #d0d0d0;
}

.save-button {
  background-color: #ff6b35;
  border-color: #ff6b35;
  color: white;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.875rem;
  margin: 0;
  text-transform: uppercase;
}

.save-button:hover {
  background-color: #e55a2b;
  border-color: #e55a2b;
}

.delete-button {
  position: absolute;
  text-transform: uppercase;
  font-size: 1rem;
  top: -4rem;
  right: 0;
}

.form-button {
  --el-button-hover-text-color: inherit;
  --el-button-hover-border-color: black;
  width: 100%;
  padding: 1.25rem 0;
  border: 0;
}

.form-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.label-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

@media screen and (min-width: 700px) {
  .el-form {
    grid-template-columns: 1fr 1fr;
  }

  .form-buttons {
    flex-direction: row;
    justify-content: flex-end;
  }

  .label-buttons {
    flex-direction: row;
  }
}
</style>
