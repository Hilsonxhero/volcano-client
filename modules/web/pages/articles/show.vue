<template>
  <div class="container mt-10">
    <base-skeleton class="mt-3" animated :loading="loading">
      <template #template>
        <div class="w-3/5 mx-auto">
          <div class="">
            <base-skeleton-item
              variant="text"
              class="w-[200px] h-[30px]"
            ></base-skeleton-item>
            <base-skeleton-item
              variant="card"
              class="h-[400px]"
            ></base-skeleton-item>
            <base-skeleton-item
              v-for="(item, index) in 6"
              :key="index"
              variant="text"
            ></base-skeleton-item>
          </div>
        </div>
      </template>
      <template #default>
        <div class="flex flex-col items-center">
          <div class="w-3/5 mx-auto">
            <div class="flex items-center">
              <div>
                <base-button size="small" type="warning">
                  {{ article?.category?.title }}
                </base-button>
              </div>
              <div class="text-sm text-gray-400 mr-3">
                {{ article?.created_at }}
              </div>
            </div>
            <h2 class="text-xl lg:text-4xl font-semibold text-gray-700 my-8">
              {{ article?.title }}
            </h2>
            <section>
              <div class="h-[200px] lg:h-[400px] w-full mx-auto">
                <img
                  class="w-full h-full object-cover shadow-2xl"
                  :src="article?.media?.main"
                  alt=""
                />
              </div>
            </section>
            <section>
              <div class="">
                <div class="mt-8">
                  <div
                    class="mt-4 text-gray-500 text-justify leading-8 text-base"
                    v-html="article.content"
                  ></div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </template>
    </base-skeleton>
  </div>
</template>

<script setup lang="ts">
import { BaseSkeleton, BaseSkeletonItem } from "@/components/base/skeleton";

const route = useRoute();
const article_id = ref(null);
const article = ref({});
const loading = ref(true);
const fetchArticle = async () => {
  try {
    const data = await useApiService.get(
      `application/articles/${article_id.value}`
    );
    loading.value = false;
    article.value = data.data?.article;
  } catch (error) {}
};

onMounted(() => {
  article_id.value = route.params.id;
  fetchArticle();
});
</script>

<style scoped></style>
