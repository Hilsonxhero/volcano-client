<template>
  <div>
    <main>
      <slot />
    </main>
  </div>
</template>
<script setup lang="ts">
// definePageMeta({
//   middleware: ["auth"],
// });
useHead({
  bodyAttrs: {
    class: " master-layout",
  },
});
</script>
<style lang="scss"></style>
