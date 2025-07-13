<template>
  <div class="card-form-container">
    <el-form :model="cardForm" :rules="rules" ref="cardFormRef" label-position="top">
      <!-- Card Number Field -->
      <el-form-item prop="cardNumber">
        <template #label>
          <div class="form-label">
            <span class="required">* Card number</span>
            <div class="payment-icons">
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAzMiAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjIwIiByeD0iNCIgZmlsbD0iIzAwN0RGRiIvPgo8cGF0aCBkPSJNOC4xOCA2LjY4SDEzLjgyVjEzLjMySDguMThWNi42OFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yMy44MiA2LjY4SDE4LjE4VjEzLjMySDIzLjgyVjYuNjhaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4=" alt="American Express" class="payment-icon amex" />
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAzMiAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjIwIiByeD0iNCIgZmlsbD0iI0ZGNUYwMCIvPgo8Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSI2IiBmaWxsPSIjRkY1RjAwIi8+CjxjaXJjbGUgY3g9IjIwIiBjeT0iMTAiIHI9IjYiIGZpbGw9IiNGRkY1RjAiLz4KPC9zdmc+" alt="Mastercard" class="payment-icon mastercard" />
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAzMiAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjIwIiByeD0iNCIgZmlsbD0iIzAwNUE4QiIvPgo8cGF0aCBkPSJNNiA2SDE0VjE0SDZWNloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xOCA2SDI2VjE0SDE4VjZaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4=" alt="JCB" class="payment-icon jcb" />
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAzMiAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjIwIiByeD0iNCIgZmlsbD0iIzFBMUY3MSIvPgo8dGV4dCB4PSI4IiB5PSIxMyIgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI4IiBmb250LXdlaWdodD0iYm9sZCI+VklTQTwvdGV4dD4KPC9zdmc+" alt="Visa" class="payment-icon visa" />
            </div>
          </div>
        </template>
        <el-input
          v-model="cardForm.cardNumber"
          placeholder="Card number"
          maxlength="19"
          @input="formatCardNumber"
          class="card-input"
        />
      </el-form-item>

      <!-- Name on Card Field -->
      <el-form-item prop="nameOnCard">
        <template #label>
          <span class="required">* Name on card</span>
        </template>
        <el-input
          v-model="cardForm.nameOnCard"
          placeholder="Name on card"
          class="card-input"
        />
      </el-form-item>

      <!-- Expiration and CVV Row -->
      <div class="form-row">
        <el-form-item prop="expiration" class="expiration-field">
          <template #label>
            <span class="required">* Expiration (MM/YY)</span>
          </template>
          <el-input
            v-model="cardForm.expiration"
            placeholder="Expiration (MM/YY)"
            maxlength="5"
            @input="formatExpiration"
            class="card-input"
          />
        </el-form-item>

        <el-form-item prop="cvv" class="cvv-field">
          <template #label>
            <div class="cvv-label">
              <span class="required">* CVV</span>
              <el-tooltip content="The 3-digit security code on the back of your card" placement="top">
                <el-icon class="info-icon"><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
          </template>
          <el-input
            v-model="cardForm.cvv"
            placeholder="CVV"
            maxlength="4"
            type="password"
            show-password
            class="card-input"
          />
        </el-form-item>
      </div>
    </el-form>

    <!-- Verification Notice -->
    <div class="verification-notice">
      You may be charged of $1 for card verification, we will refund to you immediately afterwards.
    </div>

    <!-- Action Buttons -->
    <div class="button-row">
      <el-button size="large" class="cancel-btn" @click="handleCancel">
        CANCEL
      </el-button>
      <el-button type="primary" size="large" class="confirm-btn" @click="handleConfirm">
        Confirm
      </el-button>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { QuestionFilled } from '@element-plus/icons-vue'

export default {
  name: 'CardDetailsForm',
  components: {
    QuestionFilled
  },
  setup() {
    const cardFormRef = ref()
    
    const cardForm = reactive({
      cardNumber: '',
      nameOnCard: '',
      expiration: '',
      cvv: ''
    })

    const rules = {
      cardNumber: [
        { required: true, message: 'Please enter card number', trigger: 'blur' },
        { min: 13, message: 'Card number must be at least 13 digits', trigger: 'blur' }
      ],
      nameOnCard: [
        { required: true, message: 'Please enter name on card', trigger: 'blur' }
      ],
      expiration: [
        { required: true, message: 'Please enter expiration date', trigger: 'blur' },
        { pattern: /^\d{2}\/\d{2}$/, message: 'Please enter valid expiration date (MM/YY)', trigger: 'blur' }
      ],
      cvv: [
        { required: true, message: 'Please enter CVV', trigger: 'blur' },
        { min: 3, max: 4, message: 'CVV must be 3 or 4 digits', trigger: 'blur' }
      ]
    }

    const formatCardNumber = (value) => {
      // Remove all non-digit characters
      const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
      
      // Add spaces every 4 digits
      const matches = v.match(/\d{4,16}/g)
      const match = matches && matches[0] || ''
      const parts = []
      
      for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4))
      }
      
      if (parts.length) {
        cardForm.cardNumber = parts.join(' ')
      } else {
        cardForm.cardNumber = v
      }
    }

    const formatExpiration = (value) => {
      // Remove all non-digit characters
      const v = value.replace(/\D/g, '')
      
      // Add slash after 2 digits
      if (v.length >= 2) {
        cardForm.expiration = v.substring(0, 2) + '/' + v.substring(2, 4)
      } else {
        cardForm.expiration = v
      }
    }

    const handleCancel = () => {
      // Reset form
      cardFormRef.value.resetFields()
    }

    const handleConfirm = () => {
      cardFormRef.value.validate((valid) => {
        if (valid) {
          console.log('Form submitted:', cardForm)
          // Handle form submission
        } else {
          console.log('Form validation failed')
        }
      })
    }

    return {
      cardForm,
      cardFormRef,
      rules,
      formatCardNumber,
      formatExpiration,
      handleCancel,
      handleConfirm
    }
  }
}
</script>

<style scoped>
.card-form-container {
  max-width: 480px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
}

.required {
  color: #333;
  font-size: 14px;
  font-weight: 500;
}

.required::before {
  content: '*';
  color: #f56565;
  margin-right: 4px;
}

.payment-icons {
  display: flex;
  gap: 8px;
  align-items: center;
}

.payment-icon {
  width: 32px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
}

.card-input {
  margin-bottom: 0;
}

.form-row {
  display: flex;
  gap: 16px;
}

.expiration-field {
  flex: 1;
}

.cvv-field {
  flex: 1;
}

.cvv-label {
  display: flex;
  align-items: center;
  gap: 6px;
}

.info-icon {
  color: #409eff;
  cursor: pointer;
  font-size: 16px;
}

.verification-notice {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  padding: 12px;
  margin: 20px 0;
  font-size: 13px;
  color: #666;
  line-height: 1.4;
}

.button-row {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.cancel-btn {
  flex: 1;
  height: 44px;
  background-color: #f5f5f5;
  border: 1px solid #d9d9d9;
  color: #666;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.5px;
}

.cancel-btn:hover {
  background-color: #e8e8e8;
  border-color: #bfbfbf;
}

.confirm-btn {
  flex: 1;
  height: 44px;
  background-color: #17a2b8;
  border-color: #17a2b8;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.5px;
}

.confirm-btn:hover {
  background-color: #138496;
  border-color: #117a8b;
}

:deep(.el-form-item__label) {
  padding-bottom: 8px;
  font-weight: 500;
  color: #333;
}

:deep(.el-input__wrapper) {
  border-radius: 6px;
  border: 1px solid #d9d9d9;
  box-shadow: none;
  padding: 12px;
}

:deep(.el-input__wrapper:hover) {
  border-color: #409eff;
}

:deep(.el-input__wrapper.is-focus) {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
}

:deep(.el-input__inner) {
  font-size: 14px;
  color: #333;
}

:deep(.el-input__inner::placeholder) {
  color: #999;
}

:deep(.el-form-item__error) {
  color: #f56565;
  font-size: 12px;
  margin-top: 4px;
}
</style>