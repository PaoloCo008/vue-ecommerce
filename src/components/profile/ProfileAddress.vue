<script setup lang="ts">
import ProfileContentLayout from '@/layouts/ProfileContentLayout.vue'

import AddressCard from '../address/AddressCard.vue'
import AddressTable from '../address/AddressTable.vue'
</script>

<template>
  <ProfileContentLayout page-title="Address Book">
    <div class="address-book">
      <!-- Header -->
      <div class="address-book-header">
        <div class="header-actions">
          <el-button link type="primary" @click="makeDefaultShipping" class="action-link">
            Make default shipping address
          </el-button>
          <span class="separator">|</span>
          <el-button link type="primary" @click="makeDefaultBilling" class="action-link">
            Make default billing address
          </el-button>
        </div>
      </div>

      <!-- AddressCard -->
      <AddressCard />
      <!-- Address Table -->
      <AddressTable />

      <!-- Add New Address Button -->
      <div class="add-address-container">
        <el-button type="primary" class="add-address-button" @click="addNewAddress">
          + ADD NEW ADDRESS
        </el-button>
      </div>
    </div>
  </ProfileContentLayout>
</template>

<style scoped>
.address-book {
  padding: 20px;
  background-color: #fff;
}

.address-book-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 30px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.header-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.action-link {
  font-size: 14px;
  padding: 0;
  color: #20b2aa;
  text-decoration: none;
}

.action-link:hover {
  color: #1a9d96;
}

.separator {
  display: none;
}

.home-tag {
  background-color: #ff6b35;
  color: white;
  border: none;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 3px;
}

.address-text {
  color: #333;
  font-size: 14px;
}

.postcode-cell {
  color: #666;
  font-size: 14px;
}

.phone-cell {
  color: #333;
  font-size: 14px;
}

.status-cell {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.status-labels {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.status-label {
  font-size: 12px;
  color: #666;
  background-color: #f5f5f5;
  padding: 2px 6px;
  border-radius: 3px;
}

.edit-button {
  font-size: 14px;
  font-weight: 600;
  color: #20b2aa;
  padding: 0;
}

.edit-button:hover {
  color: #1a9d96;
}

.add-address-container {
  display: flex;
  justify-content: flex-end;
}

.add-address-button {
  background-color: #20b2aa;
  border-color: #20b2aa;
  color: white;
  font-weight: 600;
  padding: 12px 24px;
  font-size: 14px;
  border-radius: 4px;
}

.add-address-button:hover {
  background-color: #1a9d96;
  border-color: #1a9d96;
}

:deep(.el-table__header-wrapper) {
  background-color: #f8f9fa;
}

:deep(.el-table th) {
  background-color: #f8f9fa;
  color: #666;
  font-weight: 600;
  font-size: 14px;
  padding: 12px 0;
}

:deep(.el-table td) {
  padding: 16px 0;
  border-bottom: 1px solid #e0e0e0;
}

:deep(.el-table__body tr:hover > td) {
  background-color: #f8f9fa;
}

:deep(.el-table--border) {
  border: 1px solid #e0e0e0;
}

:deep(.el-table--border th) {
  border-right: 1px solid #e0e0e0;
}

:deep(.el-table--border td) {
  border-right: 1px solid #e0e0e0;
}

@media screen and (min-width: 495px) {
  .separator {
    display: block;
    color: #ccc;
  }

  .header-actions {
    flex-direction: row;
  }
}
</style>
