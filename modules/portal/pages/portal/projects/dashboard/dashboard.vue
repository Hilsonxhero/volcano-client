<template>
  <div>
    <base-skeleton class="mt-3" animated :loading="loading">
      <template #template>
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 lg:col-span-3">
            <base-skeleton-item
              variant="card"
              class="h-[200px]"
            ></base-skeleton-item>
          </div>
          <div class="col-span-12 lg:col-span-3">
            <base-skeleton-item
              variant="card"
              class="h-[200px]"
            ></base-skeleton-item>
          </div>
          <div class="col-span-12 lg:col-span-3">
            <base-skeleton-item
              variant="card"
              class="h-[200px]"
            ></base-skeleton-item>
          </div>
          <div class="col-span-12 lg:col-span-3">
            <base-skeleton-item
              variant="card"
              class="h-[200px]"
            ></base-skeleton-item>
          </div>
          <div class="col-span-12">
            <base-skeleton-item
              variant="card"
              class="h-[500px]"
            ></base-skeleton-item>
          </div>
        </div>
      </template>
      <template #default>
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 lg:col-span-7">
            <div class="grid grid-cols-12 gap-2">
              <div class="col-span-4">
                <div
                  class="h-full border-b-[4px] border-blue-400 px-2 py-8 rounded-xl report-card-wide flex flex-col text-center justify-center"
                >
                  <div
                    class="text-center flex justify-center mt-2 mb-3 min-h-[47px]"
                  >
                    <nuxt-icon
                      class="w-9 h-9"
                      name="clipboard-tick"
                    ></nuxt-icon>
                  </div>
                  <span> کار های امروز </span>
                  <span class="mt-3 text-xl">
                    {{ project_report?.today_issues }}
                  </span>
                </div>
              </div>

              <div class="col-span-4">
                <div
                  class="border-b-[4px] border-red-400 px-2 py-8 rounded-xl report-card-wide flex flex-col text-center justify-center"
                >
                  <div
                    class="text-center flex justify-center mt-2 mb-3 min-h-[47px]"
                  >
                    <nuxt-icon class="w-9 h-9" name="calendar"></nuxt-icon>
                  </div>
                  <span> کارهای دارای تاخیر </span>
                  <span class="mt-3 text-xl">
                    {{ project_report?.delayed_issues }}
                  </span>
                </div>
              </div>

              <div class="col-span-4">
                <div
                  class="border-b-[4px] border-yellow-400 px-2 py-8 rounded-xl report-card-wide flex flex-col text-center justify-center"
                >
                  <div
                    class="text-center flex justify-center mt-2 mb-3 min-h-[47px]"
                  >
                    <nuxt-icon class="w-9 h-9" name="flag"></nuxt-icon>
                  </div>
                  <span> کارهای قابل پیگیری </span>
                  <span class="mt-3 text-xl">
                    {{ project_report?.trackable_issues }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-12 lg:col-span-5">
            <div
              class="flex justify-between p-4 border-2 rounded-xl text-base font-semibold"
            >
              <span>زمان صرف شده</span>
              <span>{{ project_report?.total_hours }} ساعت</span>
            </div>

            <div
              class="flex justify-between p-4 border-2 rounded-xl text-base font-semibold mt-1"
            >
              <span>تعداد کل اعضا</span>
              <span>{{ project_report?.users_count }}</span>
            </div>

            <div
              class="flex justify-between p-4 border-2 rounded-xl text-base font-semibold mt-1"
            >
              <span>تعداد کل تابلوها</span>
              <span>{{ project_report?.boards_count }}</span>
            </div>
          </div>
        </div>
      </template>
    </base-skeleton>
  </div>
</template>

<script setup lang="ts">
import { BaseSkeleton, BaseSkeletonItem } from "@/components/base/skeleton";

definePageMeta({
  layout: "project",
  middleware: ["auth"],
});
const route = useRoute();
const loading = ref(true);
const project_report = ref({});
onMounted(async () => {
  const { data } = await useApiService.get(
    `application/portal/projects/${route.params.id}/dashboard`
  );
  project_report.value = data;
  loading.value = false;
});
</script>
