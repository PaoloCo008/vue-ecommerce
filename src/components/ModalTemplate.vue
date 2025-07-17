<script setup lang="ts">
defineProps<{ title: string; hasContentButtons?: boolean; onConfirm?: () => void }>()
</script>

<template>
  <div class="container">
    <div class="header">
      <h3 class="title">{{ title }}</h3>
    </div>

    <div class="body">
      <div class="content">
        <slot></slot>
      </div>

      <div v-if="!hasContentButtons" class="buttons">
        <el-button size="large" class="back-button"> Back </el-button>
        <el-button type="primary" size="large" class="confirm-button" @click="onConfirm">
          Confirm
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

.body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.content {
  text-align: left;
}

.buttons {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
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

@media screen and (min-width: 500px) {
  .title {
    font-size: 1.5rem;
  }
}
</style>
