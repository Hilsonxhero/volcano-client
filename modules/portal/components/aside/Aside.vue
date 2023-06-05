<template>
  <div
    ref="asideRef"
    class="hx-aside aside aside-hoverable drawer-end"
    :class="['aside-light', show && 'drawer-on']"
  >
    <div class="aside-logo flex-column-auto py-6">
      <!-- <nuxt-link
        :to="{ name: 'home' }"
        class="mx-auto flex justify-center w-1/2"
      >
        <img src="~/assets/media/logo-base.svg" class="max-h-75px" />
      </nuxt-link> -->
      <BaseLogo dark />

      <div
        class="btn btn-icon w-auto px-0 btn-active-color-primary aside-toggle"
      >
        <span class="svg-icon svg-icon-1 rotate-180"> </span>
      </div>
    </div>

    <div class="aside-menu flex-column-fluid">
      <HXMenu></HXMenu>
    </div>

    <div class="aside-footer flex-column-auto pt-5 pb-7 px-5"></div>
    <!-- <hx-overlay :active="show"></hx-overlay> -->
    <!--end::Footer-->
  </div>
</template>

<script setup lang="ts">
//@ts-nocheckk
import BaseLogo from "@/components/app/BaseLogo.vue";
import HXMenu from "@/modules/portal/components/aside/Menu.vue";
// import useClickOutside from "@/core/hooks/useClickOutside";
import { useAuthStore } from "@/modules/auth/store";
import { storeToRefs } from "pinia";

const store = useAuthStore();
const { user } = storeToRefs(store);

const asideRef = ref(null);

const show = inject("show", false);

// const { onClickOutside } = useClickOutside();

// onClickOutside(asideRef, () => {
//   if (show.value === true) {
//     show.value = false;
//   }
// });
</script>

<style scoped></style>
