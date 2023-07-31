<template>
  <div>
    <section>
      <div class="h-[200px] lg:h-[400px] w-full">
        <img
          class="w-full h-full object-cover"
          :src="feature?.media?.cover"
          alt=""
        />
      </div>
    </section>
    <section>
      <div class="container">
        <div class="mt-8">
          <h2 class="text-xl lg:text-2xl font-semibold text-gray-600">
            {{ feature?.title }}
          </h2>
          <div class="mt-4">
            <p class="text-gray-400 text-justify leading-6">
              {{ feature?.description }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const feature_id = ref(null);
const feature = ref({});
const fetchFeature = async () => {
  try {
    const data = await useApiService.get(
      `application/features/${feature_id.value}`
    );
    console.log("data", data.data);

    feature.value = data.data;
  } catch (error) {}
};

onMounted(() => {
  feature_id.value = route.params.id;
  fetchFeature();
});
</script>

<style scoped></style>
