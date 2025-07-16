<script setup lang="ts">
import ProfileContentLayout from '@/layouts/ProfileContentLayout.vue'
import { RouterLink } from 'vue-router'
import AddressProfileContent from '../address/AddressProfileContent.vue'
import RecentOrdersTable from '../orders/OrdersRecentTable.vue'
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
              <RouterLink :to="{ name: 'editprofile', params: { id: 1 } }">EDIT</RouterLink>
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
              <RouterLink :to="{ name: 'address', params: { id: 1 } }"> EDIT</RouterLink>
            </div>
          </template>
          <div class="address-container">
            <!-- Default shipping address -->
            <AddressProfileContent label="default shipping address" />

            <!-- Default billing address -->
            <AddressProfileContent label="default billing address" />
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

      <RecentOrdersTable />
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

.address-container {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
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
