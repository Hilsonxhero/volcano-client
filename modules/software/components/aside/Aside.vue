<template>
  <base-skeleton class="aside" animated :loading="loading">
    <template #template>
      <base-skeleton-item
        variant="card"
        class="w-[265px] h-full"
      ></base-skeleton-item>
    </template>
    <template #default>
      <div
        ref="asideRef"
        class="hx-aside aside aside-hoverable drawer-end"
        :class="['aside-light', show && 'drawer-on']"
      >
        <div class="aside-logo flex-column-auto py-6 px-6">
          <!-- <nuxt-link
        :to="{ name: 'home' }"
        class="mx-auto flex justify-center w-1/2"
      >
        <img src="~/assets/media/logo-base.svg" class="max-h-75px" />
      </nuxt-link> -->
          <!-- <BaseLogo dark /> -->

          <div
            class="flex items-center border-b border-gray-300 pb-4 w-full cursor-pointer"
          >
            <div
              class="bg-gray-200 rounded-2xl flex justify-center items-center min-w-[2.75rem] h-[2.75rem] ml-2"
            >
              <nuxt-icon class="w-8 h-8" name="cube-scan-bulk"></nuxt-icon>
            </div>
            <div class="flex flex-col">
              <div class="mr-2 text-gray-600 text-xs">{{ project?.title }}</div>
              <div class="mr-2 text-gray-500 text-xs mt-1">مدیریت پروژه</div>
            </div>
          </div>

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
  </base-skeleton>
</template>

<script setup lang="ts">
//@ts-nocheckk
import BaseLogo from "@/components/app/BaseLogo.vue";
import HXMenu from "@/modules/software/components/aside/Menu.vue";
// import useClickOutside from "@/core/hooks/useClickOutside";
import { useAuthStore } from "@/modules/auth/store";
import { storeToRefs } from "pinia";
import { onClickOutside } from "@vueuse/core";
import { useSoftwareStore } from "@/modules/software/store/software";
import { BaseSkeleton, BaseSkeletonItem } from "@/components/base/skeleton";

const softwareStore = useSoftwareStore();

const store = useAuthStore();
const { user } = storeToRefs(store);
const { project } = storeToRefs(softwareStore);

const asideRef = ref(null);
const loading = ref(true);
const project_id = ref(null);

const show = inject("show", false);

// const { onClickOutside } = useClickOutside();

onClickOutside(asideRef, () => {
  if (show.value === true) {
    show.value = false;
  }
});

const handleFetchProject = async () => {
  const data = await softwareStore.fetchProject(project_id.value);
  loading.value = false;
};

onMounted(() => {
  const paramId = useState("routeParamId");
  project_id.value = paramId.value;
  handleFetchProject();
});
</script>

<style scoped></style>
