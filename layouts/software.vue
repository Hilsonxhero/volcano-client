<template>
  <div class="page flex flex-row flex-column-fluid">
    <BaseAside></BaseAside>

    <div class="flex flex-col flex-row-fluid wrapper">
      <BaseHeader title="pageTitle" @show-nav="handleShowNav"></BaseHeader>

      <div class="content flex flex-col flex-column-fluid">
        <div class="post flex flex-column-fluid">
          <div class="container w-full mt-10">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseHeader from "@/modules/software/components/header/Header.vue";
import BaseAside from "@/modules/software/components/aside/Aside.vue";

useHead({
  title: "پنل کاربر",
  bodyAttrs: {
    class:
      "page-loading-enabled header-fixed header-tablet-and-mobile-fixed toolbar-enabled toolbar-fixed toolbar-tablet-and-mobile-fixed aside-enabled aside-fixed",
  },
});

const active = ref(false);

const handleShowNav = (value: boolean) => {
  active.value = value;
};

provide("show", active);

// HtmlClass.init();
</script>

<style scoped></style>
