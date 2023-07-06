<template>
  <div class="hx-form-item__error" v-for="(error, i) in errors[field]" :key="i">
    {{ error }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  errors: {},
  field: {},
});
</script>

<style scoped></style>
