<template>
  <button class="confirm-button" @click="handleConfirm">Confirm Selection</button>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'

// Emits
const emit = defineEmits(['confirm'])

// Methods
const handleConfirm = () => {
  emit('confirm')
}
</script>

<style scoped>
.confirm-button {
  width: 100%;
  background: #17a2b8;
  color: white;
  border: none;
  padding: 14px 20px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 0;
  letter-spacing: 0.5px;
}

.confirm-button:hover {
  background: #138496;
}

.confirm-button:active {
  transform: scale(0.98);
  background: #117a8b;
}

.confirm-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(23, 162, 184, 0.2);
}

/* Small Mobile (320px+) */
@media (min-width: 320px) {
  .confirm-button {
    padding: 16px 20px;
    font-size: 16px;
  }
}

/* Large Mobile (480px+) */
@media (min-width: 480px) {
  .confirm-button {
    padding: 18px 24px;
    font-size: 17px;
  }
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .confirm-button {
    padding: 20px 28px;
    font-size: 18px;
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .confirm-button {
    padding: 22px 32px;
    font-size: 18px;
  }
}
</style>
