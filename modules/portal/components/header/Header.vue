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
        <div @click="showAccountDialog()">
          <base-avatar fit="cover" shape="circle">
            <img src="~/assets/media/faces/2.jpg" class="" />
          </base-avatar>
        </div>
      </div>
    </div>
    <base-dialog v-model="visible_account" title="حساب کاربری">
      <div
        class="group t-flex-between-center border-b-gray-300 px-2 hover:bg-gray-100 border-b hover:border-transparent hover:rounded-lg transition-all"
      >
        <div class="flex items-center w-full cursor-pointer">
          <div
            class="w-[2.6rem] overflow-hidden h-[2.6rem] flex items-center justify-center lg:w-[3.5rem] lg:h-[3.5rem] ml-3 rounded-full lg:bg-gray-100 lg:rounded-lg"
          >
            <img
              class="w-full h-full object-cover border-gray-300 overflow-hidden"
              src="~/assets/media/faces/1.jpg"
              alt="avatar"
            />
          </div>
          <div class="flex flex-col justify-between pb-3 pt-2 w-max">
            <div
              class="leading-[1.5625rem] mb-2 text-sm font-bold lg:text-typo lg:font-extrabold"
            >
              {{ store.user?.user?.email }}
            </div>
            <div
              class="text-typo-light text-xs leading-5 lg:font-bold text-right"
            >
              {{ store.user?.user?.username }}
            </div>
          </div>
        </div>
        <i
          color="#666"
          name="t-icon-arrow_back_ios_new-24px"
          class="group-hover:block hidden ml-2 group-hover:text-primary text-sm transition-all material-icons t-icon-arrow_back_ios_new-24px"
        ></i>
      </div>

      <div class="mt-3">
        <div
          @click="handleLogout"
          class="group flex items-center py-2 px-2 hover:text-danger hover:bg-gray-100 rounded-lg cursor-pointer"
        >
          <div
            class="flex items-center justify-center profile-item-container min-w-[2.75rem] h-11 rounded-2xl text-[rgb(188, 91, 204)] profile-item-container lg:transition lg:duration-500"
          >
            <nuxt-icon
              name="logout"
              class="w-6 h-6 fill-current text-primary icon sprite-next text-blue-600"
            ></nuxt-icon>
          </div>
          <span
            class="block text-center group-hover:text-danger text-sm group-hover:font-bold font-bold mr-2"
            >خروج از حساب کاربری</span
          >
        </div>
      </div>
    </base-dialog>
  </div>
</template>

<script setup lang="ts">
import BaseLogo from "@/components/app/BaseLogo.vue";
import { useAuthStore } from "@/modules/auth/store";
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

onMounted(() => {
  console.log("user", store?.user?.user);
});
</script>

<style scoped></style>
