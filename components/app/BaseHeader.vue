<template>
  <div>
    <header class="t-header py-4 t-sticky-top">
      <div class="container">
        <div class="h-16">
          <div class="flex items-center h-full justify-between">
            <div class="flex items-center">
              <base-button
                class="block lg:hidden"
                icon
                variant="gray"
                @click="showNavHandler"
              >
                <nuxt-icon class="text-gray-400" name="menu-bulk"></nuxt-icon>
              </base-button>
              <nuxt-link to="/" class="hidden lg:block">
                <div href="" class="t-header__logo">
                  <img src="~/assets/media/logo-base.svg" class="" />
                </div>
              </nuxt-link>

              <nav
                ref="navRef"
                class="t-header__nav lg:bg-transparent flex flex-col w-full lg:w-full z-[6]"
                :class="{ 'is-active': active }"
              >
                <ul
                  class="flex flex-col space-y-6 lg:space-y-0 p-5 lg:flex-row lg:items-center h-full"
                >
                  <li class="ml-5" v-for="(item, index) in menus">
                    <nuxt-link to="/">
                      <span class="font-normal text-gray-200">{{
                        item.title
                      }}</span>
                    </nuxt-link>
                  </li>
                </ul>

                <div class="flex flex-col pb-6 px-4 md:hidden">
                  <a
                    href=""
                    class="text-white overflow-hidden relative rounded-[14px] py-4 px-8 border border-white border-solid ml-4 block w-full text-center"
                  >
                    ورود
                  </a>
                  <a
                    href=""
                    class="primary-button-two text-white overflow-hidden relative rounded-[14px] py-4 px-8 w-full block mt-2 text-center"
                  >
                    شروع رایگان
                  </a>
                </div>
              </nav>
            </div>

            <div
              class="flex lg:hidden items-center absolute left-1/2 transform -translate-x-1/2"
            ></div>
            <div class="flex items-center">
              <div class="hidden lg:flex">
                <!-- <BaseButton class="mr-2" variant="light">
                  <nuxt-icon name="user-bulk"></nuxt-icon>
                </BaseButton> -->
                <nuxt-link
                  :to="{ name: 'auth' }"
                  class="text-white overflow-hidden relative rounded-[14px] py-4 px-8 border border-white border-solid ml-4"
                >
                  ورود
                </nuxt-link>
                <a
                  href=""
                  class="primary-button-two text-white overflow-hidden relative rounded-[14px] py-4 px-8"
                >
                  شروع رایگان
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";

const menus = ref([
  { title: "صفحه اصلی", to: "" },
  { title: "درباره ما", to: "" },
  { title: "مقالات", to: "" },
]);
const navRef = ref(null);

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
