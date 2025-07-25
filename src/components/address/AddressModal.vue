<script setup lang="ts">
import ModalTemplate from '../ModalTemplate.vue'
import AddressForm from './AddressForm.vue'
</script>

<template>
  <ModalTemplate title="Register Address" has-content-buttons>
    <AddressForm rendered-from="signup" />
  </ModalTemplate>
</template>

<style scoped></style>
