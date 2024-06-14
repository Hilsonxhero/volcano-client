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
          <div class="flex justify-between items-center mb-4">
            <div>
              <h5 class="text-xl text-gray-700">تابلو ها</h5>
            </div>
            <base-button
              @click="handleShowCreateBoard"
              size="small"
              type="primary"
              class=""
            >
              <div class="flex items-center">
                <span class="ml-2"> ایجاد تابلو</span>
                <nuxt-icon name="add"></nuxt-icon>
              </div>
            </base-button>
          </div>
        </section>

        <template v-if="tableData.length == 0">
          <NoData icon="board"> هنوز تابلو نساخته اید! </NoData>
        </template>

        <template v-else>
          <div class="grid grid-cols-12 gap-4">
            <div
              class="col-span-12 md:col-span-6 lg:col-span-4"
              v-for="(board, index) in tableData"
              :key="index"
            >
              <section class="mb-3 bg-white card-module p-4 rounded-2xl">
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center"></div>
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
                            @click="handleDeleteboard(board, index)"
                            class="text-gray-700 cursor-pointer rounded-[12px] px-3 py-2 hover:bg-gray-100"
                          >
                            <span> حذف تابلو</span>
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
                      name: 'portal-projects-boards-show',
                      params: { id: route.params.id, board: board.id },
                    }"
                  >
                    {{ board?.title }}
                  </nuxt-link>
                </h5>
                <p
                  class="text-gray-400 text-xs ellipsis-2 break-all min-h-[60px]"
                >
                  {{ board?.description }}
                </p>

                <div class="flex justify-end mt-2">
                  <nuxt-link
                    :to="{
                      name: 'portal-projects-boards-show',
                      params: { id: route.params.id, board: board.short_link },
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

    <CreateBoardDialog
      @create="handleOnCreateBoard"
      v-model="visible_create_board"
    />
  </div>
</template>

<script setup lang="ts">
import BaseMessage from "@/components/base/message";
import { BaseMessageBox } from "@/components/base/message-box";
import NoData from "@/modules/portal/components/common/NoData.vue";

import { BaseSkeleton, BaseSkeletonItem } from "@/components/base/skeleton";
import { debounce } from "lodash-unified";
import CreateBoardDialog from "@/modules/portal/components/portal/projects/board/CreateBoardDialog.vue";

definePageMeta({
  layout: "project",
  middleware: ["auth"],
});
const loading = ref(true);
const pager = ref({});
const current_page = ref(1);
const project_id = ref(null);
const route = useRoute();
const visible_create_board = ref(false);
const search = ref("");

const tableData = ref([]);

watch(
  () => search.value,
  (val) => {
    // fetchProjectboards();
    debouncedOnInputChange();
  }
);

const handleShowCreateBoard = () => {
  visible_create_board.value = true;
};
const handleOnCreateBoard = () => {
  fetchProjectboards();
};

const fetchProjectboards = async () => {
  let params = {
    page: current_page.value,
    q: search.value,
  };
  // loading.value = true;
  try {
    const { data } = await useApiService.get(
      `application/portal/projects/${route.params.id}/boards`,
      {
        params: params,
      }
    );

    loading.value = false;
    pager.value = data.pager;
    tableData.value = data;
  } catch (error) {}
};

const debouncedOnInputChange = debounce(fetchProjectboards, 200);

const handleDeleteboard = (item: any, index: any) => {
  BaseMessageBox.confirm(`آیا از حذف   تابلو  اطمینان دارید ؟!`, "پیام تایید", {
    confirmButtonText: "تایید",
    cancelButtonText: "لغو",
    type: "warning",
  })
    .then(async () => {
      const data = await useApiService.remove(
        `application/portal/projects/${route.params.id}/boards/${item?.id}`
      );
      if (data.success) {
        tableData.value.splice(index, 1);
        BaseMessage({
          message: "حذف   تابلو با موفقیت انجام شد!",
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
  fetchProjectboards();
  project_id.value = route.params.id;
});
</script>

<style scoped></style>
