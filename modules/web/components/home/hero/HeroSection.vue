<template>
  <div>
    <div class="section-hero">
      <div class="content">
        <div class="block-hero">
          <h1 data-w-id="Heading 2" class="heading-hero">
            افزایش بهره‌وری و همکاری برای رشد

            <span class="text-accent">کسب و کار</span>
          </h1>

          <p data-w-id="Paragraph 2" class="paragraph-hero text-gray-300">
            {{ variables?.home_description }}
          </p>
          <template v-if="store.isLoggedIn">
            <router-link
              :to="{ name: 'portal-projects-index' }"
              class="button w-button"
            >
              شروع کنیم!
            </router-link>
          </template>
          <template v-else>
            <router-link :to="{ name: 'auth' }" class="button w-button">
              شروع کنیم!
            </router-link>
          </template>
        </div>
        <div
          data-w-id="bfdef6b2-2e26-0bbb-6944-284fe24ab051"
          class="block-hero-img"
        >
          <div class="block-circle---hero-1">
            <img
              src="~/assets/media/shape-02.png"
              loading="eager"
              alt=""
              class="image-circle---5"
            />
            <img
              src="~/assets/media/shape-02.png"
              loading="eager"
              alt=""
              class="image-circle---6"
            />
            <img
              src="~/assets/media/shape-01.webp"
              loading="eager"
              alt=""
              class="image-circle---7"
            />
            <img
              src="~/assets/media/shape-01.webp"
              loading="eager"
              alt=""
              class="image-circle---8"
            />
            <img
              src="~/assets/media/shape-02.png"
              loading="eager"
              alt=""
              class="image-circle---9"
            />
          </div>

          <div class="block-circle---hero-2">
            <img
              src="~/assets/media/shape-01.webp"
              loading="eager"
              alt=""
              class="image-circle---1"
              s
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/modules/auth/store";
import { storeToRefs } from "pinia";
import { useWebStore } from "@/modules/web/store";
const webStore = useWebStore();
const { variables } = storeToRefs(webStore);
const store = useAuthStore();
const { user } = storeToRefs(store);
</script>

<style scoped></style>
