<template>
  <base-skeleton class="mt-3" animated :loading="loading">
    <template #template>
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12">
          <base-skeleton-item variant="card" class="h-16"></base-skeleton-item>
        </div>
      </div>
      <div class="flex items-center overflow-y-auto">
        <div
          class="w-[272px] pl-2 flex-shrink-0"
          v-for="(item, index) in 5"
          :key="index"
        >
          <base-skeleton-item variant="card" class="h-56"></base-skeleton-item>
        </div>
      </div>
    </template>
    <template #default>
      <div
        class="rounded-xl px-3 py-2 board-module__toolbar flex justify-between items-center"
      >
        <div>
          {{ board?.title }}
        </div>

        <div class="flex items-center">
          <base-button icon type="text" size="small">
            <nuxt-icon name="shield-tick" class="w-5 h-5"></nuxt-icon>
          </base-button>

          <base-button
            icon
            type="text"
            size="small"
            @click="handleShowBoardMembers"
          >
            <nuxt-icon name="group" class="w-5 h-5"></nuxt-icon>
          </base-button>
          <base-button
            @click="handleShowConfigBoard"
            icon
            type="text"
            size="small"
          >
            <nuxt-icon name="setting-bulk" class="w-5 h-5"></nuxt-icon>
          </base-button>
        </div>
      </div>
      <div class="board-canvas">
        <BoardLists :items="board_lists" />
      </div>
    </template>
  </base-skeleton>

  <BoardMembersDialog
    @create="handleOnInvite"
    v-model="visible_invite_dialog"
  />

  <ConfigBoardDialog @store="handleOnConfig" v-model="visible_config_dialog" />
</template>

<script setup lang="ts">
import BoardLists from "@/modules/portal/components/portal/projects/board/list/BoardLists.vue";
import BoardMembersDialog from "@/modules/portal/components/portal/projects/board/BoardMembersDialog.vue";
import ConfigBoardDialog from "@/modules/portal/components/portal/projects/board/ConfigBoardDialog.vue";
import { BaseSkeleton, BaseSkeletonItem } from "@/components/base/skeleton";

import { useBoardStore } from "@/modules/portal/store/board";
import { storeToRefs } from "pinia";

definePageMeta({
  layout: "board",
  middleware: ["auth"],
});
const store = useBoardStore();
const route = useRoute();
const { board_lists, board } = storeToRefs(store);
const visible_invite_dialog = ref(false);
const visible_config_dialog = ref(false);
const loading = ref(true);
const fetchData = async () => {
  const data = await store.fetchBoardLists(route.params.board);
};
const fetchBoard = async () => {
  const data = await store.fetchBoard({
    project: route.params.id,
    id: route.params.board,
  });
  loading.value = false;
};

const handleOnInvite = () => {};
const handleOnConfig = () => {};

const handleShowBoardMembers = () => {
  visible_invite_dialog.value = true;
};
const handleShowConfigBoard = () => {
  visible_config_dialog.value = true;
};

onMounted(() => {
  fetchBoard();
  fetchData();
});
</script>

<style scoped></style>
