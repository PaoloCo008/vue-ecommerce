<script setup lang="ts">
import { ref } from 'vue'
import { Search, Shop } from '@element-plus/icons-vue'
import ProfileContentLayout from '@/layouts/ProfileContentLayout.vue'

const activeTab = ref('all')
const searchQuery = ref('')
</script>

<template>
  <ProfileContentLayout page-title="My Orders">
    <div class="my-orders-container">
      <!-- Order Status Tabs -->
      <el-tabs v-model="activeTab" class="order-tabs">
        <el-tab-pane label="All" name="all"></el-tab-pane>
        <el-tab-pane label="To pay" name="to-pay"></el-tab-pane>
        <el-tab-pane label="To ship" name="to-ship"></el-tab-pane>
        <el-tab-pane label="To receive" name="to-receive"></el-tab-pane>
        <el-tab-pane label="To review" name="to-review"></el-tab-pane>
      </el-tabs>

      <!-- Search Bar -->
      <div class="search-container">
        <el-input
          v-model="searchQuery"
          placeholder="Search by seller name, order ID or product name"
          class="search-input"
          clearable
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </div>

      <!-- Orders List -->
      <div class="orders-list">
        <!-- Order 1 - DCH Fashion Accessories -->
        <div class="order-group">
          <div class="order-header">
            <div class="seller-info">
              <el-icon class="store-icon"><Shop /></el-icon>
              <span class="seller-name">DCH FASHION ACCESSORIES</span>
            </div>
            <div class="order-status">Received</div>
          </div>

          <div class="order-item">
            <div class="product-image">
              <img
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iOCIgZmlsbD0iI0Y1RjVGNSIvPgo8cmVjdCB4PSIxMCIgeT0iMjAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI0IiByeD0iMiIgZmlsbD0iI0ZGMDAwMCIvPgo8cmVjdCB4PSIxMCIgeT0iMjgiIHdpZHRoPSI2MCIgaGVpZ2h0PSI0IiByeD0iMiIgZmlsbD0iI0ZGOEMwMCIvPgo8cmVjdCB4PSIxMCIgeT0iMzYiIHdpZHRoPSI2MCIgaGVpZ2h0PSI0IiByeD0iMiIgZmlsbD0iI0ZGRkYwMCIvPgo8cmVjdCB4PSIxMCIgeT0iNDQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI0IiByeD0iMiIgZmlsbD0iIzAwRkYwMCIvPgo8cmVjdCB4PSIxMCIgeT0iNTIiIHdpZHRoPSI2MCIgaGVpZ2h0PSI0IiByeD0iMiIgZmlsbD0iIzAwRkZGRiIvPgo8cmVjdCB4PSIxMCIgeT0iNjAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI0IiByeD0iMiIgZmlsbD0iIzAwMDBGRiIvPgo8L3N2Zz4="
                alt="Gel Pens"
              />
            </div>
            <div class="product-details">
              <h3 class="product-title">
                12Pcs/Box0.5mm Black Gel Pen Apple pen School Office Supplie
              </h3>
              <p class="product-variant">Red Box|Black Gel</p>
              <div class="product-tag">
                <span class="free-returns">Free Returns</span>
              </div>
            </div>
            <div class="product-price">₱35.00</div>
            <div class="product-quantity">Qty: <span class="qty-number">6</span></div>
          </div>
        </div>

        <!-- Order 2 - Yelong Dragon -->
        <div class="order-group">
          <div class="order-header">
            <div class="seller-info">
              <el-icon class="store-icon"><Shop /></el-icon>
              <span class="seller-name">Yelong Dragon</span>
            </div>
            <div class="order-status">Received</div>
          </div>

          <div class="order-item">
            <div class="product-image">
              <img
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iOCIgZmlsbD0iI0Y1RjVGNSIvPgo8cmVjdCB4PSIxNSIgeT0iMjAiIHdpZHRoPSI1MCIgaGVpZ2h0PSI0MCIgcng9IjQiIGZpbGw9IiMzMzMzMzMiLz4KPHJlY3QgeD0iMTgiIHk9IjIzIiB3aWR0aD0iNDQiIGhlaWdodD0iMzQiIHJ4PSIyIiBmaWxsPSIjMDAwMDAwIi8+CjxjaXJjbGUgY3g9IjU1IiBjeT0iMzAiIHI9IjMiIGZpbGw9IiNGRkZGRkYiLz4KPC9zdmc+"
                alt="Phone Case"
              />
            </div>
            <div class="product-details">
              <h3 class="product-title">
                Acrylic Shockproof Clear Case for Huawei Y7 Pro Lite Nova 5T 7i Y7 Y9 Y7P Y5P
                Casing...
              </h3>
              <p class="product-variant">Black, Nova 5T</p>
              <div class="product-tag">
                <span class="free-returns">Free Returns</span>
              </div>
            </div>
            <div class="product-price">₱69.00</div>
            <div class="product-quantity">Qty: <span class="qty-number">2</span></div>
          </div>
        </div>

        <!-- Order 3 - Daebak Beauty -->
        <div class="order-group">
          <div class="order-header">
            <div class="seller-info">
              <el-icon class="store-icon"><Shop /></el-icon>
              <span class="seller-name">Daebak Beauty</span>
            </div>
            <div class="order-status">Received</div>
          </div>

          <div class="order-item">
            <div class="product-image">
              <img
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iOCIgZmlsbD0iI0Y1RjVGNSIvPgo8cmVjdCB4PSIyNSIgeT0iMTUiIHdpZHRoPSIzMCIgaGVpZ2h0PSI1MCIgcng9IjQiIGZpbGw9IiMwMEREQzAiLz4KPHJlY3QgeD0iMjgiIHk9IjE4IiB3aWR0aD0iMjQiIGhlaWdodD0iNDQiIHJ4PSIyIiBmaWxsPSIjMDBCNEE2Ii8+CjxyZWN0IHg9IjMwIiB5PSIyMCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjgiIGZpbGw9IiNGRkZGRkYiLz4KPC9zdmc+"
                alt="Cleansing Gel"
              />
            </div>
            <div class="product-details">
              <h3 class="product-title">AVENE CLEANANCE CLEASING GEL 400ml Exp. Dec 2026</h3>
              <div class="product-tag">
                <span class="free-returns">Free Returns</span>
              </div>
            </div>
            <div class="product-price">₱1,180.00</div>
            <div class="product-quantity">Qty: <span class="qty-number">1</span></div>
          </div>
        </div>
      </div>
    </div>
  </ProfileContentLayout>
</template>

<style scoped>
.my-orders-container {
  max-width: 1200px;
  margin: 0 auto;
}

.order-tabs {
  margin-bottom: 20px;
  border-bottom: 1px solid #6b778c;
  padding: 0 20px;
}

.search-container {
  margin-bottom: 20px;
}

.el-input__wrapper {
  border-radius: 0;
}

.search-input {
  background-color: white;
  border-radius: 8px;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.order-group {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fafafa;
}

.seller-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.store-icon {
  font-size: 16px;
  color: #666;
}

.seller-name {
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

.order-status {
  color: #666;
  font-size: 14px;
  font-weight: 500;
}

.order-item {
  display: flex;
  align-items: flex-start;
  padding: 20px;
  gap: 16px;
}

.product-image {
  flex-shrink: 0;
}

.product-image img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
}

.product-details {
  flex: 1;
  min-width: 0;
}

.product-title {
  font-size: 14px;
  font-weight: 400;
  color: #333;
  margin: 0 0 8px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-variant {
  font-size: 13px;
  color: #999;
  margin: 0 0 8px 0;
}

.product-tag {
  margin-top: 8px;
}

.free-returns {
  display: inline-block;
  padding: 2px 8px;
  background-color: #e8f4fd;
  color: #1890ff;
  font-size: 12px;
  border-radius: 4px;
  border: 1px solid #bae7ff;
}

.product-price {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-right: 20px;
  flex-shrink: 0;
}

.product-quantity {
  font-size: 14px;
  color: #666;
  flex-shrink: 0;
  min-width: 60px;
  text-align: right;
}

.qty-number {
  font-weight: 500;
  color: #333;
}

:deep(.el-tabs__header) {
  margin: 0;
}

:deep(.el-tabs__nav-wrap::after) {
  display: none;
}

:deep(.el-tabs__item) {
  padding: 16px 20px;
  font-size: 14px;
  color: #666;
  font-weight: 400;
}

:deep(.el-tabs__item.is-active) {
  color: #1890ff;
  font-weight: 500;
}

:deep(.el-tabs__active-bar) {
  background-color: #1890ff;
}

:deep(.el-input__wrapper) {
  border-radius: 8px;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  box-shadow: none;
}

:deep(.el-input__wrapper:hover) {
  border-color: #1890ff;
}

:deep(.el-input__wrapper.is-focus) {
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
}

:deep(.el-input__inner) {
  font-size: 14px;
  color: #333;
}

:deep(.el-input__inner::placeholder) {
  color: #999;
}

:deep(.el-input__prefix) {
  color: #999;
}

@media (max-width: 768px) {
  .order-item {
    flex-direction: column;
    gap: 12px;
  }

  .product-image {
    align-self: center;
  }

  .product-details {
    text-align: center;
  }

  .product-price,
  .product-quantity {
    text-align: center;
    margin-right: 0;
  }
}
</style>
