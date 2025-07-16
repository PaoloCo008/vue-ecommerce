<script setup lang="ts">
import { LocationFilled, Phone } from '@element-plus/icons-vue'
import AppAddressTag from '../app/AppAddressTag.vue'
import { ref, watch } from 'vue'

// Define props to receive address data
const props = defineProps<{ addressData?: object; selecting?: boolean }>()

const addressData = {
  id: 1,
  fullName: 'Paolo Co',
  address: '38 Silver Road',
  postcode: 'Metro Manila - Las Pinas - Las Pinas City - Pilar',
  phoneNumber: '09178777471',
  isHome: false,
  isDefaultShipping: true,
  isDefaultBilling: false,
}

const row = ref(null)

watch(row, () => {
  console.log(row.value)
})
</script>

<template>
  <el-card class="address-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <span class="name"
          ><el-radio
            v-if="selecting"
            v-model="row"
            class="opaque"
            name="row"
            :value="addressData.id"
          />{{ addressData.fullName }}</span
        >
        <AppAddressTag v-if="addressData.isHome" label="home" />
        <AppAddressTag v-else label="office" />
      </div>
    </template>

    <div class="address-content">
      <div class="address-section">
        <el-icon class="section-icon"><LocationFilled /></el-icon>
        <div class="section-content">
          <p class="address-text">{{ addressData.address }}</p>
          <p class="postcode">{{ addressData.postcode }}</p>
        </div>
      </div>

      <div class="address-section">
        <el-icon class="section-icon"><Phone /></el-icon>
        <div class="section-content">
          <p class="phone-text">{{ addressData.phoneNumber }}</p>
        </div>
      </div>

      <div class="address-actions">
        <el-button v-if="addressData.isDefaultShipping" type="primary" size="small" plain>
          Default Shipping
        </el-button>
        <el-button v-if="addressData.isDefaultBilling" type="warning" size="small" plain>
          Default Billing
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.address-card {
  max-width: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
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
