<template>
  <div class="login-container">
    <!-- Header -->
    <div class="login-header">
      <div class="logo">
        <div class="logo-icon">P</div>
        <span class="logo-text">Pay</span>
      </div>
      <el-button type="text">
        <el-icon><Close /></el-icon>
      </el-button>
    </div>
    
    <!-- Form -->
    <div class="login-form">
      <el-tabs v-model="activeTab" class="custom-tabs">
        <el-tab-pane label="Password" name="password"></el-tab-pane>
        <el-tab-pane label="Phone Number" name="phone"></el-tab-pane>
      </el-tabs>
      
      <el-form :model="loginForm">
        <el-form-item class="form-item">
          <el-input
            v-model="loginForm.email"
            placeholder="Please enter your Phone or Email"
            size="large"
            clearable
          />
        </el-form-item>
        
        <el-form-item class="form-item">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="Please enter your password"
            size="large"
            show-password
          />
        </el-form-item>
        
        <div class="forgot-password">
          <a href="#" class="forgot-link">Forgot password?</a>
        </div>
        
        <el-button class="login-button" type="primary" size="large">
          LOGIN
        </el-button>
      </el-form>
      
      <div class="signup-text">
        Don't have an account? <a href="#" class="signup-link">Sign up</a>
      </div>
      
      <div class="divider">
        <span>Or, login with</span>
      </div>
      
      <div class="social-buttons">
        <el-button class="social-btn">
          <div class="google-icon">G</div>
          Google
        </el-button>
        <el-button class="social-btn">
          <div class="facebook-icon">f</div>
          Facebook
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { Close } from '@element-plus/icons-vue'

export default {
  name: 'LoginForm',
  components: {
    Close
  },
  setup() {
    const activeTab = ref('password')
    const loginForm = ref({
      email: '',
      password: ''
    })

    return {
      activeTab,
      loginForm
    }
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.login-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(45deg, #409eff, #67c23a);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 16px;
}

.logo-text {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
}

.login-form {
  padding: 20px;
}

.custom-tabs {
  margin-bottom: 24px;
}

.custom-tabs :deep(.el-tabs__header) {
  margin: 0 0 20px 0;
}

.custom-tabs :deep(.el-tabs__active-bar) {
  background-color: #ff6b35;
}

.custom-tabs :deep(.el-tabs__item.is-active) {
  color: #ff6b35;
}

.custom-tabs :deep(.el-tabs__item:hover) {
  color: #ff6b35;
}

.form-item {
  margin-bottom: 16px;
}

.form-item :deep(.el-input__wrapper) {
  border-radius: 8px;
}

.form-item :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 2px #ff6b35;
}

.forgot-password {
  text-align: right;
  margin-bottom: 24px;
}

.forgot-link {
  color: #909399;
  text-decoration: none;
  font-size: 14px;
}

.forgot-link:hover {
  color: #606266;
}

.login-button {
  width: 100%;
  height: 44px;
  background: #ff6b35;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
}

.login-button:hover {
  background: #ff5722;
}

.signup-text {
  text-align: center;
  color: #909399;
  font-size: 14px;
  margin-bottom: 24px;
}

.signup-link {
  color: #ff6b35;
  text-decoration: none;
  font-weight: 500;
}

.signup-link:hover {
  color: #ff5722;
}

.divider {
  display: flex;
  align-items: center;
  margin: 24px 0;
  color: #909399;
  font-size: 14px;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #e4e7ed;
}

.divider span {
  padding: 0 16px;
}

.social-buttons {
  display: flex;
  gap: 12px;
}

.social-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  background: white;
  color: #606266;
  font-size: 14px;
}

.social-btn:hover {
  border-color: #c0c4cc;
  background: #f8f9fa;
}

.google-icon {
  width: 20px;
  height: 20px;
  background: #db4437;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 12px;
}

.facebook-icon {
  width: 20px;
  height: 20px;
  background: #1877f2;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 12px;
}
</style>