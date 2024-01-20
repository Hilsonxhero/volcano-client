<template>
  <div class="board-canvas">
    <BoardLists :items="lists" />
  </div>
</template>

<script setup lang="ts">
import BoardLists from "@/modules/portal/components/portal/projects/board/list/BoardLists.vue";

definePageMeta({
  layout: "board",
  middleware: ["auth"],
});

const route = useRoute();
const lists = ref([]);

const fetchData = async () => {
  // loading.value = true;
  try {
    const { data } = await useApiService.get(
      `application/portal/projects/board/${route.params.board}/lists`
    );
    // loading.value = false;

    lists.value = data;
  } catch (error) {}
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped></style>
