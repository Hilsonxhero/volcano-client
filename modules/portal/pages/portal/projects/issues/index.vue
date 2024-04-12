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
          <div
            class="flex-col lg:flex-row flex justify-between items-center mb-4 flex-wrap"
          >
            <div>
              <h5 class="text-xl text-gray-700 w-full flex-shrink-0 flex-grow">
                مسئله ها
              </h5>
            </div>
            <div class="flex items-center flex-wrap flex-shrink-0">
              <ClientOnly>
                <base-button
                  size="small"
                  type="warning"
                  class="w-full lg:w-auto ml-2 mt-2 lg:mt-0"
                  @click="handleShowFilterDialog"
                >
                  <div class="flex items-center">
                    <span class="ml-2">فیلتر </span>
                    <nuxt-icon name="filter-square"></nuxt-icon>
                  </div>
                </base-button>
              </ClientOnly>

              <base-button
                size="small"
                type="primary"
                class="w-full lg:w-auto mt-2 lg:mt-0"
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
          </div>
        </section>
        <template v-if="tableData.length == 0">
          <NoData icon="clipboard-tick"> هنوز مسئله ای نساخته اید! </NoData>
        </template>
        <template v-else>
          <div class="grid grid-cols-12 gap-4">
            <div
              class="col-span-12 lg:col-span-4"
              v-for="(issue, index) in tableData"
              :key="index"
            >
              <section class="mb-6 bg-white card-module p-4 rounded-2xl">
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center">
                    <div
                      class="bg-gray-100 rounded-[30px] py-2 px-6 text-gray-500 font-light flex justify-center items-center"
                    >
                      {{ issue?.tracker?.title }}
                    </div>
                    <!-- <div
                    class="border-gray-500 border rounded-[30px] py-2 px-6 text-gray-600 font-light flex justify-center items-center mr-2"
                  >
                    {{ issue?.id }}
                  </div> -->
                  </div>
                  <div>
                    <base-dropdown placement="left-start">
                      <span
                        class="bg-gray-100 cursor-pointer rounded-2xl flex justify-center items-center min-w-[2.6rem] h-[2.6rem] ml-2"
                      >
                        <span class="svg-icon svg-icon-2">
                          <nuxt-icon
                            name="more-out"
                            class="w-6 h-6 text-gray-500"
                          ></nuxt-icon>
                        </span>
                      </span>

                      <template #content>
                        <ul></ul>
                        <div>
                          <div
                            @click="handleDeleteIssue(issue, index)"
                            class="text-gray-700 cursor-pointer rounded-[12px] px-3 py-2 hover:bg-gray-100"
                          >
                            <span> حذف مسئله</span>
                          </div>
                        </div>
                      </template>
                    </base-dropdown>

                    <!-- <nuxt-icon name="more" class="w-6 h-6"></nuxt-icon> -->
                  </div>
                </div>
                <h5 class="text-gray-700 font-bold mb-3 text-xl">
                  <nuxt-link
                    :to="{
                      name: 'portal-projects-issues-show',
                      params: { id: route.params.id, issue: issue.id },
                    }"
                  >
                    {{ issue?.title }}
                  </nuxt-link>
                </h5>
                <!-- <p class="text-gray-400 text-xs">
                {{ issue?.description }}
              </p> -->
                <div class="flex items-center">
                  <base-button class="ml-1" plain size="small" type="primary">
                    {{ issue?.issue_status?.title }}
                  </base-button>
                  <base-button class="ml-1" plain size="small" type="warning">
                    {{ issue?.project_priority?.title }}
                  </base-button>

                  <base-button class="ml-1" plain size="small" type="default">
                    {{ issue?.id }} #
                  </base-button>
                </div>

                <div class="flex justify-end mt-2">
                  <nuxt-link
                    :to="{
                      name: 'portal-projects-issues-show',
                      params: { id: route.params.id, issue: issue.id },
                    }"
                  >
                    <span
                      class="bg-gray-100 cursor-pointer rounded-2xl flex justify-center items-center min-w-[2.6rem] h-[2.6rem] ml-2"
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
      </template>
    </base-skeleton>
    <FilterIssueDialog
      @store="handleOnFilter"
      v-model="visible_filter_dialog"
    />
  </div>
</template>

<script setup lang="ts">
import BaseMessage from "@/components/base/message";
import { BaseMessageBox } from "@/components/base/message-box";
import { BaseDataTable } from "@/components/base/datatable";
import { BaseSkeleton, BaseSkeletonItem } from "@/components/base/skeleton";
import { debounce } from "lodash-unified";
import NoData from "@/modules/portal/components/common/NoData.vue";
import FilterIssueDialog from "@/modules/portal/components/portal/projects/issues/FilterIssueDialog.vue";

definePageMeta({
  layout: "project",
  middleware: ["auth"],
});
const loading = ref(false);
const pager = ref({});
const current_page = ref(1);
const project_id = ref(null);
const route = useRoute();
const search = ref("");
const visible_filter_dialog = ref(false);
const tableData = ref([]);

watch(
  () => search.value,
  (val) => {
    debouncedOnInputChange();
  }
);

const fetchProjectIssues = async (query_params = null) => {
  var params = {
    page: current_page.value,
    q: search.value,
  };
  if (query_params !== null) {
    params = { ...params, ...query_params };
  }
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
  BaseMessageBox.confirm(`آیا از حذف   مسئله  اطمینان دارید ؟!`, "پیام تایید", {
    confirmButtonText: "تایید",
    cancelButtonText: "لغو",
    type: "warning",
  })
    .then(async () => {
      const data = await useApiService.remove(
        `application/portal/projects/${route.params.id}/issues/${item?.id}`
      );
      if (data.success) {
        tableData.value.splice(index, 1);
        BaseMessage({
          message: "حذف   مسئله با موفقیت انجام شد!",
          type: "success",
          duration: 4000,
          center: true,
          offset: 20,
        });
      }
    })
    .catch(() => {});
};

const handleOnFilter = (data) => {
  loading.value = true;
  fetchProjectIssues(data);
};

const handleShowFilterDialog = () => {
  visible_filter_dialog.value = true;
};

onMounted(() => {
  fetchProjectIssues();
  project_id.value = route.params.id;
});
</script>

<style scoped></style>
