<template>
  <div>
    <HeroSection />
    <MainServices :items="init_variables?.main_services" />
    <MainFeature />
    <Overview />
    <PrimaryFeature />
    <Articles :items="init_variables?.articles" />
    <Customer />
  </div>
</template>

<script setup lang="ts">
import Overview from "@/modules/web/components/home/overview/Overview.vue";
import MainServices from "@/modules/web/components/home/service/MainServices.vue";
import MainFeature from "@/modules/web/components/home/feature/MainFeature.vue";
import PrimaryFeature from "@/modules/web/components/home/feature/PrimaryFeature.vue";
import Customer from "@/modules/web/components/home/customer/Customer.vue";

import Articles from "@/modules/web/components/home/article/Articles.vue";
import HeroSection from "@/modules/web/components/home/hero/HeroSection.vue";

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
