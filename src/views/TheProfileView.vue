<script setup lang="ts">
import ProfileAside from '@/components/profile/ProfileAside.vue'
import ProfileMenu from '@/components/profile/ProfileMenu.vue'
</script>

<template>
  <div class="account-management">
    <el-container>
      <!-- Sidebar -->
      <ProfileAside class="show-aside" />
      <ProfileMenu class="show-menu" />

      <!-- Main Content -->
      <RouterView />
    </el-container>
  </div>
</template>

<style scoped>
.show-aside {
  display: none;
}

.show-menu {
  display: block;
}

.account-management {
  min-height: 100vh;
  position: relative;
}

.verified-tag {
  display: block;
  margin-top: 8px;
  width: fit-content;
}

@media screen and (min-width: 750px) {
  .show-aside {
    display: block;
  }

  .show-menu {
    display: none;
  }

  .main-content {
    margin-top: unset;
  }
}
</style>
