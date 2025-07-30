<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="error-page">
    <div class="error-content">
      <h1 class="error-title">We're Sorry...</h1>
      <p class="error-message">We seem to have lost this page but we don't want to lose you.</p>

      <button class="back-button" @click="router.back()">Go Back</button>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.error-content {
  text-align: center;
  max-width: 400px;
  width: 100%;
}

.error-title {
  font-size: 2rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 16px;
  margin-top: 0;
}

.error-message {
  font-size: 1.1rem;
  color: #718096;
  margin-bottom: 32px;
  line-height: 1.5;
}

.back-button {
  background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%);
  color: white;
  border: none;
  padding: 14px 28px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(229, 62, 62, 0.3);
  min-width: 160px;
}

.back-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(229, 62, 62, 0.4);
}

.back-button:active:not(:disabled) {
  transform: translateY(0);
}

.back-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

@media (max-width: 480px) {
  .error-title {
    font-size: 1.5rem;
  }

  .error-message {
    font-size: 1rem;
  }

  .character {
    width: 100px;
    height: 100px;
  }

  .face {
    width: 50px;
    height: 50px;
  }

  .petal {
    width: 20px;
    height: 20px;
  }

  .wing {
    width: 35px;
    height: 50px;
  }
}
</style>
