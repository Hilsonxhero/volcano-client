<template>
  <div>
    <div class="">
      <div class="mb-5 flex justify-between items-center">
        <h1 class="text-2xl text-gray-600">پروژه های اخیر</h1>

        <div>
          <nuxt-link
            class="text-blue-500"
            :to="{ name: 'portal-projects-index' }"
          >
            <div class="flex items-center">
              <span class="ml-1">همه پروژه ها</span>
              <nuxt-icon name="arrow-left-bulk"></nuxt-icon>
            </div>
          </nuxt-link>
        </div>
      </div>

      <base-skeleton animated :loading="loading">
        <template #template>
          <div class="grid grid-cols-12 gap-4">
            <div
              class="col-span-12 lg:col-span-4"
              v-for="(item, index) in 3"
              :key="index"
            >
              <base-skeleton-item variant="card"></base-skeleton-item>
            </div>
          </div>
        </template>
        <template #default>
          <div class="grid grid-cols-12 gap-4">
            <div
              class="col-span-12 md:col-span-4 xl:col-span-4"
              v-for="(project, index) in projects"
              @click="handleOpenProjectPortal(project)"
            >
              <ProjectCard :project="project" />
            </div>
          </div>
        </template>
      </base-skeleton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseSkeleton, BaseSkeletonItem } from "@/components/base/skeleton";
import ProjectCard from "@/modules/portal/components/project/ProjectCard.vue";
import { usePortalStore } from "@/modules/portal/store/portal";

definePageMeta({
  layout: "portal",
  middleware: ["auth"],
});
const store = usePortalStore();

const loading = ref(true);
const projects = ref([]);
const handleOpenProjectPortal = async (project) => {
  await store.setProjectId(project?.id);
  navigateTo({
    name: "portal-projects-dashboard",
    params: { id: project?.id },
  });
};

onMounted(async () => {
  const { data } = await useApiService.get("application/portal/dashboard");
  projects.value = data.projects;
  loading.value = false;
});
</script>

<style scoped></style>
