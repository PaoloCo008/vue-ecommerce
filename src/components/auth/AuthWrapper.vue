<script setup lang="ts">
import { ref } from 'vue'
import AuthForm from '../forms/AuthForm.vue'

const props = defineProps<{ signingUp?: boolean }>()

const isSigningUp = ref(props.signingUp)
</script>

<template>
  <TransitionGroup name="forms" tag="div" class="transition-wrapper">
    <AuthForm v-if="!isSigningUp" key="login" @on-logging-in="isSigningUp = !isSigningUp" />
    <AuthForm v-else key="signup" signing-up @on-signing-up="isSigningUp = !isSigningUp" />
  </TransitionGroup>
</template>

<style scoped>
.transition-wrapper {
  position: relative;
  width: 100%;
  max-width: 500px;
  background-color: #fff;
  height: 100%;
  margin: 0 auto;
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
