<template>
  <div ref="scrollElRef" class="hover-scroll-overlay-y my-5 my-lg-5">
    <div
      class="menu flex-col menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500"
    >
      <template v-for="(item, i) in pages" :key="i">
        <div v-if="item.heading" class="menu-item">
          <div class="menu-content pt-8 pb-2">
            <span class="menu-section text-gray-400 text-uppercase text-sm">
              {{ item.heading }}
            </span>
          </div>
        </div>

        <template v-for="(menuItem, j) in item.pages" :key="j">
          <template v-if="menuItem.heading">
            <div class="menu-item">
              <nuxt-link
                exact
                class="menu-link"
                active-class="active"
                :class="{ active: hasActiveChildren(menuItem.active) }"
                :to="menuItem.route"
              >
                <span
                  v-if="menuItem.svgIcon"
                  class="bg-gray-200 rounded-2xl flex justify-center items-center min-w-[2.75rem] h-[2.75rem] ml-2"
                >
                  <span class="svg-icon svg-icon-2">
                    <nuxt-icon
                      :name="menuItem.svgIcon"
                      class="w-6 h-6"
                    ></nuxt-icon>
                  </span>
                </span>
                <span class="menu-title">{{ menuItem.heading }}</span>
              </nuxt-link>
            </div>
          </template>

          <div
            v-if="menuItem.sectionTitle"
            :class="{ show: hasActiveChildren(menuItem.route) }"
            class="menu-item"
          >
            <base-collapse menu accordion>
              <base-collapse-item menu class="menu-item">
                <template #title>
                  <span class="menu-link">
                    <span v-if="menuItem.svgIcon" class="menu-icon">
                      <span class="svg-icon svg-icon-2">
                        <!-- <inline-svg :src="menuItem.svgIcon" /> -->
                        <nuxt-icon
                          :name="menuItem.svgIcon"
                          class="w-6 h-6"
                        ></nuxt-icon>
                      </span>
                    </span>
                    <span class="menu-title">{{ menuItem.sectionTitle }}</span>
                    <span class="menu-arrow"></span>
                  </span>
                </template>

                <template v-for="(item2, k) in menuItem.sub" :key="k">
                  <div v-if="item2.heading" class="menu-item">
                    <router-link class="menu-link" active-class="active" to="/">
                      <span class="menu-bullet">
                        <span class="bullet bullet-dot"></span>
                      </span>
                      <span class="menu-title">{{ item2.heading }}</span>
                    </router-link>
                  </div>

                  <div
                    v-if="item2.sectionTitle"
                    :class="{ show: hasActiveChildren(item2.route) }"
                    class="menu-item"
                  >
                    <base-collapse menu accordion>
                      <base-collapse-item menu>
                        <template #title>
                          <span class="menu-link">
                            <span class="menu-bullet">
                              <span class="bullet bullet-dot"></span>
                            </span>
                            <span class="menu-title">{{
                              item2.sectionTitle
                            }}</span>
                            <span class="menu-arrow"></span>
                          </span>
                        </template>

                        <div
                          :class="{ show: hasActiveChildren(item2.route) }"
                          class=""
                        >
                          <template v-for="(item3, k) in item2.sub" :key="k">
                            <div v-if="item3.heading" class="menu-item">
                              <router-link
                                class="menu-link"
                                active-class="active"
                                to="/"
                              >
                                <span class="menu-bullet">
                                  <span class="bullet bullet-dot"></span>
                                </span>
                                <span class="menu-title">{{
                                  item3.heading
                                }}</span>
                              </router-link>
                            </div>
                          </template>
                        </div>
                      </base-collapse-item>
                    </base-collapse>
                  </div>
                </template>
              </base-collapse-item>
            </base-collapse>
          </div>
        </template>
      </template>

      <div class="menu-item">
        <div class="menu-content">
          <div class="separator mx-1 my-4"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
//@ts-nocheckk
import { BaseCollapseItem, BaseCollapse } from "@/components/base/collapse";
import MainMenuConfig from "@/core/config/MainMenuConfig";
import { useAuthStore } from "@/modules/auth/store";

const router = useRouter();
const store = useAuthStore();

const route = useRoute();
const scrollElRef = ref<null | HTMLElement>(null);

const pages = ref([
  {
    pages: [
      {
        heading: "داشبورد",
        route: { name: "portal-dashboard" },
        active: "dashboard",
        svgIcon: "home-bulk",
      },
      {
        heading: "دسته بندی ها",
        route: { name: "management-categories-index" },
        active: "categories",
        svgIcon: "category-bulk",
      },
      {
        heading: "پروژه ها",
        route: { name: "portal-projects-index" },
        active: "projects",
        svgIcon: "projects",
      },
      {
        heading: "کاربران",
        route: { name: "management-users-index" },
        active: "users",
        svgIcon: "group",
      },
      {
        heading: "سطح دسترسی ها",
        route: { name: "management-roles-index" },
        active: "roles",
        svgIcon: "shield-tick",
      },
      {
        heading: "خدمات",
        route: { name: "portal-projects-index" },
        active: "projects",
        svgIcon: "services-bulk",
      },
      {
        heading: "مقالات",
        route: { name: "management-articles-index" },
        active: "articles",
        svgIcon: "articles-bulk",
      },
      {
        heading: "صفحات",
        route: { name: "management-pages-index" },
        active: "pages",
        svgIcon: "note-bulk",
      },
      {
        heading: "تنظیمات",
        route: { name: "management-setting-index" },
        active: "setting",
        svgIcon: "setting-bulk",
      },
    ],
  },
]);

onMounted(() => {
  if (scrollElRef.value) {
    scrollElRef.value.scrollTop = 0;
  }
});

const handleLogout = async () => {
  try {
    await store.logout();
    router.push("/");
  } catch (error) {}
};

const hasActiveChildren = (match) => {
  // return route.path.indexOf(match) !== -1;
  return route.path.includes(match);
};

const isLinkActive = (route) => {
  return route.path === route;
};
</script>
