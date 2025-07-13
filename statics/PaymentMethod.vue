<template>
  <div class="payment-method-container">
    <h2 class="payment-title">Select Payment Method</h2>
    
    <!-- Credit/Debit Card Section -->
    <div class="payment-section">
      <h3 class="section-title">Credit / Debit Card</h3>
      
      <div class="card-headers">
        <span class="card-header">Card Number</span>
        <span class="card-header">Expiry Date</span>
      </div>
      
      <div class="payment-card">
        <div class="card-info">
          <div class="card-brand">
            <span class="visa-logo">VISA</span>
          </div>
          <span class="card-number">483442******1225</span>
        </div>
        <div class="card-expiry">
          <span>Expires 08/26</span>
        </div>
        <el-button type="primary" link class="delete-btn">Delete</el-button>
      </div>
      
      <el-button type="primary" link class="add-card-btn">
        <el-icon><Plus /></el-icon>
        Add Card
      </el-button>
    </div>
    
    <!-- Digital Wallet Section -->
    <div class="payment-section">
      <h3 class="section-title">Digital Wallet</h3>
      
      <div class="card-headers">
        <span class="card-header">Card Number</span>
        <span class="card-header">Expiry Date</span>
      </div>
      
      <!-- Maya Card -->
      <div class="payment-card">
        <div class="card-info">
          <div class="card-brand">
            <span class="maya-logo">maya</span>
          </div>
          <span class="card-number">+639*****5407</span>
        </div>
        <div class="card-expiry">
          <span>-</span>
        </div>
        <el-button type="primary" link class="delete-btn">Delete</el-button>
      </div>
      
      <!-- GCash Card -->
      <div class="payment-card">
        <div class="card-info">
          <div class="card-brand gcash-brand">
            <div class="gcash-logo">
              <span class="gcash-g">G</span>
            </div>
          </div>
          <span class="card-number">63-9****15407</span>
        </div>
        <div class="card-expiry">
          <span>-</span>
        </div>
        <el-button type="primary" link class="delete-btn">Delete</el-button>
      </div>
      
      <el-button type="primary" link class="add-card-btn">
        <el-icon><Plus /></el-icon>
        Add Card
      </el-button>
    </div>
    
    <!-- Continue Button -->
    <div class="continue-section">
      <el-button type="primary" size="large" class="continue-btn">
        Continue
      </el-button>
    </div>
  </div>
</template>

<script>
import { Plus } from '@element-plus/icons-vue'

export default {
  name: 'PaymentMethodSelector',
  components: {
    Plus
  }
}
</script>

<style scoped>
.payment-method-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.payment-title {
  font-size: 24px;
  font-weight: 500;
  color: #333;
  margin-bottom: 30px;
  margin-top: 0;
}

.payment-section {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin-bottom: 15px;
  margin-top: 0;
}

.card-headers {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 0 10px;
}

.card-header {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.payment-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 10px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  margin-bottom: 10px;
  background-color: #fafafa;
}

.card-info {
  display: flex;
  align-items: center;
  flex: 1;
}

.card-brand {
  margin-right: 15px;
}

.visa-logo {
  background-color: #1a1f71;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 12px;
}

.maya-logo {
  background-color: #00d4aa;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 12px;
}

.gcash-brand {
  display: flex;
  align-items: center;
}

.gcash-logo {
  width: 32px;
  height: 32px;
  background-color: #007fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gcash-g {
  color: white;
  font-weight: bold;
  font-size: 16px;
}

.card-number {
  font-size: 14px;
  color: #333;
  font-family: monospace;
}

.card-expiry {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #666;
}

.delete-btn {
  color: #409eff;
  font-size: 14px;
}

.add-card-btn {
  color: #409eff;
  font-size: 14px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.continue-section {
  text-align: center;
  margin-top: 30px;
}

.continue-btn {
  width: 100%;
  max-width: 300px;
  height: 45px;
  font-size: 16px;
  font-weight: 500;
}

:deep(.el-button--primary.is-link) {
  color: #409eff;
  text-decoration: none;
}

:deep(.el-button--primary.is-link:hover) {
  color: #66b1ff;
}
</style>