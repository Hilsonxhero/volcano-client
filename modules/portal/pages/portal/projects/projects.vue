<template>
  <div class="">
    <div class="mb-3 flex justify-between items-center">
      <h1 class="text-2xl text-gray-600">پروژه ها</h1>
      <div>
        <base-button
          size="small"
          @click="handleShowCreateProject()"
          type="primary"
          class=""
        >
          <div class="flex items-center">
            <span class="ml-2">ساخت پروژه</span>
            <nuxt-icon name="add"></nuxt-icon>
          </div>
        </base-button>
      </div>
    </div>
    <div
      ref="infiniteRef"
      class="grid grid-cols-12 gap-4 overflow-y-auto"
      v-if="projects.length >= 1"
    >
      <div
        class="col-span-12 md:col-span-4 xl:col-span-4"
        @click="handleOpenProjectPortal(project)"
        v-for="(project, index) in projects"
      >
        <ProjectCard :project="project" />
      </div>
    </div>

    <base-skeleton class="mt-3" animated :loading="loading">
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
      <template #default> </template>
    </base-skeleton>

    <CreateProjectDialog
      @create="handleOnCreateProject"
      v-model="visible_create_project"
    />
  </div>
</template>

<script setup lang="ts">
import ProjectCard from "@/modules/portal/components/project/ProjectCard.vue";
import CreateProjectDialog from "@/modules/portal/components/portal/projects/CreateProjectDialog.vue";
import { BaseSkeleton, BaseSkeletonItem } from "@/components/base/skeleton";
import BaseMessage from "@/components/base/message";
import { useInfiniteScroll } from "@vueuse/core";
import { usePortalStore } from "@/modules/portal/store/portal";

definePageMeta({
  layout: "portal",
  middleware: ["auth"],
});
const projects = ref([]);
const loading = ref(true);
const must_fetch = ref(true);
const infiniteRef = ref<HTMLElement>(null);
const visible_create_project = ref(false);
const pager = ref({
  current_page: 0,
});

const store = usePortalStore();

const handleOpenProjectPortal = async (project) => {
  await store.setProjectId(project?.id);
  navigateTo({
    name: "portal-projects-dashboard",
    params: { id: project?.id },
  });
};

const handleShowCreateProject = () => {
  visible_create_project.value = true;
};

useInfiniteScroll(
  infiniteRef,
  () => {
    fetchProjects();
  },
  { distance: 10 }
);

watch(
  () => infiniteRef.value,
  (val) => {}
);

const fetchProjects = async () => {
  if (must_fetch.value) {
    try {
      pager.value.current_page = +pager.value.current_page + 1;
      let params = {
        page: +pager.value?.current_page ?? 1,
      };
      loading.value = true;
      const { data } = await useApiService.get("application/portal/projects", {
        params: params,
      });
      data.projects.map((item, index) => {
        projects.value.push(item);
      });
      pager.value = data.pager;
      if (+pager.value.current_page == +pager.value.pages) {
        must_fetch.value = false;
      }
      loading.value = false;
    } catch (error) {}

    // projects.value = data.projects;
  }
};

const handleOnCreateProject = () => {
  projects.value = [];
  must_fetch.value = true;
  pager.value.current_page = 0;
  fetchProjects();
};
const setContainerHeight = () => {
  if (infiniteRef.value) {
    useResizeEvent.setElementHieght(infiniteRef.value, null, 250);
  }
};

onMounted(async () => {
  await fetchProjects();
  setContainerHeight();
  useResizeEvent.addResizeListener(null, setContainerHeight);
});
onBeforeUnmount(() => {
  useResizeEvent.removeResizeListener(null, setContainerHeight);
});
</script>

<style scoped></style>
