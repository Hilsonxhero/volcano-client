<template>
  <div class="container">
    <div class="single-page">
      <div class="">
        <div class="block-hero">
          <h1 data-w-id="Heading 2" class="heading-hero">
            <span class="text-accent"> مقالات </span>
          </h1>
        </div>
      </div>
    </div>
    <div class="">
      <div class="collection-list-wrapper-large w-dyn-list">
        <div role="list" class="grid grid-cols-12 gap-4" ref="articlesListRef">
          <div
            role="listitem"
            class="col-span-6 lg:col-span-4"
            v-for="(article, index) in articles"
            :key="index"
          >
            <div class="block-blog">
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
                  class="image-blog large"
              /></nuxt-link>
              <div class="category-blog">
                {{ article?.category?.title }}
              </div>
              <nuxt-link
                :to="{
                  name: 'articles-show',
                  params: { id: article?.id, slug: article?.slug },
                }"
                class="link-heading-blog w-inline-block"
                ><h3 class="heading-blog">
                  {{ article?.title }}
                </h3></nuxt-link
              >
              <div class="date-blog">{{ article?.created_at }}</div>
            </div>
          </div>

          <div ref="sentinel" style="height: 10px"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useInfiniteScroll } from "@vueuse/core";

const articles = ref([]);
const pager = ref({ current_page: 0 });
const must_fetch = ref(true);
const loading = ref(false);

const fetchArticles = async () => {
  if (must_fetch.value && !loading.value) {
    pager.value.current_page++;
    loading.value = true;
    try {
      const params = { page: pager.value.current_page };
      const response = await useApiService.get("application/articles", {
        params,
      });
      const data = response.data;
      articles.value.push(...data.articles);
      loading.value = false;
      pager.value = data.pager;

      if (pager.value.current_page === pager.value.pages) {
        must_fetch.value = false;
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      loading.value = false;
    }
  }
};

const handleScroll = () => {
  if (must_fetch.value && isScrolledToBottom()) {
    fetchArticles();
  }
};

const isScrolledToBottom = () => {
  if (!articlesListRef.value || !sentinel.value) return false;
  const rect = sentinel.value.getBoundingClientRect();
  return rect.top <= window.innerHeight;
};

const articlesListRef = ref<HTMLElement | null>(null);
const sentinel = ref<HTMLElement | null>(null);

onMounted(() => {
  fetchArticles();
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
