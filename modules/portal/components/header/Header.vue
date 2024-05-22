<template>
  <div class="header items-stretch">
    <div class="container flex items-center justify-between">
      <div>
        <PortalMenu />
      </div>
      <div>
        <BaseAccountProfile />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseLogo from "@/components/app/BaseLogo.vue";
import { useAuthStore } from "@/modules/auth/store";
import BaseAccountProfile from "@/modules/auth/components/profile/BaseAccountProfile.vue";
import PortalMenu from "@/modules/portal/components/portal/projects/navbar/PortalMenu.vue";

import { ref } from "vue";

const emits = defineEmits(["show-nav"]);

onMounted(() => {});
</script>

<style scoped></style>
