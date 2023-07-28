<template>
  <div>
    <!-- <h1 class="dark:text-5xl">home page</h1>
    <base-button @click="toggleDark()">Toggle Theme</base-button> -->
    <section
      class="home-section-hero__section pt-14 pb-4 lg:pt-[10rem] lg:pb-[6rem]"
    >
      <div class="container">
        <div class="home-section-hero__wrapper">
          <div class="home-section-hero__container">
            <div class="">
              <h1
                class="home-section-hero__head text-3xl font-semibold leading-[140%] md:text-6xl"
              >
                <span class="home-section-hero__title">
                  {{ variables?.home_title }}
                </span>

                <!-- <span class="home-section-hero__title"
                  >افزایش بهره‌وری و همکاری</span
                >
                برای رشد کسب و کار -->
              </h1>
            </div>
            <div class="my-8">
              <p class="text-gray-300 text-sm relative z-[2] md:text-xl">
                {{ variables?.home_description }}
                <!-- لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که -->
              </p>
            </div>
            <div class="flex items-center justify-center">
              <a
                href="#"
                class="primary-button-two text-white overflow-hidden relative rounded-[14px] py-4 px-8 ml-4"
              >
                شروع رایگان
              </a>
              <a
                href="#"
                class="text-white overflow-hidden relative rounded-[14px] py-4 px-8 border border-white border-solid"
              >
                اطلاعات بیشتر
              </a>
            </div>
            <div class="home-section-hero__shape"></div>
            <img
              src="@/assets/media/01.svg"
              alt=""
              class="absolute top-auto bottom-[20%] left-[-19%] right-auto hidden md:block"
            />

            <img
              src="@/assets/media/02.svg"
              alt=""
              class="absolute top-auto bottom-[39%] left-auto -right-[19%] hidden md:block"
            />
          </div>
        </div>

        <PromotionServices :items="init_variables?.promotion_services" />
      </div>
    </section>

    <MainServices :items="init_variables?.main_services" />

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
          <div class="grid grid-cols-12 gap-6 items-center">
            <div
              class="col-span-12 md:col-span-6 lg:px-10 flex flex-col items-center lg:items-start"
            >
              <div class="mb-3">
                <img src="@/assets/media/19.svg" alt="" />
              </div>
              <h2
                class="text-2xl md:text-4xl title-text-gradient text-center lg:text-right"
              >
                لورم ایپسوم متن ساختگی با تولید سادگی
              </h2>
              <p class="text-gray-300 mt-5 text-base text-center lg:text-right">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که
              </p>
              <div class="mt-8">
                <div class="text-purple-600">مشاهده بیشتر</div>
              </div>
            </div>
            <div class="col-span-12 md:col-span-6 order-first md:order-last">
              <img src="@/assets/media/18.png" alt="" />
            </div>
          </div>

          <div class="grid grid-cols-12 gap-6 items-center">
            <div class="col-span-12 md:col-span-6 order-first md:order-first">
              <img src="@/assets/media/17.png" alt="" />
            </div>
            <div
              class="col-span-12 md:col-span-6 lg:px-10 flex flex-col items-center lg:items-start"
            >
              <div class="mb-3">
                <img src="@/assets/media/21.svg" alt="" />
              </div>
              <h2
                class="text-2xl md:text-4xl title-text-gradient text-center lg:text-right"
              >
                لورم ایپسوم متن ساختگی با تولید سادگی
              </h2>
              <p class="text-gray-300 mt-5 text-base text-center lg:text-right">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که
              </p>
              <div class="mt-8">
                <div class="text-purple-600">مشاهده بیشتر</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

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
            v-for="(article, index) in 3"
            :key="index"
          >
            <nuxt-link to="/">
              <div class="article-module__card rounded-[32px] p-6">
                <div>
                  <img
                    src="@/assets/media/22.png"
                    class="object-cover rounded-xl w-full"
                    alt=""
                  />
                </div>
                <div class="mt-6">
                  <div class="my-4">
                    <span class="article-module__tag">لورم ایپسوم</span>
                  </div>
                  <h4 class="text-xl">لورم ایپسوم متن ساختگی با تولید</h4>
                </div>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import PromotionServices from "@/modules/web/components/home/service/PromotionServices.vue";
import MainServices from "@/modules/web/components/home/service/MainServices.vue";

import { useDark, useToggle } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { useWebStore } from "@/modules/web/store";
const isDark = useDark({
  selector: "html",
  attribute: "class",
  valueDark: "dark",
  valueLight: "light",
});
const toggleDark = useToggle(isDark);
const init_variables = ref({});

const webStore = useWebStore();
const { variables } = storeToRefs(webStore);
const fetchInit = async () => {
  try {
    const data = await useApiService.get(`application/init`);
    init_variables.value = data.data;
  } catch (error) {
    return error;
  }
};

onMounted(() => {
  fetchInit();
});
</script>

<style lang="scss" scoped></style>
