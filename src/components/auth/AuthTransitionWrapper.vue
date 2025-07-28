<script setup lang="ts">
import { ref, Transition } from 'vue'
import SignInForm from './SignInForm.vue'
import SignUpForm from './SignUpForm.vue'
import RecoveryForm from './RecoveryForm.vue'
import AuthOTP from './AuthOTP.vue'
import PhoneForm from './PhoneForm.vue'
import AddressModal from '../address/AddressModal.vue'
import type { AuthStages } from '@/lib/types/globals'
import { useAuthStore } from '@/stores/AuthStore'

defineProps<{ closeModal?: () => void }>()

const authStore = useAuthStore()
</script>

<template>
  <Transition name="forms" mode="out-in">
    <SignInForm v-if="authStore.isInMethodFlowPosition('login')" key="login" />
    <SignUpForm v-else-if="authStore.isInMethodFlowPosition('signup')" key="signup" />
    <AddressModal v-else-if="authStore.isInMethodFlowPosition('address')" key="address" />
    <PhoneForm v-else-if="authStore.isInMethodFlowPosition('phone')" key="phone" />
    <AuthOTP
      v-else-if="authStore.isInMethodFlowPosition('otp')"
      key="otp"
      @on-reroute-to-reset="closeModal"
    />
    <RecoveryForm v-else-if="authStore.isInMethodFlowPosition('recover')" key="recover" />
  </Transition>
</template>

<style scoped>
.forms-enter-active,
.forms-leave-active {
  transition:
    transform 0.6s ease-out,
    opacity 0.6s ease-out;
}

.forms-enter-from,
.forms-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

.forms-enter-to,
.forms-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
