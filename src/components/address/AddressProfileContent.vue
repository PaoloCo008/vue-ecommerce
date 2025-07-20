<script lang="ts" setup>
import { buildAddressLine } from '@/lib/helpers'
import type { Address } from '@/lib/types/globals'

defineProps<{ label: string; address: Address }>()
</script>

<template>
  <div class="address-content">
    <p class="address-label">{{ label }}</p>
    <div>
      <p class="recipient-name">{{ address.fullName }}</p>
      <p class="address-line">{{ address.address }}</p>
      <p class="address-line" v-if="address.unitNumber">{{ address.unitNumber }}</p>
      <p class="address-line">
        {{
          buildAddressLine({
            province: address.province,
            district: address.district,
            ward: address.ward,
          })
        }}
      </p>
      <p class="phone">(+63) 09229115407</p>
    </div>
  </div>
</template>

<style>
.address-content {
  padding: 10px 0;
  width: clamp(150px, 100%, 350px);
}

.address-label {
  font-size: 12px;
  color: #999;
  font-weight: 600;
  margin: 0 0 10px 0;
  text-transform: uppercase;
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
</style>
