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
          <div class="mb-3 flex justify-between items-center">
            <h1 class="text-2xl text-gray-600">عضو های پروژه</h1>

            <div>
              <base-button
                @click="handleShowInviteMember"
                size="small"
                type="primary"
                class=""
              >
                <div class="flex items-center">
                  <span class="ml-2">عضو جدید</span>
                  <nuxt-icon name="add"></nuxt-icon>
                </div>
              </base-button>
            </div>
          </div>
        </section>
        <section class="mb-6 bg-white shadow-lg p-4 rounded-2xl">
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

            <template v-slot:cell-username="{ row }">
              <span> {{ row?.username }}</span>
            </template>
            <template v-slot:cell-email="{ row }"> {{ row?.email }} </template>

            <template v-slot:cell-phone="{ row }"> {{ row?.phone }} </template>
            <template v-slot:cell-role="{ row }">
              {{ row?.role?.title }}
            </template>

            <template v-slot:cell-status="{ row }">
              <base-button outlined type="success" size="small">{{
                $t(row?.status)
              }}</base-button>
            </template>

            <template v-slot:cell-actions="{ row: user, index: index }">
              <base-button
                @click="handleDeleteUser(user, index)"
                size="small"
                icon
              >
                <nuxt-icon name="trash"></nuxt-icon>
              </base-button>
            </template>
          </BaseDataTable>
        </section>
      </template>
    </base-skeleton>

    <InviteUserDialog
      @create="handleOnInviteUser"
      v-model="visible_invite_user"
    />
  </div>
</template>

<script setup lang="ts">
import InviteUserDialog from "@/modules/portal/components/portal/projects/users/InviteUserDialog.vue";
import { BaseDataTable } from "@/components/base/datatable";
import { BaseSkeleton, BaseSkeletonItem } from "@/components/base/skeleton";
import BaseMessage from "@/components/base/message";
import { BaseMessageBox } from "@/components/base/message-box";

definePageMeta({
  layout: "project",
  middleware: ["auth"],
});
// @ts-nocheck
const visible_invite_user = ref(false);
const index = ref(null);
const checkedData = ref([]);

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
    name: "سطح دسترسی",
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
const loading = ref(true);
const tableData = ref([]);
const route = useRoute();
const project_id = ref(null);
const pager = ref({});
const current_page = ref(1);
const handleChangePage = (page) => {
  current_page.value = page;
  fetchUsers();
};

const handleOnInviteUser = () => {};
const handleShowInviteMember = () => {
  visible_invite_user.value = true;
};
const fetchUsers = async () => {
  let params = {
    page: current_page.value,
  };
  try {
    const { data } = await useApiService.get(
      `application/portal/projects/${route.params.id}/users`,
      {
        params: params,
      }
    );
    loading.value = false;
    pager.value = data.pager;
    tableData.value = data.members;
  } catch (error) {}
};

const handleDeleteUser = (user: any, index: any) => {
  BaseMessageBox.confirm(`آیا از حذف  کاربر  اطمینان دارید ؟!`, "پیام تایید", {
    confirmButtonText: "تایید",
    cancelButtonText: "لغو",
    type: "warning",
  })
    .then(async () => {
      const data = await useApiService.remove(
        `application/portal/projects/${project_id.value}/users/${user?.id}`
      );
      if (data.success) {
        tableData.value.splice(index, 1);
        BaseMessage({
          message: "حذف  صفحه با موفقیت انجام شد!",
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
  fetchUsers();
  project_id.value = route.params.id;
});
</script>
