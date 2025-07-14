<script setup lang="ts">
import ProfileContentLayout from '@/layouts/ProfileContentLayout.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <ProfileContentLayout page-title="Manage My Profile">
    <el-row>
      <!-- Personal Profile Card -->
      <el-col>
        <el-card class="profile-card">
          <template #header>
            <div class="card-header">
              <span class="header-title">Personal Profile</span>
              <RouterLink :to="{ name: 'editprofile', params: { id: 1 } }" @click="editProfile"
                >EDIT</RouterLink
              >
            </div>
          </template>
          <div class="profile-content">
            <p class="user-name">Isabella Vega Aguinaldo</p>
            <p class="user-email">be*********@yahoo.com</p>
            <div class="preferences">
              <el-checkbox v-model="marketingSMS" disabled> Receive marketing SMS </el-checkbox>
              <el-checkbox v-model="marketingEmails" disabled>
                Receive marketing emails
              </el-checkbox>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row>
      <!-- Address Book Card -->
      <el-col>
        <el-card class="address-card">
          <template #header>
            <div class="card-header">
              <span class="header-title">Address Book</span>
              <RouterLink :to="{ name: 'editprofile', params: { id: 1 } }" @click="editProfile">
                EDIT</RouterLink
              >
            </div>
          </template>
          <div class="address-container">
            <div class="address-content">
              <p class="address-label">DEFAULT SHIPPING ADDRESS</p>
              <div class="address-details">
                <p class="recipient-name">Isabella Aguinaldo</p>
                <p class="address-line">26 Mabini St. Purok 2</p>
                <p class="address-line">Bulacan - Malolos - Mojon</p>
                <p class="phone">(+63) 09229115407</p>
              </div>
            </div>
            <div class="address-content">
              <p class="address-label">DEFAULT BILLING ADDRESS</p>
              <div class="address-details">
                <p class="recipient-name">Isabella Aguinaldo</p>
                <p class="address-line">26 Mabini St. Purok 2</p>
                <p class="address-line">Bulacan - Malolos - Mojon</p>
                <p class="phone">(+63) 09229115407</p>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- Recent Orders Section -->
    <el-card class="orders-card">
      <template #header>
        <div class="card-header">
          <span>Recent Orders</span>
        </div>
      </template>

      <el-table :data="recentOrders" style="width: 100%">
        <el-table-column prop="orderNumber" label="Order #" width="200" />
        <el-table-column prop="placedOn" label="Placed On" width="150" />
        <el-table-column label="Items" width="300">
          <template #default="scope">
            <div class="order-items">
              <div class="item-images">
                <img
                  v-for="(item, index) in scope.row.items"
                  :key="index"
                  :src="item.image"
                  :alt="item.name"
                  class="item-image"
                />
                <span v-if="scope.row.additionalItems" class="additional-items">
                  + {{ scope.row.additionalItems }}
                </span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="total" label="Total" width="120" />
        <el-table-column label="Action" width="100">
          <template #default>
            <el-button link type="primary" @click="manageOrder">MANAGE</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </ProfileContentLayout>
</template>

<style scoped>
a {
  padding: 0 0.25rem;
}

a:link,
a:visited {
  color: rgb(64, 158, 255);
}

a:hover,
a:active {
  color: rgba(66, 161, 255, 0.7);
}

.profile-card,
.address-card,
.orders-card {
  margin-bottom: 20px;
}

:deep(.el-card .el-card__header) {
  background-color: transparent;
}

.card-header {
  display: flex;
  gap: 0.25rem;
  font-weight: 600;
}

.header-title {
  border-right: 1px solid rgba(0, 0, 0, 0.3);
  padding-right: 0.5rem;
}

.user-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
}

.user-email {
  color: #666;
  margin: 0 0 20px 0;
}

.preferences {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.address-content {
  padding: 10px 0;
  width: clamp(150px, 100%, 200px);
}

.address-container {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.address-label {
  font-size: 12px;
  color: #999;
  font-weight: 600;
  margin: 0 0 10px 0;
}

.recipient-name {
  font-weight: 600;
  color: #333;
  margin: 0 0 4px 0;
}

.address-line,
.phone {
  color: #666;
  margin: 0 0 4px 0;
}

.order-items {
  display: flex;
  align-items: center;
}

.item-images {
  display: flex;
  align-items: center;
  gap: 4px;
}

.item-image {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  object-fit: cover;
  border: 1px solid #e0e0e0;
}

.additional-items {
  color: #666;
  font-size: 14px;
  margin-left: 8px;
}

.orders-card {
  margin-top: 30px;
}

.profile-content {
  padding: 10px 0;
}

:deep(.el-card__header) {
  background-color: #fafafa;
  border-bottom: 1px solid #e0e0e0;
}

@media (hover: hover) {
  a:hover {
    background-color: unset;
  }
}
</style>
