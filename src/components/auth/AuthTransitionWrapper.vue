<script setup lang="ts">
import { ref } from 'vue'
import SignInForm from './SignInForm.vue'
import SignUpForm from './SignUpForm.vue'
import RecoveryForm from './RecoveryForm.vue'
import AuthOTP from './AuthOTP.vue'
import PhoneForm from './PhoneForm.vue'
import AddressModal from '../address/AddressModal.vue'
import type { AuthStages } from '@/lib/types/globals'
import { useAuthStore } from '@/stores/AuthStore'

const { operation } = defineProps<{ operation?: AuthStages }>()

const state = ref<AuthStages>(operation)

const authStore = useAuthStore()
</script>

<template>
  <TransitionGroup name="forms" tag="div" class="transition-wrapper">
    <!-- Sign In Form -->
    <SignInForm v-if="authStore.isInMethodFlowPosition('login')" @to-recovery="state = 'recover'" />

    <!-- Sign Up Form -->
    <SignUpForm v-if="authStore.isInMethodFlowPosition('signup')" @to-phone="state = 'phone'" />

    <!-- Address Modal -->
    <AddressModal v-if="authStore.isInMethodFlowPosition('address')" />

    <!-- Phone Form -->
    <PhoneForm v-if="authStore.isInMethodFlowPosition('phone')" @confirm="state = 'otp'" />

    <!-- OTP Form -->
    <AuthOTP
      v-if="authStore.isInMethodFlowPosition('otp')"
      @confirm-sign-up="state = 'address'"
      @change-number="state = 'phone'"
      @back="state = 'login'"
    />

    <!-- Recovery Form -->
    <RecoveryForm
      v-if="authStore.isInMethodFlowPosition('recover')"
      @back="state = 'login'"
      @confirm="state = 'otp'"
    />
  </TransitionGroup>
</template>

<style scoped>
.transition-wrapper {
  position: relative;
  width: 100%;
  background-color: #fff;
  margin: 0 auto;
  height: 100%;
}

.forms-enter-active,
.forms-leave-active {
  transition: all 0.6s ease-out;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}

.forms-enter-from,
.forms-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

.forms-leave-from,
.forms-enter-to {
  transition-delay: 0.6s;
  opacity: 1;
  transform: translateY(0);
}
</style>
