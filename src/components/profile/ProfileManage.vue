<script setup lang="ts">
import ProfileContentLayout from '@/layouts/ProfileContentLayout.vue'
import { RouterLink, useRouter } from 'vue-router'
import AddressProfileContent from '../address/AddressProfileContent.vue'
import RecentOrdersTable from '../orders/OrdersRecentTable.vue'
import { useAuthStore } from '@/stores/AuthStore'
import { useUserStore } from '@/stores/UserStore'
import { hideEmail } from '@/lib/helpers'
import { BookUser } from 'lucide-vue-next'
import { useOrderStore } from '@/stores/OrderStore'

const authStore = useAuthStore()
const userStore = useUserStore()
const orderStore = useOrderStore()
const router = useRouter()

const user = userStore.getUserById(authStore.user as string)
const defaultShippingAddress = userStore.getUserDefaultShippingAddressById(authStore.user as string)
const defaultBillingAddress = userStore.getUserDefaultBillingAddressById(authStore.user as string)

const orders = orderStore.getRecentOrders
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
              <RouterLink :to="{ name: 'editprofile' }">EDIT</RouterLink>
            </div>
          </template>
          <div class="profile-content">
            <p class="user-name">{{ user!.fullName }}</p>
            <p class="user-email">{{ hideEmail(user!.email) }}</p>
            <div class="preferences">
              <el-checkbox v-model="user!.receiveMarketingSMS" disabled>
                Receive marketing SMS
              </el-checkbox>
              <el-checkbox v-model="user!.receiveMarketingEmails" disabled>
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
              <RouterLink :to="{ name: 'address' }"> EDIT</RouterLink>
            </div>
          </template>
          <div class="address-container">
            <template v-if="user!.addresses.length !== 0">
              <!-- Default shipping address -->
              <AddressProfileContent
                v-if="defaultShippingAddress"
                :address="defaultShippingAddress"
                label="default shipping address"
                type="shipping"
              />

              <!-- Default billing address -->
              <AddressProfileContent
                v-if="defaultBillingAddress"
                :address="defaultBillingAddress"
                label="default billing address"
                type="billing"
              />
            </template>
            <template v-else>
              <div class="empty-address">
                <div class="empty-address-content">
                  <BookUser :size="36" />
                  <p>
                    You have no addresses yet. Add one to manage your shipping and billing details.
                  </p>
                </div>
                <el-button
                  type="primary"
                  class="add-address-button"
                  @click="router.push({ name: 'address' })"
                >
                  ADD ADDRESS</el-button
                >
              </div>
            </template>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- Recent Orders Section -->
    <template v-if="orderStore.getOrdersByUserId(user!._id).length > 0">
      <el-card class="orders-card">
        <template #header>
          <div class="card-header">
            <span>Recent Orders</span>
          </div>
        </template>

        <RecentOrdersTable :orders />
      </el-card>
    </template>
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

.empty-address {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.empty-address-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
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
