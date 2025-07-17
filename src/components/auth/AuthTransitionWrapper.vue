<script setup lang="ts">
import { ref } from 'vue'
import SignInForm from './SignInForm.vue'
import SignUpForm from './SignUpForm.vue'
import RecoveryForm from './RecoveryForm.vue'
import AuthOTP from './AuthOTP.vue'
import PhoneForm from './PhoneForm.vue'
import AddressModal from '../address/AddressModal.vue'
import type { AuthStages } from '@/lib/types/globals'

const { operation } = defineProps<{ operation: AuthStages }>()

const state = ref<AuthStages>(operation)
</script>

<template>
  <TransitionGroup name="forms" tag="div" class="transition-wrapper">
    <!-- Sign In Form -->
    <SignInForm
      v-if="state === 'logIn'"
      @to-login="state = 'signUp'"
      @to-recovery="state = 'recover'"
    />

    <!-- Sign Up Form -->
    <SignUpForm
      v-if="state === 'signUp'"
      @to-sign-up="state = 'logIn'"
      @to-phone="state = 'phone'"
    />

    <!-- Address Modal -->
    <AddressModal v-if="state === 'address'" />

    <!-- Phone Form -->
    <PhoneForm v-if="state === 'phone'" @confirm="state = 'otp'" />

    <!-- OTP Form -->
    <AuthOTP
      v-if="state === 'otp'"
      @confirm-sign-up="state = 'address'"
      @change-number="state = 'phone'"
      @back="state = 'logIn'"
    />

    <!-- Recovery Form -->
    <RecoveryForm v-if="state === 'recover'" @back="state = 'logIn'" @confirm="state = 'otp'" />
  </TransitionGroup>
</template>

<style scoped>
.transition-wrapper {
  position: relative;
  width: 100%;
  background-color: #fff;
  margin: 0 auto;
  height: 500px;
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
