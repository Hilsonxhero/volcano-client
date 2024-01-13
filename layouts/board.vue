<template>
  <div class="page flex flex-row flex-column-fluid">
    <!-- <BaseAside></BaseAside> -->

    <div class="flex flex-col flex-row-fluid wrapper">
      <BaseHeader title="pageTitle" @show-nav="handleShowNav"></BaseHeader>

      <div class="content flex flex-col flex-column-fluid">
        <div class="post flex flex-column-fluid">
          <div class="container w-full mt-2">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseHeader from "@/modules/portal/components/layouts/project/header/Header.vue";
import BaseAside from "@/modules/portal/components/layouts/board/aside/Aside.vue";
import { BaseSkeleton, BaseSkeletonItem } from "@/components/base/skeleton";
import { usePortalStore } from "@/modules/portal/store/portal";

definePageMeta({});

useHead({
  title: "پنل کاربر",
  bodyAttrs: {
    class:
      "page-loading-enabled header-fixed header-tablet-and-mobile-fixed toolbar-enabled toolbar-fixed toolbar-tablet-and-mobile-fixed aside-enabled aside-fixed",
  },
});
const loading = ref(true);
const active = ref(false);
const store = usePortalStore();
const route = useRoute();
const project_id = ref(null);
provide("show", active);
const handleShowNav = (value: boolean) => {
  active.value = value;
};
onMounted(() => {});

// HtmlClass.init();
</script>

<style scoped></style>
