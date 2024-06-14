<template>
  <div class="flex flex-col items-center h-screen justify-center">
    <div>
      <h2 class="text-5xl font-bold my-8">{{ error.statusCode }}</h2>
    </div>
    <div class="text-xl text-gray-600 mb-4">
      <template v-if="error.statusCode == 404">
        صفحه مورد نظر یافت نشد
      </template>
      {{ error.message }}
    </div>
    <div class="mt-3">
      <base-button type="primary" @click="navigateToHome()">
        صفحه اصلی
      </base-button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps(["error"]);

const navigateToHome = () => {
  navigateTo("/");
};
</script>

<style scoped></style>
