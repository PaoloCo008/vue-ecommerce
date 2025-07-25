<script setup lang="ts">
defineProps<{
  title: string
  hasContentButtons?: boolean
  confirm?: () => void
  back?: () => void
  loading?: boolean
  disabled?: boolean
}>()
</script>

<template>
  <div class="container">
    <div class="content">
      <div class="header">
        <h3 class="title">{{ title }}</h3>
      </div>

      <slot></slot>
    </div>

    <div v-if="!hasContentButtons" class="buttons">
      <el-button size="large" class="back-button button" @click="back"> Back </el-button>
      <el-button
        :loading="loading"
        type="primary"
        size="large"
        class="confirm-button button"
        @click="confirm"
        :disabled
      >
        Confirm
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.content {
  height: 100%;
}

.body {
  height: 100%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
}

.title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #333333;
  margin: 0;
}

.content {
  text-align: left;
}

.buttons {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.button {
  width: 125px;
}

.back-button {
  padding: 0.75rem 1.5rem;
  border: 1px solid #dcdfe6;
  background: #ffffff;
  color: #606266;
  border-radius: 6px;
}

.back-button:hover {
  color: #37383a;
  border-color: #37383a;
}

.confirm-button {
  padding: 0.75rem 1.5rem;
  background: #ff6b35;
  border-color: #ff6b35;
  border-radius: 6px;
  margin: 0;
}

.confirm-button:hover {
  background: #ff5722;
  border-color: #ff5722;
}

.confirm-button:disabled {
  background-color: #cccccc;
  border-color: #cccccc;
  cursor: not-allowed;
}

@media screen and (min-width: 500px) {
  .title {
    font-size: 1.5rem;
  }
}
</style>
