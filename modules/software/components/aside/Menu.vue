<template>
  <div ref="scrollElRef" class="hover-scroll-overlay-y my-5 my-lg-5">
    <div
      class="menu flex-col menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500"
    >
      <template v-for="(item, i) in project.pages" :key="i">
        <div v-if="item.title" class="menu-item">
          <div class="menu-content pt-8 pb-2">
            <span class="text-gray-900 text-uppercase text-base">
              {{ item.title }}
            </span>
          </div>
        </div>

        <template v-for="(menuItem, j) in item.children" :key="j">
          <template v-if="menuItem.title">
            <div class="menu-item">
              <nuxt-link
                class="menu-link"
                active-class="active"
                :to="{
                  name: 'software-projects-pages-show',
                  params: {
                    id: project.id,
                    slug: project.slug,
                    page: menuItem.id,
                  },
                }"
              >
                <span
                  class="bg-gray-200 rounded-2xl flex justify-center items-center min-w-[2.75rem] h-[2.75rem] ml-2"
                >
                  <span class="svg-icon svg-icon-2">
                    <nuxt-icon name="stickynote" class="w-6 h-6"></nuxt-icon>
                  </span>
                </span>
                <span class="menu-title">{{ menuItem.title }}</span>
              </nuxt-link>
            </div>
          </template>
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
import { useAuthStore } from "@/modules/auth/store";
import { useSoftwareStore } from "@/modules/software/store/software";
import { storeToRefs } from "pinia";

const router = useRouter();
const store = useAuthStore();
const softwareStore = useSoftwareStore();
const { project } = storeToRefs(softwareStore);

const route = useRoute();
const scrollElRef = ref<null | HTMLElement>(null);

const pages = ref([
  {
    heading: "تست",
    pages: [
      {
        heading: "عنوان تست",
        route: "",
      },
      {
        heading: "صفحات",
        route: "",
      },
      {
        heading: "عنوان تست",
        route: "",
      },
      {
        heading: "صفحات",
        route: "",
      },
    ],
  },
  {
    heading: "تست",
    pages: [
      {
        heading: "عنوان تست",
        route: "",
      },
      {
        heading: "صفحات",
        route: "",
      },
    ],
  },
  {
    heading: "تست",
    pages: [
      {
        heading: "عنوان تست",
        route: "",
      },
      {
        heading: "صفحات",
        route: "",
      },
      {
        heading: "عنوان تست",
        route: "",
      },
      {
        heading: "صفحات",
        route: "",
      },
    ],
  },
  {
    heading: "تست",
    pages: [
      {
        heading: "عنوان تست",
        route: "",
      },
      {
        heading: "صفحات",
        route: "",
      },
    ],
  },
  {
    heading: "لورم ایپسوم ",
    pages: [
      {
        heading: "عنوان تست",
        route: "",
      },
      {
        heading: "صفحات",
        route: "",
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
  return route.path.indexOf(match) !== -1;
};
</script>
