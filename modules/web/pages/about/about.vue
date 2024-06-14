<template>
  <div class="container">
    <base-skeleton class="mt-3" animated :loading="loading">
      <template #template>
        <div class="flex flex-col items-center justify-center">
          <base-skeleton-item
            variant="card"
            class="w-[200px] h-[16px] mx-auto"
          ></base-skeleton-item>
          <base-skeleton-item
            variant="card"
            class="w-[100px] h-[5px] mx-auto mt-5"
          ></base-skeleton-item>
          <base-skeleton-item
            variant="card"
            class="h-[300px] mx-auto mt-5"
          ></base-skeleton-item>
        </div>
      </template>
      <template #default>
        <div class="section-hero single-page">
          <div class="content">
            <div class="block-hero">
              <h1 data-w-id="Heading 2" class="heading-hero">
                <!-- We turn <span class="text-accent">ideas</span> into reality -->

                <span class="text-accent"> {{ variables?.title }}</span>
              </h1>
              <p class="paragraph-hero text-gray-200">
                {{ variables?.subtitle }}
              </p>
            </div>
          </div>
        </div>
        <div class="sectionn">
          <div data-w-id="Div Block" class="content">
            <img
              :src="variables?.cover"
              loading="lazy"
              data-w-id="Image 7"
              alt=""
              class="image-company"
            />

            <div
              class="mt-6 text-gray-200 text-justify leading-8"
              v-html="variables?.content"
            ></div>
          </div>
        </div>
      </template>
    </base-skeleton>
  </div>
</template>

<script setup lang="ts">
import { BaseSkeleton, BaseSkeletonItem } from "@/components/base/skeleton";

const variables = ref({});
const loading = ref(true);
const fetchAbout = async () => {
  const data = await useApiService.get("application/about/variables");
  loading.value = false;
  variables.value = data.data;
};

onMounted(() => {
  fetchAbout();
});
</script>
