<template>
  <div class="account-management">
    <el-container>
      <!-- Sidebar -->
      <el-aside width="240px" class="sidebar">
        <div class="user-greeting">
          <span>Hello, ...</span>
          <el-tag type="success" size="small" class="verified-tag">
            <el-icon><Check /></el-icon>
            Verified Account
          </el-tag>
        </div>
        
        <el-menu
          default-active="manage-account"
          class="sidebar-menu"
          @select="handleMenuSelect"
        >
          <el-menu-item index="manage-account" class="menu-title">
            <span>Manage My Account</span>
          </el-menu-item>
          <el-menu-item index="my-profile" class="sub-menu">
            <span>My Profile</span>
          </el-menu-item>
          <el-menu-item index="address-book" class="sub-menu">
            <span>Address Book</span>
          </el-menu-item>
          <el-menu-item index="payment-options" class="sub-menu">
            <span>My Payment Options</span>
          </el-menu-item>
          <el-menu-item index="lazada-wallet" class="sub-menu">
            <span>Lazada Wallet</span>
          </el-menu-item>
          
          <el-menu-item index="my-orders" class="menu-title">
            <span>My Orders</span>
          </el-menu-item>
          <el-menu-item index="my-returns" class="sub-menu">
            <span>My Returns</span>
          </el-menu-item>
          <el-menu-item index="my-cancellations" class="sub-menu">
            <span>My Cancellations</span>
          </el-menu-item>
          
          <el-menu-item index="my-reviews" class="menu-title">
            <span>My Reviews</span>
          </el-menu-item>
          
          <el-menu-item index="wishlist" class="menu-title">
            <span>My Wishlist & Followed Stores</span>
          </el-menu-item>
          
          <el-menu-item index="sell-on-lazada" class="menu-title">
            <span>Sell On Lazada</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- Main Content -->
      <el-main class="main-content">
        <h1 class="page-title">Manage My Account</h1>
        
        <el-row :gutter="20">
          <!-- Personal Profile Card -->
          <el-col :span="12">
            <el-card class="profile-card">
              <template #header>
                <div class="card-header">
                  <span>Personal Profile</span>
                  <el-button link type="primary" @click="editProfile">EDIT</el-button>
                </div>
              </template>
              <div class="profile-content">
                <p class="user-name">Isabella Vega Aguinaldo</p>
                <p class="user-email">be*********@yahoo.com</p>
                <div class="preferences">
                  <el-checkbox v-model="marketingSMS" disabled>
                    Receive marketing SMS
                  </el-checkbox>
                  <el-checkbox v-model="marketingEmails" disabled>
                    Receive marketing emails
                  </el-checkbox>
                </div>
              </div>
            </el-card>
          </el-col>

          <!-- Address Book Card -->
          <el-col :span="12">
            <el-card class="address-card">
              <template #header>
                <div class="card-header">
                  <span>Address Book</span>
                  <el-button link type="primary" @click="editAddress">EDIT</el-button>
                </div>
              </template>
              <div class="address-content">
                <p class="address-label">DEFAULT BILLING ADDRESS</p>
                <div class="address-details">
                  <p class="recipient-name">Isabella Aguinaldo</p>
                  <p class="address-line">26 Mabini St. Purok 2</p>
                  <p class="address-line">Bulacan - Malolos - Mojon</p>
                  <p class="phone">(+63) 09229115407</p>
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
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { ref } from 'vue'
import { Check } from '@element-plus/icons-vue'

export default {
  name: 'AccountManagement',
  components: {
    Check
  },
  setup() {
    const marketingSMS = ref(false)
    const marketingEmails = ref(false)
    
    const recentOrders = ref([
      {
        orderNumber: '988874320377448',
        placedOn: '06/04/2025',
        items: [
          { image: '/api/placeholder/40/40', name: 'Product 1' },
          { image: '/api/placeholder/40/40', name: 'Product 2' },
          { image: '/api/placeholder/40/40', name: 'Product 3' },
          { image: '/api/placeholder/40/40', name: 'Product 4' }
        ],
        additionalItems: 2,
        total: '₱199.50'
      },
      {
        orderNumber: '942742676177448',
        placedOn: '23/12/2024',
        items: [
          { image: '/api/placeholder/40/40', name: 'Product 1' },
          { image: '/api/placeholder/40/40', name: 'Product 2' }
        ],
        additionalItems: null,
        total: '₱171.00'
      },
      {
        orderNumber: '933469465677448',
        placedOn: '07/12/2024',
        items: [
          { image: '/api/placeholder/40/40', name: 'Product 1' }
        ],
        additionalItems: null,
        total: '₱1,054.00'
      }
    ])

    const handleMenuSelect = (index) => {
      console.log('Menu selected:', index)
    }

    const editProfile = () => {
      console.log('Edit profile clicked')
    }

    const editAddress = () => {
      console.log('Edit address clicked')
    }

    const manageOrder = () => {
      console.log('Manage order clicked')
    }

    return {
      marketingSMS,
      marketingEmails,
      recentOrders,
      handleMenuSelect,
      editProfile,
      editAddress,
      manageOrder
    }
  }
}
</script>

<style scoped>
.account-management {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.sidebar {
  background-color: #fff;
  padding: 20px 0;
  border-right: 1px solid #e0e0e0;
}

.user-greeting {
  padding: 0 20px 20px 20px;
  color: #666;
}

.verified-tag {
  display: block;
  margin-top: 8px;
  width: fit-content;
}

.sidebar-menu {
  border: none;
}

.menu-title {
  font-weight: 600;
  color: #333;
}

.sub-menu {
  font-size: 14px;
  color: #666;
  padding-left: 40px !important;
}

.main-content {
  padding: 30px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 30px;
}

.profile-card, .address-card, .orders-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
}

.profile-content {
  padding: 10px 0;
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

.address-line, .phone {
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

:deep(.el-menu-item) {
  height: 40px;
  line-height: 40px;
}

:deep(.el-menu-item.is-active) {
  color: #20b2aa;
  background-color: #f0f9ff;
}

:deep(.el-card__header) {
  background-color: #fafafa;
  border-bottom: 1px solid #e0e0e0;
}
</style>