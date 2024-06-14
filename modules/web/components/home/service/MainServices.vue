<template>
  <div class="section">
    <div data-w-id="Div Block" class="content">
      <div class="block-center">
        <h2 data-w-id="Heading 3" class="heading">
          با تمام امکاناتی که نیاز دارید
        </h2>
        <p data-w-id="Paragraph 3" class="paragraph text-gray-300">
          سریعتر از همیشه ایده های خود را به نتیجه برسانید.!
        </p>
      </div>
      <div class="w-layout-grid grid-feature">
        <div
          data-w-id="Div Block 3"
          class="feature"
          v-for="(feature, index) in items"
          :key="index"
        >
          <div class="icon-feature-bg">
            <img
              :src="feature?.media?.main"
              loading="eager"
              alt=""
              class="icon-feature"
              width="35"
            />
          </div>
          <h5 class="heading-feature">{{ feature?.title }}</h5>
          <p class="paragraph-feature text-gray-400">
            {{ feature?.description }}
          </p>
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
