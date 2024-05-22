<template>
  <div>
    <div class="section-navbar">
      <div
        data-collapse="medium"
        data-animation="default"
        data-duration="400"
        data-easing="ease"
        data-easing2="ease"
        role="banner"
        class="navbar w-nav"
      >
        <div class="w-layout-grid grid-navbar">
          <div class="nav">
            <a
              href="/"
              aria-current="page"
              class="brand w-nav-brand w--current"
              aria-label="home"
              ><img
                :src="variables?.logo_light"
                loading="eager"
                alt=""
                class="logo"
            /></a>
          </div>
          <div class="nav">
            <nav
              role="navigation"
              class="nav-menu w-nav-menu"
              :class="{ 'is-active': active }"
            >
              <nuxt-link
                v-for="(item, index) in menus"
                :to="{ name: item.route }"
                class="nav-link w-nav-link"
                >{{ item?.title }}</nuxt-link
              >
            </nav>
          </div>
          <div class="nav right">
            <div class="hidden lg:block">
              <template v-if="isLoggedIn">
                <nuxt-link :to="{ name: 'auth' }">
                  <nuxt-icon class="text-gray-400" name="user-bulk"></nuxt-icon>
                </nuxt-link>
              </template>
              <template v-else>
                <nuxt-link :to="{ name: 'auth' }">
                  <nuxt-icon class="text-gray-400" name="user-bulk"></nuxt-icon>
                </nuxt-link>
              </template>
            </div>
            <div class="ml-3 lg:hidden">
              <nuxt-link :to="{ name: 'auth' }">
                <nuxt-icon class="text-gray-400" name="user-bulk"></nuxt-icon>
              </nuxt-link>
            </div>

            <div
              class="lg:hidden"
              aria-label="menu"
              role="button"
              tabindex="0"
              aria-controls="w-nav-overlay-0"
              aria-haspopup="menu"
              aria-expanded="false"
              @click="showNavHandler"
            >
              <nuxt-icon class="text-gray-400" name="menu-bulk"></nuxt-icon>
            </div>
          </div>
        </div>
        <div class="navbar-bg"></div>
        <div class="w-nav-overlay" data-wf-ignore="" id="w-nav-overlay-0"></div>
      </div>
    </div>

    <base-dialog
      custom-class="base-heade-menu"
      v-model="active"
      title=""
      @close="handleOnCloseNavbarDialog"
    >
      <div class="py-5">
        <div
          v-for="(item, index) in menus"
          class="group flex items-center py-2 px-2 hover:text-danger rounded-xl cursor-pointer mb-2"
        >
          <div
            class="flex items-center justify-center profile-item-container min-w-[2.75rem] h-11 rounded-2xl text-[rgb(188, 91, 204)] profile-item-container lg:transition lg:duration-500"
          >
            <nuxt-icon
              name="command-square"
              class="w-6 h-6 fill-current text-primary icon sprite-next text-white"
            ></nuxt-icon>
          </div>
          <nuxt-link
            :to="{ name: item.route }"
            class="block text-center group-hover:text-danger text-sm group-hover:font-bold font-bold mr-2 text-white"
          >
            {{ item?.title }}</nuxt-link
          >
        </div>
      </div>
    </base-dialog>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { useAuthStore } from "@/modules/auth/store";
import { storeToRefs } from "pinia";
import { useWebStore } from "@/modules/web/store";
const webStore = useWebStore();
const { variables } = storeToRefs(webStore);
const store = useAuthStore();
const { user, isLoggedIn } = storeToRefs(store);

const menus = ref([
  { title: "صفحه اصلی", route: "home" },
  { title: "درباره ما", route: "about" },
  { title: "ارتباط ما", route: "contact" },
  { title: "مقالات", route: "articles-index" },
]);
const navRef = ref(null);

const handleOnCloseNavbarDialog = () => {};

onClickOutside(navRef, (event) => {
  active.value = false;
});

const active = ref(false);

const showNavHandler = () => {
  active.value = true;
};
</script>

<style lang="scss" scoped>
.t-header__nav {
}
</style>
