<template>
  <div class="address-book">
    <!-- Header -->
    <div class="address-book-header">
      <h1 class="page-title">Address Book</h1>
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

    <!-- Address Table -->
    <div class="address-table">
      <el-table :data="addresses" style="width: 100%" class="custom-table">
        <el-table-column prop="fullName" label="Full Name" width="120">
          <template #default="scope">
            <div class="name-cell">{{ scope.row.fullName }}</div>
          </template>
        </el-table-column>

        <el-table-column prop="address" label="Address" width="280">
          <template #default="scope">
            <div class="address-cell">
              <el-tag v-if="scope.row.isHome" size="small" class="home-tag">
                HOME
              </el-tag>
              <span class="address-text">{{ scope.row.address }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="postcode" label="Postcode" width="200">
          <template #default="scope">
            <div class="postcode-cell">{{ scope.row.postcode }}</div>
          </template>
        </el-table-column>

        <el-table-column prop="phoneNumber" label="Phone Number" width="140">
          <template #default="scope">
            <div class="phone-cell">{{ scope.row.phoneNumber }}</div>
          </template>
        </el-table-column>

        <el-table-column label="" width="200">
          <template #default="scope">
            <div class="status-cell">
              <div class="status-labels">
                <span v-if="scope.row.isDefaultShipping" class="status-label">
                  Default Shipping Address
                </span>
                <span v-if="scope.row.isDefaultBilling" class="status-label">
                  Default Billing Address
                </span>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="" width="80">
          <template #default="scope">
            <el-button 
              link 
              type="primary" 
              @click="editAddress(scope.row)"
              class="edit-button"
            >
              EDIT
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- Add New Address Button -->
    <div class="add-address-container">
      <el-button 
        type="primary" 
        class="add-address-button"
        @click="addNewAddress"
      >
        + ADD NEW ADDRESS
      </el-button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'AddressBook',
  setup() {
    const addresses = ref([
      {
        id: 1,
        fullName: 'Paolo Co',
        address: '38 Silver Road',
        postcode: 'Metro Manila - Las Pinas - Las Pinas City - Pilar',
        phoneNumber: '09178777471',
        isHome: true,
        isDefaultShipping: true,
        isDefaultBilling: true
      }
    ])

    const makeDefaultShipping = () => {
      console.log('Make default shipping address clicked')
    }

    const makeDefaultBilling = () => {
      console.log('Make default billing address clicked')
    }

    const editAddress = (address) => {
      console.log('Edit address clicked:', address)
    }

    const addNewAddress = () => {
      console.log('Add new address clicked')
    }

    return {
      addresses,
      makeDefaultShipping,
      makeDefaultBilling,
      editAddress,
      addNewAddress
    }
  }
}
</script>

<style scoped>
.address-book {
  padding: 20px;
  background-color: #fff;
}

.address-book-header {
  display: flex;
  justify-content: space-between;
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
  align-items: center;
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
  color: #ccc;
  margin: 0 4px;
}

.address-table {
  margin-bottom: 30px;
}

.custom-table {
  border: 1px solid #e0e0e0;
}

.name-cell {
  font-weight: 500;
  color: #333;
}

.address-cell {
  display: flex;
  align-items: center;
  gap: 8px;
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
</style>