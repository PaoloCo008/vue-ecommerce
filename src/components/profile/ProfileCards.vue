<script setup lang="ts">
import ProfileContentLayout from '@/layouts/ProfileContentLayout.vue'
import { computed } from 'vue'
import CardAddModal from '../cards/CardAddModal.vue'
import { useUserStore } from '@/stores/UserStore'
import { useAuthStore } from '@/stores/AuthStore'
import { cardProviderLogos } from '@/lib/constants'
import type { CreditCard } from '@/lib/types/globals'
import { buildCardNumber } from '@/lib/helpers'

const userStore = useUserStore()
const authStore = useAuthStore()

const creditCards = computed(() =>
  userStore
    .getUserPaymentMethods(authStore.user as string, 'credit_card')
    ?.map((card: CreditCard) => ({
      logo: cardProviderLogos[card.provider].img,
      provider: cardProviderLogos[card.provider].provider,
      number: card.lastFour,
      expiry: card.expiration,
      id: card._id,
    })),
)

console.log(creditCards.value)

const digitalWallets = computed(() =>
  userStore.getUserPaymentMethods(authStore.user as string, 'mobile_wallet'),
)

// Methods
const deleteCard = (cardId: string) => {
  userStore.deleteCardFromUser(authStore.user as string, cardId)
}

const addCreditCard = () => {
  console.log('Add credit card functionality would be implemented here')
}

const addDigitalWallet = () => {
  console.log('Add digital wallet functionality would be implemented here')
}
</script>

<template>
  <ProfileContentLayout page-title="Select Payment Method">
    <div class="payment-container">
      <!-- Credit/Debit Cards Section -->
      <div class="section">
        <h2 class="section-title">Credit / Debit Card</h2>

        <el-table
          :data="creditCards"
          style="width: 100%"
          :show-header="true"
          header-row-class-name="table-header"
          row-class-name="table-row"
        >
          <el-table-column label="Card Number" min-width="200">
            <template #default="scope">
              <div class="card-info-row">
                <div>
                  <img :src="scope.row.logo" :alt="scope.row.provider" class="card-logo" />
                </div>
                <span class="card-number">{{ buildCardNumber(scope.row.number) }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="Expiry Date" width="120">
            <template #default="scope">
              <span class="card-expiry">Expires {{ scope.row.expiry }}</span>
            </template>
          </el-table-column>

          <el-table-column label="" width="80">
            <template #default="scope">
              <el-button
                type="text"
                size="small"
                class="delete-button"
                @click="deleteCard(scope.row.id)"
              >
                Delete
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="add-card-section">
          <CardAddModal />
        </div>
      </div>

      <!-- Digital Wallet Section -->
      <div class="section">
        <h2 class="section-title">Digital Wallet</h2>

        <el-table
          :data="digitalWallets"
          style="width: 100%"
          :show-header="true"
          header-row-class-name="table-header"
          row-class-name="table-row"
        >
          <el-table-column label="Card Number" min-width="200">
            <template #default="scope">
              <div class="card-info-row">
                <div class="card-logo">
                  {{ scope.row.logo }}
                </div>
                <span class="card-number">{{ scope.row.number }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="Expiry Date" width="120">
            <template #default="scope">
              <span class="card-expiry">{{ scope.row.expiry }}</span>
            </template>
          </el-table-column>

          <el-table-column label="" width="80">
            <template #default="scope">
              <el-button
                type="text"
                size="small"
                class="delete-button"
                @click="deleteCard(scope.row.id, 'digital')"
              >
                Delete
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </ProfileContentLayout>
</template>

<style scoped>
.payment-container {
  width: 100%;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 24px;
  overflow-x: auto;
}

.section {
  margin-bottom: 40px;
}

.section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  margin-top: 0;
}

.card-info-row {
  display: flex;
  align-items: center;
}

.card-logo {
  width: 40px;
  height: 28px;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: bold;
}

.card-number {
  font-size: 14px;
  color: #333;
}

.card-expiry {
  font-size: 12px;
  color: #666;
}

.delete-button {
  color: #f56c6c !important;
  font-size: 14px;
}

.delete-button:hover {
  color: #f56c6c !important;
  background-color: #fef0f0 !important;
}

.add-card-section {
  margin-top: 16px;
  padding-left: 0;
}

/* Element Plus Table Customization */
.el-table {
  border: none;
}

.el-table .table-header th {
  background: transparent;
  border: none;
  color: #999;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
  padding: 8px 0 16px 0;
}

.el-table .table-row td {
  border: none;
  border-bottom: 1px solid #eee;
  padding: 16px 0;
}

.el-table .table-row:last-child td {
  border-bottom: none;
}

.el-table .table-row:hover td {
  background-color: #f9f9f9;
}

.el-table__body-wrapper {
  overflow: visible;
}

.el-table__header-wrapper {
  overflow: visible;
}

.el-table .el-table__cell {
  border: none;
}

.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #f9f9f9;
}

.el-table th.el-table__cell {
  background: transparent;
}

.el-table td.el-table__cell {
  border-bottom: 1px solid #eee;
}

.el-table .el-table__row:last-child td.el-table__cell {
  border-bottom: none;
}
</style>
