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
                  placeholder="جستجوی پروژه"
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
                  :to="{ name: 'management-projects-create' }"
                >
                  <div class="flex items-center">
                    <span class="ml-2"> ایجاد پروژه</span>
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
            search-placeholder="جستجوی پروژه"
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
            <template v-slot:cell-user="{ row }">
              <div
                class="text-ellipsis overflow-hidden whitespace-nowrap min-w-[130px]"
              >
                {{ row?.user?.username }}
              </div>
            </template>

            <template v-slot:cell-status="{ row }">
              <base-button outlined type="success" size="small">{{
                row?.status
              }}</base-button>
            </template>

            <template v-slot:cell-header-members_count="{ row }">
              <div class="text-center w-full">تعداد اعضا</div>
            </template>

            <template v-slot:cell-members_count="{ row }">
              <div class="text-center w-full">
                {{ row?.members_count }}
              </div>
            </template>

            <template v-slot:cell-create_at="{ row }">
              <div
                class="text-ellipsis overflow-hidden whitespace-nowrap min-w-[130px]"
              >
                {{ row?.create_at }}
              </div>
            </template>

            <template v-slot:cell-actions="{ row: project, index }">
              <div class="flex items-center">
                <base-button
                  :to="{
                    name: 'management-project-pages-index',
                    params: { project: project.id },
                  }"
                  size="small"
                  icon
                >
                  <nuxt-icon name="note-bulk"></nuxt-icon>
                </base-button>
                <base-button
                  :to="{
                    name: 'management-projects-edit',
                    params: { id: project.id },
                  }"
                  size="small"
                  icon
                >
                  <nuxt-icon name="magicpen"></nuxt-icon>
                </base-button>
                <base-button
                  @click="handleDeleteProject(project, index)"
                  size="small"
                  icon
                >
                  <nuxt-icon name="trash"></nuxt-icon>
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
    name: "سازنده",
    key: "user",
    sortable: true,
  },
  {
    name: "وضعیت",
    key: "status",
    sortable: false,
  },
  {
    name: "تعداد اعضا",
    key: "members_count",
    sortable: false,
  },
  {
    name: "تاریخ ایجاد",
    key: "create_at",
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
    // fetchProjects();
    debouncedOnInputChange();
  }
);

const handleChangePage = (page) => {
  current_page.value = page;
  fetchProjects();
};

const fetchProjects = async () => {
  let params = {
    page: current_page.value,
    q: search.value,
  };
  try {
    const { data } = await useApiService.get(`management/projects`, {
      params: params,
    });
    loading.value = false;
    pager.value = data.pager;
    tableData.value = data.projects;
  } catch (error) {}
};

const debouncedOnInputChange = debounce(fetchProjects, 200);

const handleDeleteProject = (project: any, index: any) => {
  BaseMessageBox.confirm(`آیا از حذف  پروژه  اطمینان دارید ؟!`, "پیام تایید", {
    confirmButtonText: "تایید",
    cancelButtonText: "لغو",
    type: "warning",
  })
    .then(async () => {
      const data = await useApiService.remove(
        `management/projects/${project?.id}`
      );
      if (data.success) {
        tableData.value.splice(index, 1);
        BaseMessage({
          message: "حذف  پروژه با موفقیت انجام شد!",
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
  fetchProjects();
});
</script>

<style scoped></style>
