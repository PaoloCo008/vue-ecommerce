<script lang="ts" setup>
defineProps<{ label: string }>()
</script>

<template>
  <div class="address-content">
    <p class="address-label">{{ label }}</p>
    <div>
      <p class="recipient-name">Isabella Aguinaldo</p>
      <p class="address-line">26 Mabini St. Purok 2</p>
      <p class="address-line">Bulacan - Malolos - Mojon</p>
      <p class="phone">(+63) 09229115407</p>
    </div>
  </div>
</template>

<style>
.address-content {
  padding: 10px 0;
  width: clamp(150px, 100%, 200px);
}

.address-label {
  font-size: 12px;
  color: #999;
  font-weight: 600;
  margin: 0 0 10px 0;
  text-transform: uppercase;
}

.recipient-name {
  font-weight: 600;
  color: #333;
  margin: 0 0 4px 0;
}

.address-line,
.phone {
  color: #666;
  margin: 0 0 4px 0;
}
</style>
