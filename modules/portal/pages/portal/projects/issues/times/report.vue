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
          <div class="mb-1 flex justify-between items-center">
            <h1 class="text-xl text-gray-700">گزارش</h1>
            <div class="flex items-center">
              <div class="ml-2">
                <base-select
                  v-model="form.interval"
                  filterable
                  placeholder="بازه زمانی"
                  value-key="id"
                  label="title"
                  :options="intervals"
                  sieze="small"
                >
                </base-select>
              </div>
              <div>
                <base-select
                  v-model="form.search_type"
                  filterable
                  placeholder="نوع گزارش"
                  value-key="id"
                  label="title"
                  :options="filter_types"
                >
                </base-select>
              </div>
            </div>
          </div>
        </section>
        <section class="mb-6 bg-white shadow-lg p-4 rounded-2xl">
          <BaseDataTable
            :tableData="tableData"
            :single-item-index="index"
            search-placeholder=""
            :table-header="tableHeader"
          >
            <template #left> </template>

            <template v-slot:cell-user="{ row }">
              <span class="">{{ row?.user }}</span>
            </template>
            <template v-slot:cell-total="{ row }">
              <span class="">{{ row?.total }}</span>
            </template>
            <template
              v-for="(label, j) in interval_labels"
              v-slot:[`cell-${label}`]="{ row }"
            >
              <span class="">{{ row[label] }}</span>
            </template>

            <!-- <template v-slot:cell-actions="{ row: user, index: index }">
            </template> -->
          </BaseDataTable>
        </section>
      </template>
    </base-skeleton>
  </div>
</template>

<script setup lang="ts">
import { BaseDataTable } from "@/components/base/datatable";
import { BaseSkeleton, BaseSkeletonItem } from "@/components/base/skeleton";
import BaseMessage from "@/components/base/message";
import { BaseMessageBox } from "@/components/base/message-box";

definePageMeta({
  layout: "project",
  middleware: ["auth"],
});
// @ts-nocheck
const index = ref(null);
const checkedData = ref([]);
const tableHeader = ref([]);
const loading = ref(true);
const tableData = ref([]);
const route = useRoute();
const project_id = ref(null);
const pager = ref({});
const current_page = ref(1);
const intervals = ref([
  { title: "سال", id: "year" },
  { title: "ماه", id: "month" },
  { title: "هفته", id: "week" },
  { title: "روز", id: "day" },
]);
const interval_labels = ref([]);
const filter_types = ref([{ title: "کاربر", id: "user" }]);
const form = ref({
  interval: "month",
  search_type: "user",
});
const fetchData = async () => {
  try {
    const form_data = {
      interval: form.value.interval,
      search_type: form.value.search_type,
    };
    const { data } = await useApiService.post(
      `application/portal/projects/${route.params.id}/issue/entries/time/report`,
      form_data
    );
    tableHeader.value = [];
    tableData.value = [];
    tableHeader.value.push({
      name: "کاربر",
      key: "user",
      sortable: false,
    });

    loading.value = false;
    // pager.value = data.pager;
    interval_labels.value = data.labels;

    data.labels.forEach((label, index) => {
      tableHeader.value.push({
        name: label,
        key: label,
        sortable: false,
      });
    });
    tableHeader.value.push({
      name: "زمان کل",
      key: "total",
      sortable: false,
    });
    data.values.forEach((value, j) => {
      //   tableData.value = data.values;
      //   tableHeader.value.push({
      //     name: label,
      //     key: label,
      //     sortable: false,
      //   });
      tableData.value[j] = { ...value };
      value.values.forEach((aa, bb) => {
        tableData.value[j][aa.label] = aa.value;
      });
    });
  } catch (error) {}
};

watch(
  () => form.value.interval,
  (val) => {
    fetchData();
  }
);
onMounted(() => {
  fetchData();
  project_id.value = route.params.id;
});
</script>
