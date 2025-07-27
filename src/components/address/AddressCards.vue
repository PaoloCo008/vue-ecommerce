<script setup lang="ts">
import { LocationFilled, Phone } from '@element-plus/icons-vue'
import AppAddressTag from '../app/AppAddressTag.vue'
import type { Address } from '@/lib/types/globals'
import { buildAddressLine } from '@/lib/helpers'
import { useRouter } from 'vue-router'

defineProps<{ addresses: Address[]; selecting?: boolean }>()

const router = useRouter()

const selectedAddressId = defineModel()
</script>

<template>
  <div class="address-cards">
    <el-card
      v-for="address in addresses"
      :key="address.address"
      class="address-card"
      shadow="hover"
    >
      <template #header>
        <div class="card-header">
          <span class="name"
            ><el-radio
              v-if="selecting"
              v-model="selectedAddressId"
              class="opaque"
              :value="address._id"
            />{{ address.fullName }}</span
          >
          <div class="card-actions">
            <AppAddressTag v-if="address.deliveryLabel === 'home'" label="home" />
            <AppAddressTag v-else label="office" />
            <el-button
              link
              type="primary"
              @click="router.push({ name: 'address-edit', params: { id: address._id } })"
              class="edit-button"
            >
              EDIT
            </el-button>
          </div>
        </div>
      </template>

      <div class="address-content">
        <div class="address-section">
          <el-icon class="section-icon"><LocationFilled /></el-icon>
          <div class="section-content">
            <p class="address-text">{{ address.unitNumber }}{{ address.address }}</p>
            <p class="postcode">
              {{
                buildAddressLine({
                  province: address.province,
                  district: address.district,
                  ward: address.ward,
                })
              }}
            </p>
          </div>
        </div>

        <div class="address-section">
          <el-icon class="section-icon"><Phone /></el-icon>
          <div class="section-content">
            <p class="phone-text">{{ address.mobileNumber }}</p>
          </div>
        </div>

        <div class="address-actions">
          <el-tag v-if="address.isDefaultShipping" size="small"> Default Shipping Address </el-tag>
          <el-tag v-if="address.isDefaultBilling" size="small"> Default Billing Address </el-tag>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.address-cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.address-card {
  max-width: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.card-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.name {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.address-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.address-section {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.section-icon {
  margin-top: 2px;
  color: #909399;
  font-size: 16px;
}

.section-content {
  flex: 1;
}

.address-text {
  margin: 0;
  font-size: 14px;
  color: #606266;
  line-height: 1.4;
}

.postcode {
  margin: 4px 0 0 0;
  font-size: 13px;
  color: #909399;
  line-height: 1.4;
}

.phone-text {
  margin: 0;
  font-size: 14px;
  color: #606266;
  font-weight: 500;
}

.address-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
}

/* Responsive design */
@media (max-width: 768px) {
  /* .address-actions {
    flex-direction: column;
  } */
}
</style>
