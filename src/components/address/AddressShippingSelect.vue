<script setup lang="ts">
import { ref, defineEmits, computed, onUpdated } from 'vue'
import { Check } from '@element-plus/icons-vue'
import AppAddressTag from '../app/AppAddressTag.vue'
import type { Address } from '@/lib/types/globals'
import { useUserStore } from '@/stores/UserStore'
import { useAuthStore } from '@/stores/AuthStore'
import { formatPhilippinePhone } from '../../lib/helpers'

const props = defineProps<{ addresses: Address[]; selectedAddressId: string | undefined }>()

const userStore = useUserStore()
const authStore = useAuthStore()

// Emits
const emit = defineEmits(['save', 'cancel'])

// Reactive data - Use ref for manual override, computed for automatic behavior
const manuallySelectedId = ref<string | undefined>(undefined)

const selectedAddressId = computed(() => {
  // If user manually selected an address, use that
  if (manuallySelectedId.value) {
    return manuallySelectedId.value
  }
  // Otherwise, automatically use default shipping address
  return props.selectedAddressId
})

// Fixed selectAddress function
const selectAddress = (id: string) => {
  manuallySelectedId.value = id
}

const handleSave = () => {
  emit('save', selectedAddressId.value)
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<template>
  <div class="shipping-address-container">
    <!-- Address List -->
    <div class="address-list" v-if="addresses.length">
      <div
        v-for="address in addresses"
        :key="address._id"
        class="address-card"
        :class="{ selected: address._id === selectedAddressId }"
        @click="selectAddress(address._id)"
      >
        <!-- Address Content -->
        <div class="address-content">
          <!-- Contact Info -->
          <div class="contact-info">
            <div class="name-with-radio">
              <span class="contact-name">{{ address.fullName }}</span>
              <!-- Radio Check Icon -->
              <div class="radio-check">
                <el-radio
                  v-if="address._id !== selectedAddressId"
                  :model-value="false"
                  :value="true"
                  size="large"
                  @click.stop="selectAddress(address._id)"
                />
                <el-icon v-if="address._id === selectedAddressId" :size="18" color="#17a2b8">
                  <Check />
                </el-icon>
              </div>
            </div>
            <span class="phone">{{ formatPhilippinePhone(address.mobileNumber) }}</span>
          </div>

          <!-- Address Details -->
          <div class="address-details">
            <div class="address-line">
              <AppAddressTag v-if="address.deliveryLabel === 'home'" label="home" />
              <AppAddressTag v-else label="office" />
              <span class="street">{{ address.unitNumber }} {{ address.address }}</span>
            </div>

            <div class="location-info">
              Postcode: {{ address.province }} • {{ address.district }} • {{ address.ward }}
            </div>
          </div>

          <!-- Status Tags -->
          <div class="status-tags">
            <el-tag v-if="address.isDefaultShipping" type="info" size="small" class="status-tag">
              Default Shipping Address
            </el-tag>
            <el-tag v-if="address.isDefaultBilling" type="warning" size="small" class="status-tag">
              Default Billing Address
            </el-tag>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Add a address to continue with your checkout.</p>
    </div>

    <!-- Action Buttons -->
    <div class="action-buttons">
      <el-button size="large" class="cancel-btn" @click="handleCancel"> Cancel </el-button>
      <el-button type="primary" size="large" class="save-btn" @click="handleSave"> SAVE </el-button>
    </div>
  </div>
</template>

<style scoped>
/* Mobile-First Base Styles */
.shipping-address-container {
  padding: 0;
  display: flex;
  height: 100%;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: white;
  border-bottom: 1px solid #ebeef5;
}

.title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: #303133;
}

.address-list {
  flex: 1;
  padding: 12px 16px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.address-card {
  background: white;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  -webkit-tap-highlight-color: rgba(23, 162, 184, 0.1);
}

.address-card:active {
  transform: scale(0.98);
}

.address-card:hover {
  border-color: #17a2b8;
  box-shadow: 0 4px 12px rgba(23, 162, 184, 0.1);
}

.address-card.selected {
  border-color: #17a2b8;
  background: #f8fdff;
}

/* Radio Check Styles */
.radio-check {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.radio-circle {
  width: 18px;
  height: 18px;
  border: 2px solid #dcdfe6;
  border-radius: 50%;
  transition: all 0.2s ease;
  background: white;
}

.radio-circle:hover {
  border-color: #17a2b8;
}

.address-content {
  width: 100%;
}

.name-with-radio {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 10px;
}

.contact-name {
  font-weight: 600;
  color: #303133;
  font-size: 0.875rem;
}

.phone {
  color: #606266;
  font-size: 0.8125rem;
}

.address-details {
  margin-bottom: 12px;
}

.address-line {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
  flex-wrap: wrap;
}

.home-tag {
  flex-shrink: 0;
  font-weight: 600;
  letter-spacing: 0.5px;
  font-size: 0.625rem;
}

.street {
  color: #303133;
  font-size: 0.8125rem;
  line-height: 1.4;
  flex: 1;
}

.location-info {
  color: #909399;
  font-size: 0.75rem;
  line-height: 1.4;
}

.status-tags {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.status-tag {
  font-size: 0.6875rem;
  font-weight: 500;
  align-self: flex-start;
}

.action-buttons {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  background: white;
  border-top: 1px solid #ebeef5;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
}

.cancel-btn {
  flex: 1;
  height: 40px;
  background: #f5f7fa;
  border: 1px solid #dcdfe6;
  color: #606266;
  font-weight: 500;
  font-size: 0.8125rem;
}

.cancel-btn:hover,
.cancel-btn:focus {
  background: #ecf5ff;
  border-color: #b3d8ff;
  color: #409eff;
}

.save-btn {
  flex: 1;
  height: 40px;
  background: #17a2b8;
  border-color: #17a2b8;
  font-weight: 600;
  letter-spacing: 0.5px;
  font-size: 0.8125rem;
}

.save-btn:hover,
.save-btn:focus {
  background: #138496;
  border-color: #138496;
}

/* Small Mobile (320px+) */
@media (min-width: 320px) {
  .address-card {
    padding: 14px;
    gap: 12px;
  }

  .contact-name {
    font-size: 0.9375rem;
  }

  .phone {
    font-size: 0.8125rem;
  }

  .street {
    font-size: 0.8125rem;
  }
}

/* Large Mobile (480px+) */
@media (min-width: 480px) {
  .header {
    padding: 16px 20px;
  }

  .title {
    font-size: 0.0625rem;
  }

  .address-list {
    padding: 16px 20px;
  }

  .address-card {
    padding: 16px;
    margin-bottom: 14px;
    gap: 14px;
  }

  .contact-info {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
  }

  .name-with-radio {
    flex-direction: row-reverse;
    align-items: flex-start;
    align-items: center;
    gap: 4px;
  }

  .contact-name {
    font-size: 0.9375rem;
  }

  .phone {
    font-size: 0.8125rem;
    text-align: right;
  }

  .street {
    font-size: 0.875rem;
  }

  .location-info {
    font-size: 0.75rem;
  }

  .status-tags {
    flex-direction: row;
    gap: 6px;
  }

  .action-buttons {
    padding: 16px 20px;
    gap: 12px;
  }

  .cancel-btn,
  .save-btn {
    height: 44px;
    font-size: 0.875rem;
  }
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .header {
    padding: 18px 24px;
  }

  .title {
    font-size: 1.125rem;
  }

  .address-list {
    padding: 20px 24px;
  }

  .address-card {
    padding: 18px;
    margin-bottom: 16px;
    gap: 16px;
  }

  .radio-check {
    width: 20px;
    height: 20px;
  }

  .radio-circle {
    width: 20px;
    height: 20px;
  }

  .contact-info {
    margin-bottom: 12px;
    gap: 16px;
  }

  .contact-name {
    font-size: 1rem;
  }

  .phone {
    font-size: 0.875ren;
  }

  .address-line {
    gap: 8px;
    margin-bottom: 8px;
  }

  .street {
    font-size: 0.875rem;
  }

  .location-info {
    font-size: 0.8125rem;
  }

  .status-tags {
    gap: 8px;
  }

  .status-tag {
    font-size: 0.75rem;
  }

  .action-buttons {
    padding: 20px 24px;
    gap: 16px;
  }

  .cancel-btn,
  .save-btn {
    height: 48px;
    font-size: 0.9375rem;
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .header {
    padding: 20px 24px;
  }

  .address-list {
    padding: 24px;
  }

  .address-card {
    padding: 20px;
    margin-bottom: 18px;
  }

  .radio-check {
    width: 22px;
    height: 22px;
  }

  .radio-circle {
    width: 22px;
    height: 22px;
  }

  .contact-info {
    margin-bottom: 14px;
  }

  .address-details {
    margin-bottom: 16px;
  }

  .action-buttons {
    padding: 24px;
  }

  .cancel-btn,
  .save-btn {
    height: 52px;
    font-size: 1rem;
  }
}
</style>
