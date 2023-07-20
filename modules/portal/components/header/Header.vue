<template>
  <div class="header items-stretch">
    <div class="container flex items-center justify-between">
      <div>
        <div class="flex items-center">
          <div>
            <BaseLogo dark />
          </div>
          <div
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
          </div>
        </div>
        <div class="flex items-center lg:hidden ml-3" @click="handleShowNav">
          <div class="btn btn-icon btn-active-light-primary">
            <span class="svg-icon svg-icon-2x mt-1">
              <nuxt-icon name="menu" class="w-7 h-7 text-gray-500" />
            </span>
          </div>
        </div>
        <!--end::Aside mobile toggle-->
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
import { ref } from "vue";
const visible_account = ref(false);
const store = useAuthStore();
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

const handleLogout = async () => {
  try {
    await store.logout();
    navigateTo("/");
  } catch (error) {}
};

const showAccountDialog = () => {
  visible_account.value = true;
};

onMounted(() => {});
</script>

<style scoped></style>
