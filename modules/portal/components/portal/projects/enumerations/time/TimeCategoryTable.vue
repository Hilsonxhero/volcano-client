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
              <div class="w-full lg:w-auto">دسته بندی زمان ها</div>
              <div class="w-full lg:w-auto mt-4 lg:mt-0">
                <base-button
                  size="small"
                  type="primary"
                  class="w-full lg:w-auto"
                  :to="{ name: 'portal-projects-time-categories-create' }"
                >
                  <div class="flex items-center">
                    <span class="ml-2">ایجاد دسته بندی زمان</span>
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
            <template v-slot:cell-is_default="{ row }">
              <div class="">
                <template v-if="row?.is_default">
                  <base-button outlined type="success" size="small"
                    >مقدار پیش فرض</base-button
                  >
                </template>
                <template v-else>
                  <base-button outlined type="gray" size="small"
                    >مقدار عادی</base-button
                  >
                </template>
              </div>
            </template>
            <template v-slot:cell-status="{ row }">
              <div
                class="text-ellipsis overflow-hidden whitespace-nowrap min-w-[130px]"
              >
                {{ row?.status }}
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
                    name: 'portal-projects-time-categories-edit',
                    params: {
                      id: route.params?.id,
                      slug: route.params?.slug,
                      category: row.id,
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
const project_id = ref(null);
const project_slug = ref(null);
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
    name: "مقدار پیش فرض",
    key: "is_default",
    sortable: true,
  },
  {
    name: "وضعیت",
    key: "status",
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
      `application/portal/projects/${route.params.id}/enumerations/time/categories`,
      {
        params: params,
      }
    );
    loading.value = false;
    pager.value = data.pager;
    tableData.value = data.categories;
  } catch (error) {}
};

const debouncedOnInputChange = debounce(fetchData, 200);

const handleDelete = (item: any, index: any) => {
  BaseMessageBox.confirm(
    `آیا از حذف  دسته بندی زمان  اطمینان دارید ؟!`,
    "پیام تایید",
    {
      confirmButtonText: "تایید",
      cancelButtonText: "لغو",
      type: "warning",
    }
  )
    .then(async () => {
      const data = await useApiService.remove(
        `application/portal/projects/${route.params.id}/enumerations/time/categories/${item?.id}`
      );
      if (data.success) {
        tableData.value.splice(index, 1);
        BaseMessage({
          message: "حذف  دسته بندی زمان با موفقیت انجام شد!",
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
  project_id.value = route.params.id;
  project_slug.value = route.params.slug;
});
</script>

<style scoped></style>
