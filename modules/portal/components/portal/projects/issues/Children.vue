<template>
  <div>
    <section class="mb-6 bg-white card-module p-4 rounded-2xl">
      <BaseDataTable
        :total="pager.total"
        :rows-per-page="pager.per_page"
        :tableData="tableData"
        :single-item-index="index"
        search-placeholder="جستجوی کاربر"
        :table-header="tableHeader"
        :enable-items-per-page-dropdown="false"
        :on-current-change="true"
        @current-change="handleChangePage"
      >
        <template #left>
          <!-- <hx-button :to="{ name: 'users create' }"> کاربر جدید </hx-button> -->
          <div>www</div>
        </template>
        <template v-slot:cell-checkbox="{ row }">
          <div
            class="form-check form-check-sm form-check-custom form-check-solid"
          >
            <base-checkbox v-model="checkedData"></base-checkbox>
          </div>
        </template>

        <template v-slot:cell-title="{ row }">
          <nuxt-link
            class="text-blue-600"
            :to="{
              name: 'portal-projects-issues-show',
              params: { id: route.params.id, issue: row.id },
            }"
          >
            {{ row?.title }}
          </nuxt-link>
        </template>

        <template v-slot:cell-tracker="{ row }">
          <span> {{ row?.tracker?.title }}</span>
        </template>
        <template v-slot:cell-issue_status="{ row }">
          <span> {{ row?.issue_status?.title }}</span>
        </template>
        <template v-slot:cell-assigned="{ row }">
          <span> {{ row?.assigned?.username }}</span>
        </template>

        <template v-slot:cell-done_ratio="{ row }">
          <span class="font-semibold"> {{ row?.done_ratio }}</span
          ><span>%</span>
        </template>

        <template v-slot:cell-actions="{ row, index: index }">
          <div class="flex items-center">
            <base-button @click="handleDelete(row, index)" size="small" icon>
              <nuxt-icon name="trash"></nuxt-icon>
            </base-button>
            <base-button
              class="mr-1"
              :to="{
                name: 'portal-projects-issues-show',
                params: { id: route.params.id, issue: row.id },
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
  </div>
</template>

<script setup lang="ts">
import { BaseDataTable } from "@/components/base/datatable";
import { BaseSkeleton, BaseSkeletonItem } from "@/components/base/skeleton";
import BaseMessage from "@/components/base/message";
import { BaseMessageBox } from "@/components/base/message-box";

const index = ref(null);
const checkedData = ref([]);
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
    name: "نوع ",
    key: "tracker",
    sortable: true,
  },
  {
    name: "وضعیت ",
    key: "issue_status",
    sortable: true,
  },
  {
    name: "مسئول   ",
    key: "assigned",
    sortable: true,
  },

  {
    name: "انجام شده",
    key: "done_ratio",
    sortable: false,
  },
  {
    name: "عملیات",
    key: "actions",
  },
]);
const loading = ref(true);
const tableData = ref([]);
const route = useRoute();
const pager = ref({});
const current_page = ref(1);
const handleChangePage = (page) => {
  current_page.value = page;
  fetchData();
};

const fetchData = async () => {
  let params = {
    page: current_page.value,
  };
  try {
    const { data } = await useApiService.get(
      `application/portal/projects/${route.params.id}/issues/${route.params.issue}/children`,
      {
        params: params,
      }
    );
    loading.value = false;
    pager.value = data.pager;
    tableData.value = data.children;
  } catch (error) {}
};
const handleDelete = (row, index) => {
  BaseMessageBox.confirm(`آیا از حذف  مسئله  اطمینان دارید ؟!`, "پیام تایید", {
    confirmButtonText: "تایید",
    cancelButtonText: "لغو",
    type: "warning",
  })
    .then(async () => {
      const data = await useApiService.remove(
        `application/portal/projects/${route.params.id}/issues/${row?.id}`
      );
      if (data.success) {
        tableData.value.splice(index, 1);
        BaseMessage({
          message: "حذف  مسئله با موفقیت انجام شد!",
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
