<template>
  <div class="flex flex-col items-center h-screen justify-center">
    <div>
      <h2 class="text-5xl font-bold my-8">403</h2>
    </div>
    <div class="text-xl text-gray-600 mb-4">
      ممکن است اعتبار لازم برای دسترسی به منبع درخواستی را نداشته باشید
    </div>
    <div class="mt-3">
      <base-button type="primary" @click="navigateToHome()">
        صفحه اصلی
      </base-button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "error",
});

const navigateToHome = () => {
  navigateTo("/");
};
</script>

<style scoped></style>
