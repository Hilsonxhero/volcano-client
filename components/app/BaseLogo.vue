<template>
  <div class="">
    <nuxt-link :to="{ name: 'home' }">
      <img
        :src="dark ? variables?.logo_dark : variables?.logo_light"
        loading="eager"
        alt=""
        class="h-[26px] max-w-none"
        :class="class"
      />
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  dark: {
    type: Boolean,
    default: false,
  },
  class: {
    type: String,
    default: "logo",
  },
});

import { storeToRefs } from "pinia";
import { useWebStore } from "@/modules/web/store";
const webStore = useWebStore();
const { variables } = storeToRefs(webStore);
</script>

<style scoped></style>
