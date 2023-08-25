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
        <section class="mb-6 bg-white shadow-lg p-4 rounded-2xl">
          <section>
            <div class="mb-3 flex justify-between flex-wrap items-center">
              <div class="w-full lg:w-auto">وضعیت مسئله ها</div>
              <div class="w-full lg:w-auto mt-4 lg:mt-0">
                <base-button
                  size="small"
                  type="primary"
                  class="w-full lg:w-auto"
                  :to="{ name: 'portal-projects-issue-statuses-create' }"
                >
                  <div class="flex items-center">
                    <span class="ml-2">ایجاد وضعیت مسئله</span>
                    <nuxt-icon name="add"></nuxt-icon>
                  </div>
                </base-button>
              </div>
            </div>
          </section>
          <BaseDataTable
            :total="pager.total"
            :rows-per-page="pager.per_page"
            :tableData="tableData"
            :pager="pager"
            :search="search"
            :current-page="pager.current_page"
            :table-header="tableHeader"
            :enable-items-per-page-dropdown="false"
            :on-current-change="true"
            @current-change="handleChangePage"
          >
            <template #left> </template>
            <template v-slot:cell-checkbox="{ row }">
              <div
                class="form-check form-check-sm form-check-custom form-check-solid"
              >
                <base-checkbox v-model="checkedData"></base-checkbox>
              </div>
            </template>

            <template v-slot:cell-title="{ row }">
              <div
                class="text-ellipsis overflow-hidden whitespace-nowrap min-w-[130px]"
              >
                {{ row?.title }}
              </div>
            </template>

            <template v-slot:cell-status="{ row }">
              <div
                class="text-ellipsis overflow-hidden whitespace-nowrap min-w-[130px]"
              >
                {{ row?.status }}
              </div>
            </template>
            <template v-slot:cell-header-is_closed="{ row }">
              <div class="text-center w-full">مسأله بسته شده</div>
            </template>
            <template v-slot:cell-is_closed="{ row }">
              <div class="flex justify-center">
                <template v-if="row?.is_closed">
                  <nuxt-icon
                    class="text-green-600"
                    name="tick-circle"
                  ></nuxt-icon>
                </template>
                <template v-else>
                  <nuxt-icon
                    class="text-red-600"
                    name="close-circle"
                  ></nuxt-icon>
                </template>
              </div>
            </template>

            <template v-slot:cell-actions="{ row, index }">
              <div class="flex items-center">
                <base-button
                  @click="handleDelete(row, index)"
                  size="small"
                  icon
                >
                  <nuxt-icon name="trash"></nuxt-icon>
                </base-button>
                <base-button
                  :to="{
                    name: 'portal-projects-issue-statuses-edit',
                    params: {
                      id: route.params?.id,
                      status: row.id,
                    },
                  }"
                  size="small"
                  icon
                >
                  <nuxt-icon name="magicpen"></nuxt-icon>
                </base-button>
              </div>
            </template>
          </BaseDataTable>
        </section>
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
const loading = ref(true);
const pager = ref({});
const current_page = ref(1);
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
    name: "وضعیت",
    key: "status",
    sortable: true,
  },
  {
    name: "مسأله بسته شده	",
    key: "is_closed",
    sortable: false,
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
    debouncedOnInputChange();
  }
);

const handleChangePage = (page) => {
  current_page.value = page;
  fetchData();
};

const fetchData = async () => {
  let params = {
    page: current_page.value,
    q: search.value,
  };
  try {
    const { data } = await useApiService.get(
      `application/portal/projects/${route.params.id}/enumerations/issue/statuses`,
      {
        params: params,
      }
    );
    loading.value = false;
    pager.value = data.pager;
    tableData.value = data.statuses;
  } catch (error) {}
};

const debouncedOnInputChange = debounce(fetchData, 200);

const handleDelete = (item: any, index: any) => {
  BaseMessageBox.confirm(
    `آیا از حذف    وضعیت مسئله  اطمینان دارید ؟!`,
    "پیام تایید",
    {
      confirmButtonText: "تایید",
      cancelButtonText: "لغو",
      type: "warning",
    }
  )
    .then(async () => {
      const data = await useApiService.remove(
        `application/portal/projects/${route.params.id}/enumerations/issue/statuses/${item?.id}`
      );
      if (data.success) {
        tableData.value.splice(index, 1);
        BaseMessage({
          message: "حذف وضعیت مسئله با موفقیت انجام شد!",
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
  fetchData();
});
</script>

<style scoped></style>
