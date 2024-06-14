<template>
  <ClientOnly>
    <div
      class="bg-gray-100 px-5 py-6 flex flex-col justify-center items-center rounded-xl my-10"
    >
      <nuxt-icon class="w-20 h-20" :name="icon"></nuxt-icon>

      <div class="mt-4">
        <slot></slot>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
const props = defineProps({
  icon: {
    type: String,
    default: "box",
  },
});
</script>
