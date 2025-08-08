<script lang="ts" setup>
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{ handler: (number: number) => void; initialValue?: number }>(),
  { handler: () => [], initialValue: 1 },
)

const emit = defineEmits<{ (e: 'onInput'): void }>()

const count = ref(props.initialValue)

const increment = () => {
  count.value++
  props.handler(count.value)
}

const decrement = () => {
  if (count.value > 0) {
    count.value--
    props.handler(count.value)
  }
}

const validateInput = (event) => {
  const value = event.target.value.replace(/\D/g, '')
  count.value = value ? parseInt(value, 10) : 0
}

function handleEnter() {
  props.handler(count.value)
  emit('onInput')
}
</script>

<template>
  <div class="count">
    <button class="count-btn" @click="decrement" :disabled="count <= 0">−</button>

    <input
      ref="inputRef"
      v-model="count"
      class="count-input"
      type="text"
      inputmode="numeric"
      @input="validateInput"
      @keydown.enter="handleEnter"
    />

    <button class="count-btn" @click="increment">+</button>
  </div>
</template>

<style scoped>
.count {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #1a1a1a;
  padding: 8px 16px;
  border-radius: 8px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.count-btn {
  background: transparent;
  border: 1px solid #444;
  color: #fff;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.count-btn:hover:not(:disabled) {
  background: #333;
  border-color: #666;
}

.count-btn:active:not(:disabled) {
  background: #222;
  transform: scale(0.95);
}

.count-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.count-input {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  width: 60px;
  text-align: center;
  padding: 4px 8px;
  outline: none;
}

/* Hide number input arrows */
.count-input::-webkit-outer-spin-button,
.count-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
.count-input[type='number'] {
  -moz-appearance: textfield;
}
</style>
