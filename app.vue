<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useWebStore } from "@/modules/web/store";

const webStore = useWebStore();
const { variables } = storeToRefs(webStore);
onMounted(() => {
  webStore.fetchVariables();
});

useHead({
  title: computed(() => variables.value?.site_name),
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
