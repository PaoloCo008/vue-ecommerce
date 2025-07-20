<script setup lang="ts">
import { buildAddressLine } from '@/lib/helpers'
import type { NewAddressForm } from '@/lib/types/forms'
import { useAuthStore } from '@/stores/AuthStore'
import { useUserStore } from '@/stores/UserStore'
import { ElMessage, ElMessageBox, type FormInstance } from 'element-plus'
import { computed, h, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const userStore = useUserStore()

const isEditting = computed(() => route.meta.operation === 'edit')
const isCreating = computed(() => route.meta.operation === 'create')

const address = userStore.getUserAddressByAddressId(
  authStore.user as string,
  route.params.id as string,
)

const loading = ref(false)
const addressFormRef = ref<FormInstance>()
const addressForm = reactive<NewAddressForm>({
  fullName: address?.fullName || '',
  mobileNumber: address?.mobileNumber || '',
  address: address?.address || '',
  unitNumber: address?.unitNumber || '',
  province: address?.province || '',
  district: address?.district || '',
  ward: address?.ward || '',
  deliveryLabel: address?.deliveryLabel || null,
})

const rules = {
  fullName: [{ required: true, message: 'Please enter your full name', trigger: 'blur' }],
  address: [{ required: true, message: 'Please enter your address', trigger: 'blur' }],
  mobileNumber: [{ required: true, message: 'Please enter your mobile number', trigger: 'blur' }],
  province: [{ required: true, message: 'Please enter your province', trigger: 'blur' }],
  district: [{ required: true, message: 'Please enter your district', trigger: 'blur' }],
  ward: [{ required: true, message: 'Please enter your ward', trigger: 'blur' }],
  deliveryLabel: [{ required: true, message: 'Please enter your email', trigger: 'blur' }],
}

const handleRegister = async () => {
  if (!addressFormRef.value) return

  await addressFormRef.value.validate((valid) => {
    if (valid) {
      loading.value = true

      // Simulate API call
      setTimeout(() => {
        loading.value = false
        ElMessage.success('Login successful!')

        if (isEditting.value) {
          // Update existing address logic
          userStore.updateUserAddressById(
            authStore.user as string,
            route.params.id as string,
            addressForm,
          )
          router.push({ name: 'address' })
        } else if (isCreating.value) {
          userStore.addAddressToUser(authStore.user as string, addressForm)
          router.push({ name: 'address' })
        } else {
          authStore.registerUser(addressForm)
        }
        // Add your login logic here
      }, 1500)
    } else {
      ElMessage.error('Please fill in all required fields correctly')
    }
  })
}
// <p class="address-text">{{ address.unitNumber }}{{ address.address }}</p>
//             <p class="postcode">
//               {{
//                 buildAddressLine({
//                   province: address.province,
//                   district: address.district,
//                   ward: address.ward,
//                 })
//               }}
//             </p>
// <p class="phone-text">{{ address.mobileNumber }}</p>

function handleDelete() {
  ElMessageBox({
    title: 'Are you sure you want to delete this address?',
    message: h('div', { style: { marginBottom: '1rem' } }, [
      h('p', { style: { fontWeight: 'bold', fontSize: '1rem' } }, `${address!.fullName}`),
      h('p', null, `${address?.unitNumber} ${address!.address}`),
      h(
        'p',
        null,
        `${buildAddressLine({
          province: address!.province,
          district: address!.district,
          ward: address!.ward,
        })}`,
      ),
      h('p', null, `${address!.mobileNumber}`),
    ]),
    showCancelButton: true,
    confirmButtonText: 'Delete',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        instance.confirmButtonText = 'Loading...'
        setTimeout(() => {
          done()
          setTimeout(() => {
            instance.confirmButtonLoading = false
          }, 300)
          userStore.deleteUserAddressById(authStore.user as string, route.params.id as string)
          router.push({ name: 'address' })
        }, 3000)
      } else {
        done()
      }
    },
  }).catch(() => {
    ElMessage.info('Delete action cancelled')
  })
}
</script>

<template>
  <el-form
    ref="addressFormRef"
    :model="addressForm"
    label-width="auto"
    :rules
    @submit.prevent="handleRegister"
  >
    <div>
      <el-form-item label="Full Name" prop="fullName" label-position="top">
        <el-input v-model="addressForm.fullName" placeholder="First Last" />
      </el-form-item>

      <el-form-item label="Mobile Number" prop="mobileNumber" label-position="top">
        <el-input v-model="addressForm.mobileNumber" placeholder="Please enter your phone number" />
      </el-form-item>

      <el-form-item label="Address" prop="address" label-position="top">
        <el-input v-model="addressForm.address" placeholder="Please enter your address" />
      </el-form-item>

      <el-form-item label="Floor/Unit Number" prop="unitNumber" label-position="top">
        <el-input
          v-model="addressForm.unitNumber"
          placeholder="Please enter your floor/unit number"
        />
      </el-form-item>
    </div>

    <div>
      <el-form-item label="Province" prop="province" label-position="top">
        <el-input v-model="addressForm.province" placeholder="Please choose your province" />
      </el-form-item>

      <el-form-item label="District" prop="district" label-position="top">
        <el-input v-model="addressForm.district" placeholder="Please choose your district" />
      </el-form-item>

      <el-form-item label="Ward" prop="ward" label-position="top">
        <el-input v-model="addressForm.ward" placeholder="Please choose your ward" />
      </el-form-item>

      <el-form-item
        label="Select a label for effective delivery:"
        prop="deliveryLabel"
        label-position="top"
      >
        <div class="label-buttons">
          <el-button class="office button-label" @click="addressForm.deliveryLabel = 'office'"
            ><el-icon
              :style="[
                addressForm.deliveryLabel === 'office' ? 'color: var(--color-tertiary)' : '',
              ]"
              ><Briefcase /></el-icon
            ><span> office </span>
          </el-button>
          <el-button class="home button-label" @click="addressForm.deliveryLabel = 'home'"
            ><el-icon
              :style="[addressForm.deliveryLabel === 'home' ? 'color: var(--color-main)' : '']"
              ><HomeFilled /></el-icon
            ><span> home </span>
          </el-button>
        </div>
      </el-form-item>

      <div class="form-buttons">
        <el-button class="cancel-button form-button" @click="router.back()">cancel</el-button>

        <el-button class="save-button form-button" native-type="submit">{{
          isEditting ? 'Edit' : 'Save'
        }}</el-button>

        <el-button text class="delete-button" v-if="isEditting" @click="handleDelete"
          >Delete</el-button
        >
      </div>
    </div>
  </el-form>
</template>

<style scoped>
.message-address__name {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.el-form {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  background-color: #fff;
  gap: 1rem;
  width: 100%;
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
  width: 100%;
}

.office {
  --el-button-border-color: var(--color-tertiary-opaque);
}

.home {
  --el-button-border-color: var(--color-main);
  --el-button-bg-color: var(--color-main-transparent);
  box-shadow: 0 0 5px 1px var(--color-main-transparent);
  --el-button-hover-bg-color: var(--color-main-transparent);
  --el-button-hover-border-color: var(--color-main);
  margin: 0;
}

.cancel-button {
  background-color: #e0e0e0;
  border-color: #e0e0e0;
  color: #666;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 500;
  text-transform: capitalize;
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
  margin: 0;
  text-transform: uppercase;
}

.save-button:hover {
  background-color: #e55a2b;
  border-color: #e55a2b;
}

.delete-button {
  position: absolute;
  text-transform: uppercase;
  font-size: 1rem;
  top: -4rem;
  right: 0;
}

.form-button {
  --el-button-hover-text-color: inherit;
  --el-button-hover-border-color: black;
  width: 100%;
  padding: 1.25rem 0;
  border: 0;
}

.form-buttons {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  background-color: white;
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
}

.label-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

@media screen and (min-width: 700px) {
  .el-form {
    grid-template-columns: 1fr 1fr;
  }

  .form-buttons {
    flex-direction: row;
    justify-content: flex-end;
  }

  .label-buttons {
    flex-direction: row;
  }

  .form-buttons {
    position: static;
    width: 100%;
    padding: 0;
  }
}
</style>
