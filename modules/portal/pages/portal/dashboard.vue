<template>
  <div>
    <div class="">
      <div class="mb-3 flex justify-between items-center">
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
              class="col-span-12 md:col-span-4 xl:col-span-3"
              v-for="(project, index) in projects"
            >
              <nuxt-link to="/">
                <div
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

                  <ul class="avatar-group flex items-center mb-0 mt-3">
                    <li
                      class="avatar w-[2rem] h-[2rem] -mr-[0.8rem] relative avatar-sm"
                    >
                      <img
                        class="avatar-img rounded-[50%] w-full h-full object-cover border border-gray-300"
                        src="~/assets/media/faces/1.jpg"
                        alt="avatar"
                      />
                    </li>
                    <li
                      class="avatar w-[2rem] h-[2rem] -mr-[0.8rem] relative avatar-sm"
                    >
                      <img
                        class="avatar-img rounded-[50%] w-full h-full object-cover border border-gray-300"
                        src="~/assets/media/faces/4.jpg"
                        alt="avatar"
                      />
                    </li>
                    <li
                      class="avatar w-[2rem] h-[2rem] -mr-[0.8rem] relative avatar-sm"
                    >
                      <img
                        class="avatar-img rounded-[50%] w-full h-full object-cover border border-gray-300"
                        src="~/assets/media/faces/1.jpg"
                        alt="avatar"
                      />
                    </li>
                    <li
                      class="avatar w-[2rem] h-[2rem] -mr-[0.8rem] relative avatar-sm"
                    >
                      <img
                        class="avatar-img rounded-[50%] w-full h-full object-cover border border-gray-300"
                        src="~/assets/media/faces/2.jpg"
                        alt="avatar"
                      />
                    </li>
                    <li
                      class="avatar w-[2rem] h-[2rem] -mr-[0.8rem] relative avatar-sm"
                    >
                      <img
                        class="avatar-img rounded-[50%] w-full h-full object-cover border border-gray-300"
                        src="~/assets/media/faces/2.jpg"
                        alt="avatar"
                      />
                    </li>
                  </ul>

                  <div class="text-gray-500 mt-3 text-xs">
                    ایجاد شده در {{ project?.create_at }}
                  </div>
                </div>
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

definePageMeta({
  layout: "portal",
});

const loading = ref(true);

const projects = ref([]);

onMounted(async () => {
  const { data } = await useApiService.get("portal/dashboard");
  projects.value = data.projects;
  loading.value = false;
});
</script>

<style scoped></style>
