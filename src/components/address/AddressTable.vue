<script lang="ts" setup>
import { ref } from 'vue'

const addresses = ref([
  {
    id: 1,
    fullName: 'Paolo Co',
    address: '38 Silver Road',
    postcode: 'Metro Manila - Las Pinas - Las Pinas City - Pilar',
    phoneNumber: '09178777471',
    isHome: true,
    isDefaultShipping: true,
    isDefaultBilling: true,
  },
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
</script>

<template>
  <el-table :data="addresses" style="width: 100%" class="custom-table">
    <el-table-column prop="fullName" label="Full Name" width="145">
      <template #default="scope">
        <div class="name-cell">{{ scope.row.fullName }}</div>
      </template>
    </el-table-column>

    <el-table-column prop="address" label="Address" width="145">
      <template #default="scope">
        <div class="address-cell">
          <el-tag v-if="scope.row.isHome" size="small" class="home-tag"> HOME </el-tag>
          <span class="address-text">{{ scope.row.address }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column prop="postcode" label="Postcode" width="145">
      <template #default="scope">
        <div class="postcode-cell">{{ scope.row.postcode }}</div>
      </template>
    </el-table-column>

    <el-table-column prop="phoneNumber" label="Phone Number" width="145">
      <template #default="scope">
        <div class="phone-cell">{{ scope.row.phoneNumber }}</div>
      </template>
    </el-table-column>

    <el-table-column label="" max-width="145">
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

    <el-table-column label="" fixed="right" width="70">
      <template #default="scope">
        <el-button link type="primary" @click="editAddress(scope.row)" class="edit-button">
          EDIT
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>
.custom-table {
  border: 1px solid #e0e0e0;
}

.name-cell {
  font-weight: 500;
  color: #333;
}

.status-label {
  display: block;
}

.address-cell {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}
</style>
