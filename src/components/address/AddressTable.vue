<script lang="ts" setup>
import { ref } from 'vue'

const addresses = ref([
  {
    id: 1,
    fullName: 'Paolo Henry Oliva Co',
    address: '38 Silver Road Barangay Pilar, Las Pinas City',
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
  <el-table
    :data="addresses"
    style="width: 100%"
    class="custom-table"
    :row-style="{ height: '100x' }"
    :cell-style="{ height: '100px' }"
    :show-overflow-tooltip="true"
  >
    <el-table-column prop="fullName" label="Full Name" width="135">
      <template #default="scope">
        <div class="name-cell">{{ scope.row.fullName }}</div>
      </template>
    </el-table-column>

    <el-table-column prop="address" label="Address" width="185">
      <template #default="scope">
        <div class="address-cell">
          <el-tag v-if="scope.row.isHome" size="small" class="home-tag"> HOME </el-tag>
          <span class="address-text">{{ scope.row.address }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column prop="postcode" label="Postcode" width="185">
      <template #default="scope">
        <div class="postcode-cell">{{ scope.row.postcode }}</div>
      </template>
    </el-table-column>

    <el-table-column prop="phoneNumber" label="Phone Number" width="125">
      <template #default="scope">
        <div class="phone-cell">{{ scope.row.phoneNumber }}</div>
      </template>
    </el-table-column>

    <el-table-column label="" width="180">
      <template #default="scope">
        <div class="status-cell">
          <div class="status-labels">
            <el-tag v-if="scope.row.isDefaultShipping" size="small">
              Default Shipping Address
            </el-tag>
            <el-tag v-if="scope.row.isDefaultBilling" size="small">
              Default Billing Address
            </el-tag>
          </div>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="" fixed="right" min-width="70">
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

.status-labels {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
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
