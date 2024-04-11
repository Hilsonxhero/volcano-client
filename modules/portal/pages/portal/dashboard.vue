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
            >
              <nuxt-link
                :to="{
                  name: 'portal-projects-dashboard',
                  params: { id: project?.id },
                }"
              >
                <!-- <div
                  class="bg-white shadow-lg rounded-2xl p-4 text-base hover:shadow-sm transition ease-in-out"
                >
                  <div class="flex items-center justify-between">
                    <div>{{ project?.title }}</div>
                    <div>
                      <BaseButton size="small" type="success">{{
                        project?.status
                      }}</BaseButton>
                    </div>
                  </div>

                  <div>
                    <p class="text-gray-500 text-xs my-3 leading-6">
                      {{ project?.description }}
                    </p>
                  </div>

                  <ul class="avatar-group flex items-center mb-0 mt-3 mr-2">
                    <li
                      v-for="(member, index) in project.members"
                      :key="index"
                      class="avatar w-[2rem] h-[2rem] -mr-[0.8rem] relative avatar-sm"
                      v-tippy="`${member.username}`"
                    >
                      <img
                        class="avatar-img rounded-[50%] w-full h-full object-cover border border-gray-300"
                        src="~/assets/media/faces/blank.png"
                        alt="avatar"
                      />
                    </li>
                  </ul>

                  <div class="text-gray-500 mt-3 text-xs">
                    ایجاد شده در {{ project?.create_at }}
                  </div>
                </div> -->
                <ProjectCard :project="project" />
              </nuxt-link>
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
definePageMeta({
  layout: "portal",
  middleware: ["auth"],
});

const loading = ref(true);
const projects = ref([]);

onMounted(async () => {
  const { data } = await useApiService.get("application/portal/dashboard");
  projects.value = data.projects;
  loading.value = false;
});
</script>

<style scoped></style>
