<template>
  <div class="rounded-xl px-3 py-3 board-module__toolbar">
    {{ board?.title }}
  </div>
  <div class="board-canvas">
    <BoardLists :items="board_lists" />
  </div>
</template>

<script setup lang="ts">
import BoardLists from "@/modules/portal/components/portal/projects/board/list/BoardLists.vue";
import { useBoardStore } from "@/modules/portal/store/board";
import { storeToRefs } from "pinia";

definePageMeta({
  layout: "board",
  middleware: ["auth"],
});
const store = useBoardStore();
const route = useRoute();
const { board_lists, board } = storeToRefs(store);

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

onMounted(() => {
  fetchBoard();
  fetchData();
});
</script>

<style scoped></style>
