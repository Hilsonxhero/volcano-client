<template>
  <div class="board-canvas">
    <ul class="board-module">
      <li class="w-[272px]" v-for="(board, index) in 6" :key="index">
        <div class="px-4 py-2 rounded-lg bg-gray-100">ایجاد لیست جدید</div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "board",
  middleware: ["auth"],
});
</script>

<style scoped></style>
