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
                  placeholder="جستجوی مجوز"
                >
                  <template #prefix>
                    <nuxt-icon name="search-status"></nuxt-icon>
                  </template>
                </base-input>
              </div>

              <div class="w-full lg:w-auto mt-4 lg:mt-0"></div>
            </div>
          </section>
          <BaseDataTable
            :total="pager.total"
            :rows-per-page="pager.per_page"
            :tableData="tableData"
            :pager="pager"
            :search="search"
            :current-page="pager.current_page"
            search-placeholder="جستجوی مجوز"
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
            <template v-slot:cell-name="{ row }">
              <div
                class="text-ellipsis overflow-hidden whitespace-nowrap min-w-[130px]"
              >
                {{ row?.name }}
              </div>
            </template>
            <template v-slot:cell-parent_name="{ row }">
              <div
                class="text-ellipsis overflow-hidden whitespace-nowrap min-w-[130px]"
              >
                <template v-if="row?.parent_name">
                  {{ row?.parent_name }}
                </template>
                <template v-else> گروه اصلی </template>
              </div>
            </template>
            <template v-slot:cell-actions="{ row: user, index }">
              <div class="flex items-center">
                <base-button
                  @click="handleDeletePermission(user, index)"
                  size="small"
                  icon
                >
                  <nuxt-icon name="trash"></nuxt-icon>
                </base-button>
                <base-button
                  :to="{
                    name: 'management-permissions-edit',
                    params: { id: user.id },
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
    // fetchPermissions();
    debouncedOnInputChange();
  }
);

const handleChangePage = (page) => {
  current_page.value = page;
  fetchPermissions();
};

const fetchPermissions = async () => {
  let params = {
    page: current_page.value,
    q: search.value,
  };
  // loading.value = true;
  try {
    const { data } = await useApiService.get(`management/permissions`, {
      params: params,
    });
    loading.value = false;
    pager.value = data.pager;
    tableData.value = data.permissions;
  } catch (error) {}
};

const debouncedOnInputChange = debounce(fetchPermissions, 200);

const handleDeletePermission = (permission: any, index: any) => {
  BaseMessageBox.confirm(`آیا از حذف  مجوز  اطمینان دارید ؟!`, "پیام تایید", {
    confirmButtonText: "تایید",
    cancelButtonText: "لغو",
    type: "warning",
  })
    .then(async () => {
      const data = await useApiService.remove(
        `management/permissions/${permission?.id}`
      );
      if (data.success) {
        tableData.value.splice(index, 1);
        BaseMessage({
          message: "حذف  مجوز با موفقیت انجام شد!",
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
  fetchPermissions();
});
</script>

<style scoped></style>
