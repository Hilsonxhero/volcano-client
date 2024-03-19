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
              <div class="w-full lg:w-auto">
                <base-input
                  class="w-full lg:w-[250px]"
                  v-model="search"
                  placeholder="جستجوی دسته بندی"
                >
                  <template #prefix>
                    <nuxt-icon name="search-status"></nuxt-icon>
                  </template>
                </base-input>
              </div>

              <div class="w-full lg:w-auto mt-4 lg:mt-0">
                <base-button
                  size="small"
                  type="primary"
                  class="w-full lg:w-auto"
                  :to="{ name: 'management-categories-create' }"
                >
                  <div class="flex items-center">
                    <span class="ml-2"> ایجاد دسته بندی</span>
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
            search-placeholder="جستجوی دسته بندی"
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
            <template v-slot:cell-parent="{ row }">
              <template v-if="row.parent">
                <div
                  class="text-ellipsis overflow-hidden whitespace-nowrap min-w-[130px]"
                >
                  {{ row?.parent?.title }}
                </div>
              </template>
              <template v-else> ندارد </template>
            </template>
            <template v-slot:cell-status="{ row }">
              <base-button outlined type="success" size="small">{{
                $t(row?.status)
              }}</base-button>
            </template>

            <template v-slot:cell-actions="{ row: category, index }">
              <div class="flex items-center">
                <base-button
                  @click="handleDeleteCategory(category, index)"
                  size="small"
                  icon
                >
                  <nuxt-icon name="trash"></nuxt-icon>
                </base-button>
                <base-button
                  :to="{
                    name: 'management-categories-edit',
                    params: { id: category.id },
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
  layout: "management",
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
    name: "دسته پدر",
    key: "parent",
    sortable: true,
  },
  {
    name: "وضعیت",
    key: "status",
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
    // fetchCategories();
    debouncedOnInputChange();
  }
);

const handleChangePage = (page) => {
  current_page.value = page;
  fetchCategories();
};

const fetchCategories = async () => {
  let params = {
    page: current_page.value,
    q: search.value,
  };
  // loading.value = true;
  try {
    const { data } = await useApiService.get(`management/categories`, {
      params: params,
    });
    loading.value = false;
    pager.value = data.pager;
    tableData.value = data.categories;
  } catch (error) {}
};

const debouncedOnInputChange = debounce(fetchCategories, 200);

const handleDeleteCategory = (category: any, index: any) => {
  BaseMessageBox.confirm(
    `آیا از حذف  دسته بندی  اطمینان دارید ؟!`,
    "پیام تایید",
    {
      confirmButtonText: "تایید",
      cancelButtonText: "لغو",
      type: "warning",
    }
  )
    .then(async () => {
      const data = await useApiService.remove(
        `management/categories/${category?.id}`
      );
      if (data.success) {
        tableData.value.splice(index, 1);
        BaseMessage({
          message: "حذف  دسته بندی با موفقیت انجام شد!",
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
  fetchCategories();
});
</script>

<style scoped></style>
