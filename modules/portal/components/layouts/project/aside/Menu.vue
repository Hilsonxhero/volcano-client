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
          <template
            v-if="menuItem.heading && hasPermission(menuItem.permissions)"
          >
            <div class="menu-item">
              <router-link
                class="menu-link"
                active-class="active"
                :to="{
                  name: menuItem.route,
                  params: { id: $route.params.id },
                }"
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
              </router-link>
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
//@ts-nocheck
import { BaseCollapseItem, BaseCollapse } from "@/components/base/collapse";
import { useAuthStore } from "@/modules/auth/store";
import { usePortalStore } from "@/modules/portal/store/portal";

const portalStore = usePortalStore();

const router = useRouter();
const store = useAuthStore();
const route = useRoute();
import { storeToRefs } from "pinia";
const { project } = storeToRefs(portalStore);

const scrollElRef = ref<null | HTMLElement>(null);
const { user } = storeToRefs(store);

const pages = ref([
  {
    pages: [
      {
        heading: "داشبورد",
        route: "portal-projects-dashboard",
        svgIcon: "chart",
        // permissions: ["portal_boards_management_index"],
      },
      {
        heading: "تابلو ها",
        route: "portal-projects-boards-index",
        svgIcon: "board",
        permissions: ["portal_boards_management_index"],
      },
      {
        heading: "صفحات",
        route: "portal-projects-pages-index",
        svgIcon: "note-bulk",
        permissions: ["portal_pages_management_index"],
      },
      {
        heading: "کاربران",
        route: "portal-projects-users-index",
        svgIcon: "group",
        permissions: ["portal_users_management_index"],
      },
      {
        heading: "نقش ها ودسترسی ها",
        route: "portal-projects-roles-index",
        svgIcon: "security-user",
        permissions: ["portal_users_management_index"],
      },
      {
        heading: "بخش های سفارشی",
        route: "portal-projects-enumerations-index",
        svgIcon: "category",
        permissions: ["portal_enumerations_management_index"],
      },
      {
        heading: "مسئله ها",
        route: "portal-projects-issues-index",
        svgIcon: "clipboard-tick",
        permissions: ["portal_issue_management_index"],
      },
      {
        heading: "زمان ها",
        route: "portal-projects-issue-times-index",
        svgIcon: "project-time",
        permissions: ["portal_issue_management_index"],
      },
      {
        heading: "تنظیمات",
        route: "portal-projects-setting-variables",
        svgIcon: "setting-bulk",
        permissions: ["portal_project_management_index"],
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

const hasPermission = (permissions) => {
  var has_role = project?.value.members.find(
    (member, index) => member?.user_id == user?.value.id
  );

  if (project?.value.user_id == user?.value.id) {
    return true;
  }
  if (!permissions || permissions == null) {
    return true;
  }
  return has_role?.role?.permission_names.some((permission) =>
    permissions.includes(permission)
  );
};

// app.config.globalProperties.$hasRole = function (user, roles) {
//   if (!roles || roles == null) {
//     return true;
//   }
//   return user && user.role && roles.includes(user.role);
// };

const hasActiveChildren = (match) => {
  return route.path.indexOf(match) !== -1;
};
</script>
