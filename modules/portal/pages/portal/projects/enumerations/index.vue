<template>
  <div>
    <TimeCategoryTable />
  </div>
</template>

<script setup lang="ts">
import TimeCategoryTable from "@/modules/portal/components/portal/projects/enumerations/time/TimeCategoryTable.vue";

definePageMeta({
  layout: "project",
  middleware: ["auth"],
});
const project_id = ref(null);
const project_slug = ref(null);
const route = useRoute();
onMounted(() => {
  project_id.value = route.params.id;
  project_slug.value = route.params.slug;
});
</script>

<style scoped></style>
