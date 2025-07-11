<script lang="ts" setup>
import { ref } from 'vue'

const input = ref('')
</script>

<template>
  <div class="search-wrapper">
    <el-input v-model="input" placeholder="Seach in Lazada" />
    <button class="search-button">
      <el-icon size="20px" color="#fff"> <Search /> </el-icon>
    </button>
  </div>
</template>

<style scoped>
.search-wrapper {
  display: none;
}

.search-button {
  background-color: var(--color-main);
  border: none;
  min-width: 43px;
  height: 43px;
  border: 2px solid var(--color-main);
}

.search-button:hover,
.search-button:focus {
  border: 2px solid var(--color-focus);
}

@media screen and (min-width: 550px) {
  .search-wrapper {
    display: flex;
    width: 100%;
    max-width: 700px;
    margin-left: 60px;
  }

  .el-input :deep(.el-input__wrapper) {
    padding: 6px 20px;
    background-color: #eff0f5;
  }
}
</style>
