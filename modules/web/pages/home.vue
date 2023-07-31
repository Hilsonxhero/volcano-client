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
    <Features :items="init_variables?.features" />
    <Articles :items="init_variables?.articles" />
  </div>
</template>

<script setup lang="ts">
import PromotionServices from "@/modules/web/components/home/service/PromotionServices.vue";
import MainServices from "@/modules/web/components/home/service/MainServices.vue";
import Features from "@/modules/web/components/home/feature/Features.vue";
import Articles from "@/modules/web/components/home/article/Articles.vue";
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
