<template>
  <div class="section">
    <div class="section-content">
      <div class="block-center">
        <h2 data-w-id="ac1c39f6-3071-f098-aec3-9337033bdfe6" class="heading">
          مقالات
        </h2>
      </div>
      <div class="collection-list-wrapper w-dyn-list">
        <div role="list" class="collection-list w-dyn-items">
          <div
            role="listitem"
            class="collection-item w-dyn-item"
            v-for="(article, index) in items"
            :key="index"
          >
            <div data-w-id="Div Block 16" class="block-blog">
              <nuxt-link
                :to="{
                  name: 'articles-show',
                  params: { id: article?.id, slug: article?.slug },
                }"
                class="link-image-blog w-inline-block"
                ><img
                  :src="article?.media?.main"
                  loading="lazy"
                  alt="How to write your first android app: Useful Advice"
                  class="image-blog"
              /></nuxt-link>
              <div class="category-blog">{{ article?.category?.title }}</div>
              <nuxt-link
                :to="{
                  name: 'articles-show',
                  params: { id: article?.id, slug: article?.slug },
                }"
                class="link-heading-blog w-inline-block"
              >
                <h5 data-w-id="Heading 6" class="heading-blog">
                  {{ article?.title }}
                </h5>
              </nuxt-link>
              <div class="date-blog">{{ article?.created_at }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  items: {},
});
</script>

<style scoped></style>
