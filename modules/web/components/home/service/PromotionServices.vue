<template>
  <div>
    <div class="home-section-services p-10 rounded-2xl">
      <div class="grid grid-cols-12 gap-4">
        <div
          class="col-span-12 md:col-span-4 lg:col-span-3"
          v-for="(service, index) in items"
          :key="index"
        >
          <a href="#" class="feature-card blue scale-up w-inline-block"
            ><div class="icon-wrapper">
              <img src="@/assets/media/001.svg" alt="" class="text-white" />
            </div>
            <div class="feature-card-text-wrapper">
              <h3 class="text-3xl mb-3 text-white">
                {{ service?.title }}
              </h3>
              <p class="text-white ellipsis-2">
                {{ service?.description }}
              </p>
            </div></a
          >
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
