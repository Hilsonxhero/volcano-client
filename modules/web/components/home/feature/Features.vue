<template>
  <section class="home-section-features py-16">
    <div class="container">
      <div class="flex flex-col items-center justify-center mb-28">
        <h5 class="text-white text-xl lg:text-3xl">
          کارآمد کار کنید و بیشتر به دست آورید
        </h5>
        <h5 class="text-white text-xl lg:text-3xl mt-1">
          در زمان واقعی انجام می شود
        </h5>

        <p class="text-gray-300 text-center text-sm mt-4">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، چاپگرها و
        </p>
      </div>

      <div class="space-y-20">
        <div
          class="grid grid-cols-12 gap-6 items-center"
          v-for="(feature, index) in items"
        >
          <template v-if="index % 2 == 0">
            <div
              class="col-span-12 md:col-span-6 lg:px-10 flex flex-col items-center lg:items-start"
            >
              <div class="mb-3">
                <img :src="feature?.media?.icon" alt="" />
              </div>
              <h2
                class="text-2xl md:text-4xl title-text-gradient text-center lg:text-right"
              >
                {{ feature?.title }}
              </h2>
              <p class="text-gray-300 mt-5 text-base text-center lg:text-right">
                {{ feature?.description }}
              </p>
              <div class="mt-8">
                <nuxt-link
                  :to="{
                    name: 'features-show',
                    params: { id: feature.id, slug: feature.slug },
                  }"
                  class="text-purple-600"
                  >مشاهده بیشتر</nuxt-link
                >
              </div>
            </div>
            <div class="col-span-12 md:col-span-6 order-first md:order-last">
              <img
                :src="feature?.media?.cover"
                alt=""
                class="h-[450px] w-[490px] mx-auto object-cover"
              />
            </div>
          </template>
          <template v-else>
            <div class="col-span-12 md:col-span-6 order-first md:order-first">
              <img
                :src="feature?.media?.cover"
                alt=""
                class="h-[450px] w-[490px] mx-auto object-cover"
              />
            </div>
            <div
              class="col-span-12 md:col-span-6 lg:px-10 flex flex-col items-center lg:items-start"
            >
              <div class="mb-3">
                <img :src="feature?.media?.icon" alt="" />
              </div>
              <h2
                class="text-2xl md:text-4xl title-text-gradient text-center lg:text-right"
              >
                {{ feature?.title }}
              </h2>
              <p class="text-gray-300 mt-5 text-base text-center lg:text-right">
                {{ feature?.description }}
              </p>
              <div class="mt-8">
                <nuxt-link
                  :to="{
                    name: 'features-show',
                    params: { id: feature.id, slug: feature.slug },
                  }"
                  class="text-purple-600"
                  >مشاهده بیشتر</nuxt-link
                >
              </div>
            </div>
          </template>
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
