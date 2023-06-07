<template>
  <div class="w-full">
    <nuxt-link v-if="dark" :to="{ name: 'home' }" class="">
      <img src="~/assets/media/logo-dark.svg" class="max-h-40px w-3/4" />
    </nuxt-link>
    <nuxt-link v-else :to="{ name: 'home' }" class="">
      <img src="~/assets/media/logo-light.svg" class="max-h-40px w-3/4" />
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  dark: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped></style>
