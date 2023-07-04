<template>
  <div>
    <base-skeleton class="mt-3" animated :loading="loading">
      <template #template>
        <base-skeleton-item
          variant="card"
          class="h-[30px] w-[200px]"
        ></base-skeleton-item>
        <base-skeleton-item
          variant="card"
          class="h-[30rem]"
        ></base-skeleton-item>
      </template>
      <template #default>
        <h1 class="text-2xl font-semibold mb-12">
          {{ page.title }}
        </h1>

        <div class="mt-6">
          <div class="page-content-module" v-html="page.content"></div>
        </div>
      </template>
    </base-skeleton>
  </div>
</template>

<script setup lang="ts">
import { BaseSkeleton, BaseSkeletonItem } from "@/components/base/skeleton";

definePageMeta({
  layout: "software",
});

const project_id = ref(null);
const page_id = ref(null);
const route = useRoute();
const loading = ref(true);
const page = ref({});

const handleFetchProject = async () => {
  const data = await useApiService.get(
    `software/projects/${project_id.value}/pages/${page_id.value}`
  );
  page.value = data.data;
  loading.value = false;
};

onMounted(() => {
  project_id.value = route.params.id;
  page_id.value = route.params.page;
  handleFetchProject();
});
</script>

<style scoped></style>
