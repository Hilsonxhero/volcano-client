<template>
  <div class="ml-4">
    <div v-if="store.isLoggedIn" @click="showAccountDialog()">
      <base-button icon type="text" size="small">
        <nuxt-icon name="menu-bulk" class="w-5 h-5"></nuxt-icon>
      </base-button>
    </div>
    <base-dialog v-model="visible_account" title=" " custom-class="lg:w-[50%]">
      <div class="mb-4">
        <div
          class="flex items-center border-b border-gray-300 pb-4 w-full cursor-pointer"
        >
          <div
            class="bg-gray-200 rounded-2xl flex justify-center items-center min-w-[2.75rem] h-[2.75rem] ml-2"
          >
            <nuxt-icon class="w-8 h-8" name="cube-scan-bulk"></nuxt-icon>
          </div>
          <div class="flex flex-col">
            <div class="mr-2 text-gray-600 text-xs">
              <!-- {{ project?.title }} -->
            </div>
            <!-- <div class="mr-2 text-gray-500 text-xs mt-1">مدیریت پروژه</div> -->
          </div>
        </div>
      </div>
      <div class="grid grid-cols-12 gap-4">
        <div
          class="col-span-12 lg:col-span-6"
          v-for="(page, index) in pages"
          :key="index"
        >
          <router-link
            :to="{
              name: page.route,
            }"
            class="flex items-center bg-gray-100 rounded-xl p-2"
            active-class="active"
          >
            <span
              class="bg-gray-200 rounded-2xl flex justify-center items-center min-w-[2.75rem] h-[2.75rem] ml-2"
            >
              <span v-if="page.svgIcon" class="svg-icon svg-icon-2">
                <nuxt-icon :name="page.svgIcon" class="w-6 h-6"></nuxt-icon>
              </span>
            </span>
            <span class="menu-title">{{ page.heading }}</span>
          </router-link>
        </div>
      </div>
    </base-dialog>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/modules/auth/store";
import { usePortalStore } from "@/modules/portal/store/portal";
import { storeToRefs } from "pinia";

const store = useAuthStore();
const { user } = storeToRefs(store);
const portalStore = usePortalStore();
const visible_account = ref(false);
const route = useRoute();

const pages = ref([
  {
    heading: "داشبورد",
    route: "portal-dashboard",
    svgIcon: "board",
  },
  {
    heading: "پروژه ها",
    route: "portal-projects-index",
    svgIcon: "note-bulk",
    permissions: ["portal_pages_management_index"],
  },
]);

const showAccountDialog = () => {
  visible_account.value = true;
};

onMounted(() => {});
</script>

<style scoped></style>
