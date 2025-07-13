<template>
  <div class="add-new-address">
    <h1 class="page-title">Add New Address</h1>
    
    <el-form :model="form" label-position="top" class="address-form">
      <!-- Row 1 -->
      <el-row :gutter="40">
        <el-col :span="12">
          <el-form-item label="Full Name">
            <el-input 
              v-model="form.fullName" 
              placeholder="First Last"
              class="form-input"
            />
          </el-form-item>
        </el-col>
        
        <el-col :span="12">
          <el-form-item label="Province">
            <el-select 
              v-model="form.province" 
              placeholder="Please choose your province"
              class="form-input"
            >
              <el-option 
                v-for="province in provinces" 
                :key="province.value" 
                :label="province.label" 
                :value="province.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- Row 2 -->
      <el-row :gutter="40">
        <el-col :span="12">
          <el-form-item label="Mobile Number">
            <el-input 
              v-model="form.mobileNumber" 
              placeholder="Please enter your phone number"
              class="form-input"
            />
          </el-form-item>
        </el-col>
        
        <el-col :span="12">
          <el-form-item label="District">
            <el-select 
              v-model="form.district" 
              placeholder="Please choose your district"
              class="form-input"
            >
              <el-option 
                v-for="district in districts" 
                :key="district.value" 
                :label="district.label" 
                :value="district.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- Row 3 -->
      <el-row :gutter="40">
        <el-col :span="12">
          <el-form-item label="Address">
            <el-input 
              v-model="form.address" 
              placeholder="Please enter your address"
              class="form-input"
            />
          </el-form-item>
        </el-col>
        
        <el-col :span="12">
          <el-form-item label="Ward">
            <el-select 
              v-model="form.ward" 
              placeholder="Please choose your ward"
              class="form-input"
            >
              <el-option 
                v-for="ward in wards" 
                :key="ward.value" 
                :label="ward.label" 
                :value="ward.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- Row 4 -->
      <el-row :gutter="40">
        <el-col :span="12">
          <el-form-item label="Floor/Unit Number">
            <el-input 
              v-model="form.floorUnit" 
              placeholder="Please enter your floor/unit number"
              class="form-input"
            />
          </el-form-item>
        </el-col>
        
        <el-col :span="12">
          <el-form-item label="Select a label for effective delivery:">
            <div class="label-selection">
              <el-button 
                :class="['label-button', { 'active': form.deliveryLabel === 'office' }]"
                @click="selectLabel('office')"
              >
                <el-icon><OfficeBuilding /></el-icon>
                OFFICE
              </el-button>
              <el-button 
                :class="['label-button', { 'active': form.deliveryLabel === 'home' }]"
                @click="selectLabel('home')"
              >
                <el-icon><House /></el-icon>
                HOME
              </el-button>
            </div>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- Action Buttons -->
      <el-row>
        <el-col :span="24">
          <div class="action-buttons">
            <el-button 
              class="cancel-button"
              @click="cancel"
            >
              Cancel
            </el-button>
            <el-button 
              type="primary" 
              class="save-button"
              @click="save"
            >
              SAVE
            </el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { OfficeBuilding, House } from '@element-plus/icons-vue'

export default {
  name: 'AddNewAddress',
  components: {
    OfficeBuilding,
    House
  },
  setup() {
    const form = ref({
      fullName: '',
      province: '',
      mobileNumber: '',
      district: '',
      address: '',
      ward: '',
      floorUnit: '',
      deliveryLabel: 'office'
    })

    const provinces = ref([
      { value: 'metro-manila', label: 'Metro Manila' },
      { value: 'cebu', label: 'Cebu' },
      { value: 'davao', label: 'Davao' },
      { value: 'laguna', label: 'Laguna' },
      { value: 'bulacan', label: 'Bulacan' }
    ])

    const districts = ref([
      { value: 'quezon-city', label: 'Quezon City' },
      { value: 'manila', label: 'Manila' },
      { value: 'makati', label: 'Makati' },
      { value: 'taguig', label: 'Taguig' },
      { value: 'pasig', label: 'Pasig' }
    ])

    const wards = ref([
      { value: 'barangay-1', label: 'Barangay 1' },
      { value: 'barangay-2', label: 'Barangay 2' },
      { value: 'barangay-3', label: 'Barangay 3' },
      { value: 'barangay-4', label: 'Barangay 4' },
      { value: 'barangay-5', label: 'Barangay 5' }
    ])

    const selectLabel = (label) => {
      form.value.deliveryLabel = label
    }

    const cancel = () => {
      console.log('Cancel clicked')
    }

    const save = () => {
      console.log('Save clicked', form.value)
    }

    return {
      form,
      provinces,
      districts,
      wards,
      selectLabel,
      cancel,
      save
    }
  }
}
</script>

<style scoped>
.add-new-address {
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 30px;
}

.address-form {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-input {
  width: 100%;
}

.label-selection {
  display: flex;
  gap: 12px;
}

.label-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: 2px solid #ddd;
  background-color: white;
  color: #666;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.label-button:hover {
  border-color: #20b2aa;
  color: #20b2aa;
}

.label-button.active {
  border-color: #20b2aa;
  color: #20b2aa;
  background-color: #f0f9ff;
}

.label-button.active:first-child {
  border-color: #20b2aa;
}

.label-button.active:last-child {
  border-color: #ff6b35;
  color: #ff6b35;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 30px;
}

.cancel-button {
  background-color: #e0e0e0;
  border-color: #e0e0e0;
  color: #666;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 500;
}

.cancel-button:hover {
  background-color: #d0d0d0;
  border-color: #d0d0d0;
}

.save-button {
  background-color: #ff6b35;
  border-color: #ff6b35;
  color: white;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
}

.save-button:hover {
  background-color: #e55a2b;
  border-color: #e55a2b;
}

:deep(.el-form-item__label) {
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  padding-bottom: 0;
  font-size: 14px;
}

:deep(.el-input__inner) {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 12px;
  font-size: 14px;
  color: #333;
}

:deep(.el-input__inner::placeholder) {
  color: #999;
}

:deep(.el-select .el-input__inner) {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 12px;
  font-size: 14px;
}

:deep(.el-form-item) {
  margin-bottom: 24px;
}

:deep(.el-select__caret) {
  color: #999;
}

:deep(.el-input:focus-within .el-input__inner) {
  border-color: #20b2aa;
}

:deep(.el-select:focus-within .el-input__inner) {
  border-color: #20b2aa;
}
</style>