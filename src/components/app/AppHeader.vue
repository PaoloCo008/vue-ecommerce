<script setup lang="ts">
import AppDrawer from './AppDrawer.vue'
import AppSearch from '@/components/app/AppSearch.vue'
</script>

<template>
  <el-header>
    <div class="header-links__wrapper">
      <div class="header-links">
        <RouterLink to="/">login</RouterLink>
        <RouterLink to="/">signup</RouterLink>
      </div>
    </div>
    <div class="header-content">
      <RouterLink to="/">
        <h1>LOGO</h1>
      </RouterLink>

      <div class="content-wrapper">
        <AppSearch />

        <AppDrawer>
          <template #trigger="props">
            <el-icon
              size="35px"
              color="#f57224"
              class="search-icon"
              @click="props.handleOpenDrawer"
            >
              <Search />
            </el-icon>
          </template>
        </AppDrawer>
        <RouterLink :to="{ name: 'cart' }">
          <el-icon size="35px" color="#2b357e"> <ShoppingCart /> </el-icon>
        </RouterLink>
      </div>
    </div>
  </el-header>
</template>

<style>
.el-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  background-color: #fff;
  padding: 0;
  height: fit-content;
}

.header-links__wrapper {
  width: 100%;
  background-color: var(--color-background);
  padding: 0 2rem;
}

.header-links {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  max-width: 1200px;
  text-transform: uppercase;
  font-size: 0.75rem;
  gap: 2rem;
  margin: 0 auto;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
}

.content-wrapper {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-grow: 1;
  justify-content: flex-end;
}

.el-icon {
  cursor: pointer;
}

.controls-wrapper {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

@media screen and (min-width: 550px) {
  .search-icon {
    display: none;
  }

  .controls-wrapper {
    justify-content: end;
    flex-grow: 1;
  }
}

@media screen and (min-width: 1250px) {
  .header-content {
    padding: 1rem 0;
  }
}
</style>
