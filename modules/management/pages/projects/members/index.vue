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
                  placeholder="جستجوی کاربر"
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
                  @click="handleShowInviteMember"
                >
                  <div class="flex items-center">
                    <span class="ml-2"> عضو جدید</span>
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
            search-placeholder="جستجوی کاربر"
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

            <template v-slot:cell-username="{ row }">
              <div
                class="text-ellipsis overflow-hidden whitespace-nowrap min-w-[130px]"
              >
                {{ row?.username }}
              </div>
            </template>
            <template v-slot:cell-email="{ row }">
              <div
                class="text-ellipsis overflow-hidden whitespace-nowrap min-w-[130px]"
              >
                {{ row?.email }}
              </div>
            </template>
            <template v-slot:cell-phone="{ row }">
              <div
                class="text-ellipsis overflow-hidden whitespace-nowrap min-w-[130px]"
              >
                {{ row?.phone }}
              </div>
            </template>

            <template v-slot:cell-status="{ row }">
              <base-button outlined type="success" size="small">{{
                $t(row?.status)
              }}</base-button>
            </template>

            <template v-slot:cell-role="{ row }">
              <base-button outlined size="small">{{
                row?.role?.title
              }}</base-button>
            </template>

            <template v-slot:cell-actions="{ row: project, index }">
              <div class="flex items-center">
                <base-button
                  @click="handleDeletePage(project, index)"
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
    <InviteUser @create="handleOnInviteUser" v-model="visible_invite_user" />
  </div>
</template>

<script setup lang="ts">
import BaseMessage from "@/components/base/message";
import { BaseMessageBox } from "@/components/base/message-box";
import { BaseDataTable } from "@/components/base/datatable";
import { BaseSkeleton, BaseSkeletonItem } from "@/components/base/skeleton";
import { debounce } from "lodash-unified";
import InviteUser from "@/modules/management/components/project/members/InviteUser.vue";

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
    name: "نام کاربری",
    key: "username",
    sortable: true,
  },
  {
    name: "ایمیل",
    key: "email",
    sortable: true,
  },
  {
    name: "شماره همراه",
    key: "phone",
    sortable: true,
  },
  {
    name: "نقش کاربری",
    key: "role",
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
const visible_invite_user = ref(false);
const tableData = ref([]);
const project_id = ref(null);
watch(
  () => search.value,
  (val) => {
    // fetchMembers();
    debouncedOnInputChange();
  }
);
const handleOnInviteUser = () => {};

const handleChangePage = (page) => {
  current_page.value = page;
  fetchMembers();
};
const handleShowInviteMember = () => {
  visible_invite_user.value = true;
};

const fetchMembers = async () => {
  let params = {
    page: current_page.value,
    q: search.value,
  };
  try {
    const { data } = await useApiService.get(
      `management/project/${project_id.value}/members`,
      {
        params: params,
      }
    );
    loading.value = false;
    pager.value = data.pager;
    tableData.value = data.members;
  } catch (error) {}
};

const debouncedOnInputChange = debounce(fetchMembers, 200);

const handleDeletePage = (page: any, index: any) => {
  BaseMessageBox.confirm(`آیا از حذف  کاربر  اطمینان دارید ؟!`, "پیام تایید", {
    confirmButtonText: "تایید",
    cancelButtonText: "لغو",
    type: "warning",
  })
    .then(async () => {
      const data = await useApiService.remove(
        `management/project/${project_id.value}/members/${page?.id}`
      );
      if (data.success) {
        tableData.value.splice(index, 1);
        BaseMessage({
          message: "حذف  کاربر با موفقیت انجام شد!",
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
  project_id.value = route.params.project;
  fetchMembers();
});
</script>

<style scoped></style>
