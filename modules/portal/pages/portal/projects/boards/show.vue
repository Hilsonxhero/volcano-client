<template>
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
      <base-button icon type="text" size="small">
        <nuxt-icon name="setting-bulk" class="w-5 h-5"></nuxt-icon>
      </base-button>
    </div>
  </div>
  <div class="board-canvas">
    <BoardLists :items="board_lists" />
  </div>

  <BoardMembersDialog
    @create="handleOnInvite"
    v-model="visible_invite_dialog"
  />
</template>

<script setup lang="ts">
import BoardLists from "@/modules/portal/components/portal/projects/board/list/BoardLists.vue";
import BoardMembersDialog from "@/modules/portal/components/portal/projects/board/BoardMembersDialog.vue";

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
const fetchData = async () => {
  const data = await store.fetchBoardLists(route.params.board);
};
const fetchBoard = async () => {
  const data = await store.fetchBoard({
    project: route.params.id,
    id: route.params.board,
  });
  console.log("data", data);
};

const handleOnInvite = () => {};

const handleShowBoardMembers = () => {
  visible_invite_dialog.value = true;
};

onMounted(() => {
  fetchBoard();
  fetchData();
});
</script>

<style scoped></style>
