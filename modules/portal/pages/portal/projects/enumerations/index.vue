<template>
  <div>
    <section class="my-5">
      <TimeCategoryTable />
    </section>
    <section class="my-5">
      <Tracker />
    </section>
  </div>
</template>

<script setup lang="ts">
import TimeCategoryTable from "@/modules/portal/components/portal/projects/enumerations/time/TimeCategoryTable.vue";
import Tracker from "@/modules/portal/components/portal/projects/enumerations/tracker/Tracker.vue";

definePageMeta({
  layout: "project",
  middleware: ["auth"],
});
const route = useRoute();
onMounted(() => {});
</script>

<style scoped></style>
