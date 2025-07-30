<script setup lang="ts">
import AppDrawer from '../app/AppDrawer.vue'
import ProfileAside from './ProfileAside.vue'
</script>

<template>
  <div class="sub-nav py-3 flex items-center">
    <AppDrawer>
      <template #trigger="props">
        <button class="sidebar-button" @click="props.handleOpenDrawer">
          <i class="el-icon mr-2" style="font-size: 1.25rem"
            ><svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="2" y="7" width="11" height="2" fill="#606266"></rect>
              <rect x="2" y="11" width="14" height="2" fill="#606266"></rect>
              <rect x="2" y="15" width="8" height="2" fill="#606266"></rect>
              <rect x="2" y="3" width="16" height="2" fill="#606266"></rect></svg></i
          ><span class="leading-6">Menu</span>
        </button>
      </template>
      <ProfileAside />
    </AppDrawer>
  </div>
</template>

<style scoped>
.sub-nav {
  width: 100vw;
  position: fixed;
  top: 115px;
  z-index: 999;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  padding: 1rem;
  background-color: #eff0f5;
}

.sidebar-button {
  border: unset;
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
