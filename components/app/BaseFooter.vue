<template>
  <div class="section-footer">
    <div class="section-content">
      <div class="w-layout-grid grid-footer">
        <div
          id="w-node-da92ec24-0a93-58e4-1a73-58ed5b0e2fba-5b0e2fb7"
          class="block-footer"
        >
          <!-- <img
            :src="variables?.logo_light"
            loading="eager"
            alt=""
            class="logo-footer"
          /> -->
          <BaseLogo class="logo-footer" />
          <p class="paragraph-footer text-gray-400">
            {{ variables?.site_description }}
            <br /><br /><a :href="`mailto:${variables?.email}`">
              {{ variables?.email }}
            </a>
          </p>
        </div>
        <div class="block-footer">
          <div class="heading-footer">لینک های مفید</div>
          <a href="/company" class="link-footer">مقالات<br /></a
          ><a href="/features" class="link-footer">ابزارها</a
          ><a href="/contact" class="link-footer">ارتباط با ما</a
          ><a href="/blog" class="link-footer">درباره ما</a>
        </div>
        <div class="block-footer">
          <div class="heading-footer">شبکه های اجتماعی</div>
          <a
            v-for="(socialmedia, index) in variables?.socialmedia"
            :key="index"
            :href="socialmedia?.value"
            target="_blank"
            class="link-footer"
          >
            {{ socialmedia?.name }}
            <br
          /></a>
        </div>
      </div>
      <div data-w-id="da92ec24-0a93-58e4-1a73-58ed5b0e2fe8" class="footer-down">
        <div class="text-footer-down">
          {{ variables?.copyright }}
          <!-- <a href="" target="_blank" class="link-footer-down"></a> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseLogo from "@/components/app/BaseLogo.vue";
import { storeToRefs } from "pinia";
import { useWebStore } from "@/modules/web/store";
const webStore = useWebStore();
const { variables } = storeToRefs(webStore);
</script>

<style scoped></style>
