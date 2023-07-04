<template>
  <div>
    <h1 class="text-2xl font-semibold mb-12">
      {{ page.title }}
    </h1>

    <div class="mt-6">
      <div class="page-content-module" v-html="page.content"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "software",
});

const project_id = ref(null);
const page_id = ref(null);
const route = useRoute();
const loading = ref(false);
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
