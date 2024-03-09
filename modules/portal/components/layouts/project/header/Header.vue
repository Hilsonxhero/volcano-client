<template>
  <div class="header items-stretch">
    <div class="flex items-center justify-between w-full px-8">
      <div>
        <div class="hidden lg:flex items-center">
          <div>
            <BaseLogo dark />
          </div>
          <!-- <div
            class="menu menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500"
          >
            <div class="menu-item" v-for="(page, j) in pages" :key="j">
              <nuxt-link
                class="menu-link"
                active-class="active"
                :to="{ name: page.route }"
              >
                <span class="menu-title">{{ page.title }}</span>
              </nuxt-link>
            </div>
          </div> -->
        </div>
        <!-- <div class="flex items-center lg:hidden ml-3" @click="handleShowNav">
          <div class="btn btn-icon btn-active-light-primary">
            <span class="svg-icon svg-icon-2x mt-1">
              <nuxt-icon name="menu" class="w-7 h-7 text-gray-500" />
            </span>
          </div>
        </div> -->
        <div class="flex lg:hidden">
          <ProjectMenu />
        </div>

        <!--end::Aside mobile toggle-->
      </div>

      <div class="flex items-center">
        <!-- <div class="ml-4">
          <base-button icon type="text" size="small">
            <nuxt-icon name="menu-bulk" class="w-5 h-5"></nuxt-icon>
          </base-button>
        </div> -->
        <div class="hidden lg:flex">
          <ProjectMenu />
        </div>
        <BaseAccountProfile />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseLogo from "@/components/app/BaseLogo.vue";
import BaseAccountProfile from "@/modules/auth/components/profile/BaseAccountProfile.vue";
import ProjectMenu from "@/modules/portal/components/portal/projects/navbar/ProjectMenu.vue";

const pages = ref([
  {
    title: "داشبورد",
    route: "portal-dashboard",
  },
  {
    title: "پروژه ها",
    route: "portal-projects-index",
  },
]);

const active = ref(false);

const emits = defineEmits(["show-nav"]);

const handleShowNav = () => {
  active.value = true;
  emits("show-nav", active.value);
};
</script>

<style scoped></style>
