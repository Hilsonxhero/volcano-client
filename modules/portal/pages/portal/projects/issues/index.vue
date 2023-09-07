<template>
  <div>
    <base-skeleton class="mt-3" animated :loading="loading">
      <template #template>
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12">
            <base-skeleton-item variant="card"></base-skeleton-item>
          </div>
        </div>
      </template>
      <template #default>
        <section>
          <div class="flex justify-end mb-4">
            <base-button
              size="small"
              type="primary"
              class="w-full lg:w-auto"
              :to="{
                name: 'portal-projects-issues-create',
                params: { id: route.params.id },
              }"
            >
              <div class="flex items-center">
                <span class="ml-2"> ایجاد مسئله</span>
                <nuxt-icon name="add"></nuxt-icon>
              </div>
            </base-button>
          </div>
        </section>
        <div class="grid grid-cols-12 gap-4">
          <div
            class="col-span-4"
            v-for="(issue, index) in tableData"
            :key="index"
          >
            <section class="mb-6 bg-white shadow-lg p-4 rounded-2xl">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center">
                  <div
                    class="bg-gray-200 rounded-[30px] py-2 px-6 text-gray-500 font-light flex justify-center items-center"
                  >
                    {{ issue?.tracker?.title }}
                  </div>
                  <div
                    class="border-gray-500 border rounded-[30px] py-2 px-6 text-gray-600 font-light flex justify-center items-center mr-2"
                  >
                    {{ issue?.id }}
                  </div>
                </div>
                <div>
                  <span
                    class="bg-gray-200 cursor-pointer rounded-2xl flex justify-center items-center min-w-[2.6rem] h-[2.6rem] ml-2"
                  >
                    <span class="svg-icon svg-icon-2">
                      <nuxt-icon
                        name="more-out"
                        class="w-6 h-6 text-gray-500"
                      ></nuxt-icon>
                    </span>
                  </span>
                  <!-- <nuxt-icon name="more" class="w-6 h-6"></nuxt-icon> -->
                </div>
              </div>
              <h5 class="text-gray-700 font-bold mb-2">
                {{ issue?.title }}
              </h5>
              <p class="text-gray-400 text-xs">
                {{ issue?.description }}
              </p>

              <div class="flex justify-end mt-2">
                <nuxt-link
                  :to="{
                    name: 'portal-projects-issues-show',
                    params: { id: route.params.id, issue: issue.id },
                  }"
                >
                  <span
                    class="bg-gray-200 cursor-pointer rounded-2xl flex justify-center items-center min-w-[2.6rem] h-[2.6rem] ml-2"
                  >
                    <span class="svg-icon svg-icon-2">
                      <nuxt-icon
                        name="arrow-left"
                        class="w-6 h-6 text-gray-500"
                      ></nuxt-icon>
                    </span>
                  </span>
                </nuxt-link>
              </div>
            </section>
          </div>
        </div>
      </template>
    </base-skeleton>
  </div>
</template>

<script setup lang="ts">
import BaseMessage from "@/components/base/message";
import { BaseMessageBox } from "@/components/base/message-box";
import { BaseDataTable } from "@/components/base/datatable";
import { BaseSkeleton, BaseSkeletonItem } from "@/components/base/skeleton";
import { debounce } from "lodash-unified";

definePageMeta({
  layout: "project",
  middleware: ["auth"],
});
const loading = ref(false);
const pager = ref({});
const current_page = ref(1);
const project_id = ref(null);
const route = useRoute();
const checkedData = ref([]);
const search = ref("");
const tableHeader = ref([
  {
    key: "checkbox",
    sortable: false,
  },
  {
    name: "عنوان",
    key: "title",
    sortable: true,
  },
  {
    name: "نام",
    key: "name",
    sortable: true,
  },
  {
    name: "دسته گروه",
    key: "parent_name",
    sortable: true,
  },
  {
    name: "عملیات",
    key: "actions",
  },
]);
const tableData = ref([]);

watch(
  () => search.value,
  (val) => {
    // fetchProjectIssues();
    debouncedOnInputChange();
  }
);

const handleChangePage = (page) => {
  current_page.value = page;
  fetchProjectIssues();
};

const fetchProjectIssues = async () => {
  let params = {
    page: current_page.value,
    q: search.value,
  };
  // loading.value = true;
  try {
    const { data } = await useApiService.get(
      `application/portal/projects/${route.params.id}/issues`,
      {
        params: params,
      }
    );
    loading.value = false;
    pager.value = data.pager;
    tableData.value = data.issues;
  } catch (error) {}
};

const debouncedOnInputChange = debounce(fetchProjectIssues, 200);

const handleDeleteIssue = (item: any, index: any) => {
  BaseMessageBox.confirm(
    `آیا از حذف  سطح دسترسی  اطمینان دارید ؟!`,
    "پیام تایید",
    {
      confirmButtonText: "تایید",
      cancelButtonText: "لغو",
      type: "warning",
    }
  )
    .then(async () => {
      const data = await useApiService.remove(
        `application/portal/projects/${route.params.id}/issues/${item?.id}`
      );
      if (data.success) {
        tableData.value.splice(index, 1);
        BaseMessage({
          message: "حذف  سطح دسترسی با موفقیت انجام شد!",
          type: "success",
          duration: 4000,
          center: true,
          offset: 20,
        });
      }
    })
    .catch(() => {});
};

onMounted(() => {
  fetchProjectIssues();
  project_id.value = route.params.id;
});
</script>

<style scoped></style>
