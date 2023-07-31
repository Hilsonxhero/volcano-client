<template>
  <section class="py-20">
    <div class="container">
      <div class="flex flex-col items-center justify-center mb-20">
        <h1 class="text-center text-gray-700 text-4xl font-semibold">
          آخرین مقالات
        </h1>
      </div>

      <div class="grid grid-cols-12 gap-6">
        <div
          class="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-4"
          v-for="(article, index) in items"
          :key="index"
        >
          <nuxt-link
            :to="{
              name: 'articles-show',
              params: { id: article?.id, slug: article?.slug },
            }"
          >
            <div class="article-module__card rounded-[32px] p-6">
              <div>
                <img
                  :src="article?.media?.thumb"
                  class="object-cover rounded-xl w-full"
                  alt=""
                />
              </div>
              <div class="mt-6">
                <div class="my-4">
                  <span class="article-module__tag">
                    {{ article?.category?.title }}
                  </span>
                </div>
                <h4 class="text-xl mt-4">{{ article?.title }}</h4>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps({
  items: {},
});
</script>

<style scoped></style>
