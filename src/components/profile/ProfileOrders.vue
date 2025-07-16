<script setup lang="ts">
import { ref } from 'vue'
import { Search, Shop } from '@element-plus/icons-vue'
import ProfileContentLayout from '@/layouts/ProfileContentLayout.vue'
import { formatPrice } from '@/lib/helpers'

const activeTab = ref('all')
const searchQuery = ref('')

const ordersData = [
  {
    id: 'ORD-2024-001',
    status: 'Received',
    statusType: 'received',
    seller: 'TechGear Store',
    orderDate: '2024-07-10',
    items: [
      {
        id: 'item-1',
        title:
          'Acrylic Shockproof Clear Case for Huawei Y7 Pro Lite Nova 5T 7i Y7 Y9 Y7P Y5P Casing...',
        variant: 'Black, Nova 5T',
        price: 69.0,
        quantity: 2,
        image:
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iOCIgZmlsbD0iI0Y1RjVGNSIvPgo8cmVjdCB4PSIxNSIgeT0iMjAiIHdpZHRoPSI1MCIgaGVpZ2h0PSI0MCIgcng9IjQiIGZpbGw9IiMzMzMzMzMiLz4KPHJlY3QgeD0iMTgiIHk9IjIzIiB3aWR0aD0iNDQiIGhlaWdodD0iMzQiIHJ4PSIyIiBmaWxsPSIjMDAwMDAwIi8+CjxjaXJjbGUgY3g9IjU1IiBjeT0iMzAiIHI9IjMiIGZpbGw9IiNGRkZGRkYiLz4KPC9zdmc+',
        hasFreeReturns: true,
      },
      {
        id: 'item-2',
        title: 'Premium Screen Protector for Huawei Nova 5T - Tempered Glass',
        variant: 'Clear, Nova 5T',
        price: 45.0,
        quantity: 1,
        image:
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iOCIgZmlsbD0iI0Y1RjVGNSIvPgo8cmVjdCB4PSIxMCIgeT0iMTUiIHdpZHRoPSI2MCIgaGVpZ2h0PSI1MCIgcng9IjQiIGZpbGw9IiM0Mjg1RjQiLz4KPHJlY3QgeD0iMTUiIHk9IjIwIiB3aWR0aD0iNTAiIGhlaWdodD0iNDAiIHJ4PSIyIiBmaWxsPSIjRkZGRkZGIiBmaWxsLW9wYWNpdHk9IjAuOSIvPgo8L3N2Zz4=',
        hasFreeReturns: true,
      },
    ],
  },
  {
    id: 'ORD-2024-002',
    status: 'To receive',
    statusType: 'to-receive',
    seller: 'Fashion Hub PH',
    orderDate: '2024-07-12',
    items: [
      {
        id: 'item-3',
        title: 'Oversized Cotton T-Shirt Unisex Basic Tee - Comfort Fit',
        variant: 'Navy Blue, XL',
        price: 299.0,
        quantity: 3,
        image:
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iOCIgZmlsbD0iI0Y1RjVGNSIvPgo8cGF0aCBkPSJNMjAgMjVIMjVWMjBIMzBWMjVINTBWMjBINTVWMjVINjBWNjBIMjBWMjVaIiBmaWxsPSIjMTk0QkZGIi8+CjxwYXRoIGQ9Ik0yNSAyMEgzMFYxNUg1MFYyMEg1NVYyNUg2MFYzMEg2NVY2MEg2MFY2NUgxNVY2MEgyMFYzMEgyNVYyMFoiIGZpbGw9IiMxOTRCRkYiIGZpbGwtb3BhY2l0eT0iMC4yIi8+CjwvZmdiZz4K',
        hasFreeReturns: false,
      },
    ],
  },
  {
    id: 'ORD-2024-003',
    status: 'To ship',
    statusType: 'to-ship',
    seller: 'ElectroMart',
    orderDate: '2024-07-14',
    items: [
      {
        id: 'item-4',
        title: 'Wireless Bluetooth Earbuds with Charging Case - Premium Sound Quality',
        variant: 'Black',
        price: 1299.0,
        quantity: 1,
        image:
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iOCIgZmlsbD0iI0Y1RjVGNSIvPgo8ZWxsaXBzZSBjeD0iNDAiIGN5PSI0MCIgcng9IjI1IiByeT0iMTUiIGZpbGw9IiMzMzMzMzMiLz4KPGNpcmNsZSBjeD0iMzAiIGN5PSI0MCIgcj0iNiIgZmlsbD0iIzAwMDAwMCIvPgo8Y2lyY2xlIGN4PSI1MCIgY3k9IjQwIiByPSI2IiBmaWxsPSIjMDAwMDAwIi8+CjxjaXJjbGUgY3g9IjQwIiBjeT0iNDAiIHI9IjMiIGZpbGw9IiNGRkZGRkYiLz4KPC9zdmc+',
        hasFreeReturns: true,
      },
      {
        id: 'item-5',
        title: 'USB-C Fast Charging Cable 3ft - Data Transfer & Power Delivery',
        variant: 'White, 3ft',
        price: 189.0,
        quantity: 2,
        image:
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iOCIgZmlsbD0iI0Y1RjVGNSIvPgo8cGF0aCBkPSJNMTAgNDBIMTVMMjUgMzBIMzVMMjUgNDBINzBMMjUgNDBIMzVMMjUgNTBIMTVMMTAgNDBaIiBmaWxsPSIjNjY2NjY2Ii8+CjxyZWN0IHg9IjEwIiB5PSIzNyIgd2lkdGg9IjEwIiBoZWlnaHQ9IjYiIHJ4PSIzIiBmaWxsPSIjMzMzMzMzIi8+CjxyZWN0IHg9IjYwIiB5PSIzNyIgd2lkdGg9IjEwIiBoZWlnaHQ9IjYiIHJ4PSIzIiBmaWxsPSIjMzMzMzMzIi8+CjwvZmdiZz4K',
        hasFreeReturns: false,
      },
    ],
  },
  {
    id: 'ORD-2024-004',
    status: 'To pay',
    statusType: 'to-pay',
    seller: 'BookWorld Philippines',
    orderDate: '2024-07-15',
    items: [
      {
        id: 'item-6',
        title: 'Complete Web Development Course - HTML, CSS, JavaScript Guide Book',
        variant: 'Paperback',
        price: 799.0,
        quantity: 1,
        image:
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iOCIgZmlsbD0iI0Y1RjVGNSIvPgo8cmVjdCB4PSIxNSIgeT0iMTAiIHdpZHRoPSI1MCIgaGVpZ2h0PSI2MCIgcng9IjQiIGZpbGw9IiNGRjc0MzMiLz4KPHJlY3QgeD0iMTgiIHk9IjE1IiB3aWR0aD0iNDQiIGhlaWdodD0iNDAiIHJ4PSIyIiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjMiIGZpbGw9IiMzMzMzMzMiLz4KPHJlY3QgeD0iMjAiIHk9IjI3IiB3aWR0aD0iMzAiIGhlaWdodD0iMiIgZmlsbD0iIzk5OTk5OSIvPgo8cmVjdCB4PSIyMCIgeT0iMzIiIHdpZHRoPSIzNSIgaGVpZ2h0PSIyIiBmaWxsPSIjOTk5OTk5Ii8+CjxyZWN0IHg9IjIwIiB5PSIzNyIgd2lkdGg9IjI1IiBoZWlnaHQ9IjIiIGZpbGw9IiM5OTk5OTkiLz4KPC9zdmc+',
        hasFreeReturns: true,
      },
      {
        id: 'item-7',
        title: 'Programming Notebook - Grid Pattern for Coding Notes',
        variant: 'A5 Size, 200 pages',
        price: 199.0,
        quantity: 2,
        image:
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iOCIgZmlsbD0iI0Y1RjVGNSIvPgo8cmVjdCB4PSIyMCIgeT0iMTUiIHdpZHRoPSI0MCIgaGVpZ2h0PSI1MCIgcng9IjIiIGZpbGw9IiNGRkZGRkYiLz4KPHJlY3QgeD0iMTgiIHk9IjEzIiB3aWR0aD0iNDQiIGhlaWdodD0iNTQiIHJ4PSIyIiBmaWxsPSIjMzMzMzMzIi8+CjxyZWN0IHg9IjIwIiB5PSIxNSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjUwIiByeD0iMiIgZmlsbD0iI0ZGRkZGRiIvPgo8Zz4KPGxpbmUgeDE9IjI1IiB5MT0iMjAiIHgyPSIyNSIgeTI9IjYwIiBzdHJva2U9IiNFNUU1RTUiLz4KPGxpbmUgeDE9IjMwIiB5MT0iMjAiIHgyPSIzMCIgeTI9IjYwIiBzdHJva2U9IiNFNUU1RTUiLz4KPGxpbmUgeDE9IjM1IiB5MT0iMjAiIHgyPSIzNSIgeTI9IjYwIiBzdHJva2U9IiNFNUU1RTUiLz4KPGxpbmUgeDE9IjQwIiB5MT0iMjAiIHgyPSI0MCIgeTI9IjYwIiBzdHJva2U9IiNFNUU1RTUiLz4KPGxpbmUgeDE9IjQ1IiB5MT0iMjAiIHgyPSI0NSIgeTI9IjYwIiBzdHJva2U9IiNFNUU1RTUiLz4KPGxpbmUgeDE9IjUwIiB5MT0iMjAiIHgyPSI1MCIgeTI9IjYwIiBzdHJva2U9IiNFNUU1RTUiLz4KPGxpbmUgeDE9IjU1IiB5MT0iMjAiIHgyPSI1NSIgeTI9IjYwIiBzdHJva2U9IiNFNUU1RTUiLz4KPGxpbmUgeDE9IjIwIiB5MT0iMjUiIHgyPSI2MCIgeTI9IjI1IiBzdHJva2U9IiNFNUU1RTUiLz4KPGxpbmUgeDE9IjIwIiB5MT0iMzAiIHgyPSI2MCIgeTI9IjMwIiBzdHJva2U9IiNFNUU1RTUiLz4KPGxpbmUgeDE9IjIwIiB5MT0iMzUiIHgyPSI2MCIgeTI9IjM1IiBzdHJva2U9IiNFNUU1RTUiLz4KPGxpbmUgeDE9IjIwIiB5MT0iNDAiIHgyPSI2MCIgeTI9IjQwIiBzdHJva2U9IiNFNUU1RTUiLz4KPGxpbmUgeDE9IjIwIiB5MT0iNDUiIHgyPSI2MCIgeTI9IjQ1IiBzdHJva2U9IiNFNUU1RTUiLz4KPGxpbmUgeDE9IjIwIiB5MT0iNTAiIHgyPSI2MCIgeTI9IjUwIiBzdHJva2U9IiNFNUU1RTUiLz4KPGxpbmUgeDE9IjIwIiB5MT0iNTUiIHgyPSI2MCIgeTI9IjU1IiBzdHJva2U9IiNFNUU1RTUiLz4KPC9nPgo8L3N2Zz4=',
        hasFreeReturns: false,
      },
    ],
  },
  {
    id: 'ORD-2024-005',
    status: 'Received',
    statusType: 'received',
    seller: 'HomeEssentials Store',
    orderDate: '2024-07-08',
    items: [
      {
        id: 'item-8',
        title: 'Stainless Steel Water Bottle 500ml - Insulated Thermal Flask',
        variant: 'Matte Black, 500ml',
        price: 599.0,
        quantity: 1,
        image:
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iOCIgZmlsbD0iI0Y1RjVGNSIvPgo8cmVjdCB4PSIzMCIgeT0iMTAiIHdpZHRoPSIyMCIgaGVpZ2h0PSI2MCIgcng9IjEwIiBmaWxsPSIjMzMzMzMzIi8+CjxyZWN0IHg9IjMyIiB5PSIxMiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjU2IiByeD0iOCIgZmlsbD0iIzU1NTU1NSIvPgo8cmVjdCB4PSIzNSIgeT0iOCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjQiIHJ4PSIyIiBmaWxsPSIjMzMzMzMzIi8+CjxyZWN0IHg9IjM3IiB5PSI2IiB3aWR0aD0iNiIgaGVpZ2h0PSI0IiByeD0iMyIgZmlsbD0iIzMzMzMzMyIvPgo8L3N2Zz4=',
        hasFreeReturns: true,
      },
      {
        id: 'item-9',
        title: 'Bamboo Cutting Board Set - 3 Piece Kitchen Essentials',
        variant: 'Natural, 3-piece set',
        price: 899.0,
        quantity: 1,
        image:
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iOCIgZmlsbD0iI0Y1RjVGNSIvPgo8cmVjdCB4PSIxNSIgeT0iMjAiIHdpZHRoPSI1MCIgaGVpZ2h0PSI0MCIgcng9IjQiIGZpbGw9IiNEMkIwOEEiLz4KPHJlY3QgeD0iMTciIHk9IjIyIiB3aWR0aD0iNDYiIGhlaWdodD0iMzYiIHJ4PSIyIiBmaWxsPSIjRURERENEIi8+CjxsaW5lIHgxPSIyMCIgeTE9IjI1IiB4Mj0iNjAiIHkyPSIyNSIgc3Ryb2tlPSIjRDJCMDhBIiBzdHJva2Utd2lkdGg9IjAuNSIvPgo8bGluZSB4MT0iMjAiIHkxPSIzMCIgeDI9IjYwIiB5Mj0iMzAiIHN0cm9rZT0iI0QyQjA4QSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz4KPGxpbmUgeDE9IjIwIiB5MT0iMzUiIHgyPSI2MCIgeTI9IjM1IiBzdHJva2U9IiNEMkIwOEEiIHN0cm9rZS13aWR0aD0iMC41Ii8+CjxsaW5lIHgxPSIyMCIgeTE9IjQwIiB4Mj0iNjAiIHkyPSI0MCIgc3Ryb2tlPSIjRDJCMDhBIiBzdHJva2Utd2lkdGg9IjAuNSIvPgo8bGluZSB4MT0iMjAiIHkxPSI0NSIgeDI9IjYwIiB5Mj0iNDUiIHN0cm9rZT0iI0QyQjA4QSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz4KPGxpbmUgeDE9IjIwIiB5MT0iNTAiIHgyPSI2MCIgeTI9IjUwIiBzdHJva2U9IiNEMkIwOEEiIHN0cm9rZS13aWR0aD0iMC41Ii8+CjxsaW5lIHgxPSIyMCIgeTE9IjU1IiB4Mj0iNjAiIHkyPSI1NSIgc3Ryb2tlPSIjRDJCMDhBIiBzdHJva2Utd2lkdGg9IjAuNSIvPgo8Y2lyY2xlIGN4PSI0MCIgY3k9IjE2IiByPSIyIiBmaWxsPSIjRDJCMDhBIi8+CjwvZmديZz4=',
        hasFreeReturns: false,
      },
    ],
  },
  {
    id: 'ORD-2024-006',
    status: 'To ship',
    statusType: 'to-ship',
    seller: 'Gadget World',
    orderDate: '2024-07-16',
    items: [
      {
        id: 'item-10',
        title: 'Wireless Mouse with RGB Lighting - Gaming & Office Use',
        variant: 'Black, 2.4GHz',
        price: 459.0,
        quantity: 1,
        image:
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iOCIgZmlsbD0iI0Y1RjVGNSIvPgo8ZWxsaXBzZSBjeD0iNDAiIGN5PSI0MCIgcng9IjIwIiByeT0iMjgiIGZpbGw9IiMzMzMzMzMiLz4KPGVsbGlwc2UgY3g9IjQwIiBjeT0iNDAiIHJ4PSIxOCIgcnk9IjI2IiBmaWxsPSIjNTU1NTU1Ii8+CjxyZWN0IHg9IjM1IiB5PSIyMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjMwIiByeD0iNSIgZmlsbD0iIzMzMzMzMyIvPgo8bGluZSB4MT0iNDAiIHkxPSIyMCIgeDI9IjQwIiB5Mj0iNTAiIHN0cm9rZT0iIzIyMjIyMiIgc3Ryb2tlLXdpZHRoPSIxIi8+CjxjaXJjbGUgY3g9IjQwIiBjeT0iNTUiIHI9IjMiIGZpbGw9IiNGRjAwMDAiLz4KPGNpcmNsZSBjeD0iNDAiIGN5PSI1NSIgcj0iMiIgZmlsbD0iIzAwRkYwMCIvPgo8Y2lyY2xlIGN4PSI0MCIgY3k9IjU1IiByPSIxIiBmaWxsPSIjMDAwMEZGIi8+CjwvZmديZz4=',
        hasFreeReturns: true,
      },
    ],
  },
]
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
        <RouterLink
          :to="{ name: 'orderdetails', params: { id: 1, orderId: order.id } }"
          v-for="order in ordersData"
          :key="order.id"
          class="order-link"
        >
          <div class="order-group">
            <div class="order-header">
              <span class="seller-name">{{ order.id }}</span>

              <div class="order-status">{{ order.status }}</div>
            </div>

            <div class="order-item" v-for="item in order.items" :key="item.id">
              <div class="product-image">
                <img :src="item.image" :alt="item.title" />
              </div>
              <div class="product-details">
                <h3 class="product-title">
                  {{ item.title }}
                </h3>
              </div>
              <div class="product-amount">
                <div class="product-price">{{ formatPrice(item.price) }}</div>
                <div class="product-quantity">
                  <span class="qty-number">x{{ item.quantity }}</span>
                </div>
              </div>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </ProfileContentLayout>
</template>

<style scoped>
.my-orders-container {
  max-width: 1200px;
}

.order-tabs {
  margin-bottom: 20px;
  border-bottom: 1px solid #6b778c;
}

.search-container {
  margin-bottom: 20px;
  background-color: white;
  padding: 0.5rem;
}

:deep(.el-input__wrapper) {
  border-radius: 0;
  background-color: #eff0f5;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.order-link {
  padding: 0;
}

.order-group {
  background-color: white;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 100%;
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
  align-items: center;
  flex-direction: column;
  padding: 20px;
  gap: 16px;
}

.product-image {
  flex-shrink: 0;
}

.product-image img {
  width: 80px;
  height: 80px;
  display: block;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
}

.product-details {
  width: 100%;
  text-align: center;
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
  flex-shrink: 0;
}

.product-quantity {
  font-size: 14px;
  color: #666;
  flex-shrink: 0;
  min-width: 60px;
  text-align: right;
}

.product-amount {
  display: flex;
  justify-content: space-between;
  width: 100%;
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
  font-size: 14px;
  color: #666;
  font-weight: 400;
  padding: 0 0.75rem;
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

@media (min-width: 768px) {
  .order-item {
    flex-direction: row;
    gap: 12px;
  }

  .product-details {
    text-align: left;
  }

  .product-amount {
    flex-direction: column;
    align-items: flex-end;
  }
}
</style>
