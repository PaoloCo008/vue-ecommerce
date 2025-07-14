<script setup lang="ts">
import type { NewAddressForm } from '@/lib/types/forms'
import type { FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'

const newAddressFormRef = ref<FormInstance>()
const newAddressForm = reactive<NewAddressForm>({
  fullName: '',
  address: '',
  mobileNumber: null,
  unitNumber: '',
  province: '',
  district: '',
  ward: '',
  deliveryLabel: null,
})
</script>

<template>
  <el-form ref="newAddressFormRef" :model="newAddressForm" label-width="auto">
    <div>
      <el-form-item label="Full Name" prop="name" label-position="top">
        <el-input v-model="newAddressForm.fullName" placeholder="First Last" />
      </el-form-item>

      <el-form-item label="Mobile Number" prop="name" label-position="top">
        <el-input
          v-model="newAddressForm.mobileNumber"
          placeholder="Please enter your phone number"
        />
      </el-form-item>

      <el-form-item label="Address" prop="name" label-position="top">
        <el-input v-model="newAddressForm.address" placeholder="Please enter your address" />
      </el-form-item>

      <el-form-item label="Floor/Unit Number" prop="name" label-position="top">
        <el-input
          v-model="newAddressForm.unitNumber"
          placeholder="Please enter your floor/unit number"
        />
      </el-form-item>
    </div>

    <div>
      <el-form-item label="Province" prop="name" label-position="top">
        <el-input v-model="newAddressForm.province" placeholder="Please choose your province" />
      </el-form-item>

      <el-form-item label="District" prop="name" label-position="top">
        <el-input v-model="newAddressForm.district" placeholder="Please choose your district" />
      </el-form-item>

      <el-form-item label="Ward" prop="name" label-position="top">
        <el-input v-model="newAddressForm.ward" placeholder="Please choose your ward" />
      </el-form-item>

      <el-form-item label="Select a label for effective delivery:" prop="name" label-position="top">
        <el-button class="office button-label"
          ><el-icon
            :style="[
              newAddressForm.deliveryLabel === 'office' ? 'color: var(--color-tertiary)' : '',
            ]"
            ><Briefcase /></el-icon
          ><span> office </span>
        </el-button>
        <el-button class="home button-label"
          ><el-icon
            :style="[newAddressForm.deliveryLabel === 'home' ? 'color: var(--color-main)' : '']"
            ><HomeFilled /></el-icon
          ><span> home </span></el-button
        >
      </el-form-item>

      <div>
        <el-button class="form-button cancel">cancel</el-button>
        <el-button class="form-button save">save</el-button>
      </div>
    </div>
  </el-form>
</template>

<style scoped>
.el-form {
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.el-form-item {
  margin-bottom: 2rem;
}

.el-input {
  --el-input__wrapper-border-color: var(--color-background);
  --el-input-focus-border-color: var(--el-border-color-hover);
}

.el-button {
  --el-button-outline-color: var(--color-main-opaque);
}

:deep(.el-input__wrapper) {
  padding: 0.875rem 0.75rem;
}

.button-label {
  --el-button-hover-text-color: none;
  padding: 1.5rem 1.25rem;
  text-transform: uppercase;
  width: 120px;
}

.office {
  --el-button-border-color: var(--color-tertiary);
}

.home {
  --el-button-border-color: var(--color-main);
  --el-button-bg-color: var(--color-main-transparent);
  box-shadow: 0 0 5px 1px var(--color-main-transparent);
  --el-button-hover-bg-color: var(--color-main-transparent);
  --el-button-hover-border-color: var(--color-main);
}

.form-button {
  --el-button-hover-text-color: inherit;
  --el-button-hover-border-color: black;
  width: 175px;
  padding: 1.25rem 0;
  border: 0;
}

.cancel {
  --el-button-bg-color: var(--color-background);
  --el-button-text-color: var(--color-text);
  --el-button-hover-bg-color: var(--color-background);
  --el-button-hover-border-color: var(--color-text);
  text-transform: capitalize;
}

.save {
  --el-button-bg-color: var(--color-main);
  --el-button-text-color: #fff;
  --el-button-border-color: var(--color-main-opaque);
  --el-button-hover-text-color: #fff;
  --el-button-hover-border-color: var(--color-main);
  --el-button-hover-bg-color: var(--color-main);
  text-transform: uppercase;
}
</style>
