<script lang="ts" setup>
import { useRouter } from 'vue-router'
import AppAddressTag from '../app/AppAddressTag.vue'
import { buildAddressLine, formatPhilippinePhone } from '@/lib/helpers'
import type { Address } from '@/lib/types/globals'

defineProps<{ addresses: Address[]; selecting?: boolean }>()

const router = useRouter()

const selectedAddressId = defineModel()
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
          <AppAddressTag v-if="scope.row.deliveryLabel === 'home'" label="home" />
          <AppAddressTag v-else label="office" />
          <span class="address-text">{{ scope.row.unitNumber }} {{ scope.row.address }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="Postcode" width="185">
      <template #default="scope">
        <div class="postcode-cell">
          {{
            buildAddressLine({
              province: scope.row.province,
              district: scope.row.district,
              ward: scope.row.ward,
            })
          }}
        </div>
      </template>
    </el-table-column>

    <el-table-column prop="mobileNumber" label="Phone Number" width="125">
      <template #default="scope">
        <div class="phone-cell">{{ formatPhilippinePhone(scope.row.mobileNumber) }}</div>
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
        <el-radio
          v-if="selecting"
          v-model="selectedAddressId"
          class="opaque"
          :value="scope.row._id"
        />
        <el-button
          v-else
          link
          type="primary"
          @click="router.push({ name: 'address-edit', params: { id: scope.row._id } })"
          class="edit-button"
        >
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
  flex-direction: row;
  align-items: flex-start;
  gap: 8px;
}
</style>
