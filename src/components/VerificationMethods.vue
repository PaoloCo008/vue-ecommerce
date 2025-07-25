<script setup lang="ts">
import { ShieldUser } from 'lucide-vue-next'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const verificationFor = computed(() => route.query.for as string)
</script>

<template>
  <div class="content">
    <div class="shield-icon">
      <div class="shield-background">
        <ShieldUser :size="48" />
      </div>
    </div>

    <p class="description">To protect your account security, we need to verify your identity</p>

    <p class="instruction">Please choose a way to verify:</p>

    <div class="verification-options">
      <button
        class="verification-option"
        @click="
          router.push({
            name: 'verification-form',
            query: { operation: verificationFor, type: 'email' },
          })
        "
      >
        <div class="option-icon">
          <el-icon :size="20" color="#666">
            <Message />
          </el-icon>
        </div>
        <span>Email Verification</span>
      </button>

      <button
        class="verification-option"
        @click="
          router.push({
            name: 'verification-form',
            query: { operation: verificationFor, type: 'mobile' },
          })
        "
      >
        <div class="option-icon">
          <el-icon :size="20" color="#666">
            <Iphone />
          </el-icon>
        </div>
        <span>Mobile Verification</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.content {
  padding: 40px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.shield-icon {
  margin-bottom: 24px;
}

.shield-background {
  width: 80px;
  height: 80px;
  background-color: #7cb9e8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.description {
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  margin: 0 0 16px 0;
  max-width: 320px;
}

.instruction {
  font-size: 16px;
  color: #666;
  margin: 0 0 32px 0;
}

.verification-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 320px;
}

.verification-option {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 16px;
  color: #666;
  text-align: left;
}

.verification-option:hover {
  border-color: var(--color-main-opaque);
  background-color: var(--color-main-transparent);
}

.option-icon {
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.google-icon svg {
  width: 20px;
  height: 20px;
}

.verification-option span {
  flex: 1;
}
</style>
