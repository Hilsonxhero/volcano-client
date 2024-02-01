<template>
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
const { board_lists } = storeToRefs(store);

const fetchData = async () => {
  const data = await store.fetchBoardLists(route.params.board);
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped></style>
