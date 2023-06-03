<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: {
    class: "dark",
    "data-theme": "dark",
  },
});
</script>

<style lang="scss">
:root {
}

html[data-theme="dark"] {
}

body {
}
</style>
