<template>
  <div class="default-layout">
    <BaseHeader />
    <main>
      <slot />
    </main>
    <BaseFooter />
  </div>
</template>

<script setup lang="ts">
import BaseHeader from "@/components/app/BaseHeader.vue";
import BaseFooter from "@/components/app/BaseFooter.vue";

useHead({
  bodyAttrs: {
    class: "pt-24 master-layout",
  },
});
</script>

<style scoped lang="scss"></style>
