<script setup lang="ts"></script>

<template>
  <el-aside width="240px" class="sidebar">
    <div class="user-greeting">
      <span>Hello, ...</span>
      <el-tag type="success" size="small" class="verified-tag">
        <el-icon><Check /></el-icon>
        Verified Account
      </el-tag>
    </div>

    <el-menu default-active="manage-account" class="sidebar-menu" @select="handleMenuSelect" router>
      <el-menu-item :index="{ name: 'profile', params: { id: 1 } }" class="menu-title">
        <span>Manage My Account</span>
      </el-menu-item>

      <el-menu-item :index="{ name: 'myprofile', params: { id: 1 } }" class="sub-menu">
        <span>My Profile</span>
      </el-menu-item>

      <el-menu-item :index="{ name: 'address', params: { id: 1 } }" class="sub-menu">
        <span>Address Book</span>
      </el-menu-item>

      <el-menu-item :index="{ name: 'paymentoptions', params: { id: 1 } }" class="sub-menu">
        <span>My Payment Options</span>
      </el-menu-item>

      <el-menu-item :index="{ name: 'orders', params: { id: 1 } }" class="menu-title">
        <span>My Orders</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<style scoped>
a {
  padding: 0;
}

.el-aside {
  width: 100%;
}

.user-greeting {
  padding: 0 20px 20px 20px;
  color: #666;
}

.sidebar-menu {
  border: none;
}

.menu-title {
  font-weight: 600;
  color: #333;
}

.sub-menu {
  font-size: 14px;
  color: #666;
  padding-left: 40px !important;
}

:deep(.el-menu) {
  background-color: transparent;
}

:deep(.el-menu-item) {
  height: 40px;
  line-height: 40px;
}

:deep(.el-menu-item:hover) {
  background-color: unset;
}

:deep(.el-menu-item.is-active) {
  color: #20b2aa;
}

@media screen and (min-width: 650px) {
  .el-aside {
    width: 245px;
  }
}
</style>
