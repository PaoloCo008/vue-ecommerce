<script setup lang="ts">
import AppDrawer from '../app/AppDrawer.vue'
import CardAddForm from './CardAddForm.vue'
</script>

<template>
  <AppDrawer>
    <template #trigger="props">
      <el-button type="text" class="add-card-button" @click="props.handleOpenDrawer">
        <span class="add-icon">+</span>
        Add Card
      </el-button>
    </template>

    <template #default="props">
      <CardAddForm opened-from="payment-options" @cancel="props.handleCloseDrawer" />
    </template>
  </AppDrawer>
</template>

<style scoped>
.add-icon {
  margin-right: 8px;
  font-size: 16px;
  font-weight: bold;
}

.add-card-button {
  color: #409eff !important;
  font-size: 14px;
  padding: 8px 0 !important;
}

.add-card-button:hover {
  color: #337ecc !important;
}
</style>
