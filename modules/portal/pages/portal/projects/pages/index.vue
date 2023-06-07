<template>
  <div>
    <div class="mb-3 flex justify-between items-center">
      <h1 class="text-2xl text-gray-600">صفحه ها</h1>
      <div>
        <base-button
          @click="handleShowCreatePageHead()"
          type="primary"
          class=""
          to="/"
        >
          <div class="flex items-center">
            <span class="ml-2">ساخت صفحه</span>
            <nuxt-icon name="add"></nuxt-icon>
          </div>
        </base-button>
      </div>
    </div>

    <div class="mt-4">
      <base-collapse accordion class="product-reviews__collapse">
        <base-collapse-item
          class="bg-white shadow-lg rounded-2xl py-2 px-3 mb-2"
          v-for="(reviewItem, index) in 3"
          :data-index="index + 1"
          title="تست"
          :name="index + 1"
        >
          <template #actions>
            <BaseButton icon>
              <nuxt-icon
                class="w-6 h-6"
                name="add"
                @click="handleShowCreatePage"
              ></nuxt-icon>
            </BaseButton>
            <BaseButton icon>
              <nuxt-icon class="w-6 h-6" name="magicpen"></nuxt-icon>
            </BaseButton>
            <BaseButton icon>
              <nuxt-icon class="w-6 h-6" name="trash"></nuxt-icon>
            </BaseButton>
          </template>
          <div
            v-for="(item, index) in 3"
            :index="index"
            class="bg-white border border-gray-300 rounded-2xl p-2 flex justify-between items-center mb-2"
          >
            <div>
              <div class="text-gray-700">لورم ایپسوم متن</div>
            </div>
            <div class="flex items-center">
              <BaseButton icon>
                <nuxt-icon name="magicpen"></nuxt-icon>
              </BaseButton>
              <BaseButton icon>
                <nuxt-icon name="share"></nuxt-icon>
              </BaseButton>
              <BaseButton icon>
                <nuxt-icon class="w-6 h-6" name="trash"></nuxt-icon>
              </BaseButton>
            </div>
          </div>
        </base-collapse-item>
      </base-collapse>
    </div>

    <PageDialog
      :visible="visible_create_page"
      @close="handleClosePageDialog()"
    />
    <PageHeadDialog
      :visible="visible_create_head"
      @close="handleCloseCreateHead()"
    />
  </div>
</template>

<script setup lang="ts">
import { BaseCollapseItem, BaseCollapse } from "@/components/base/collapse";
import PageDialog from "@/modules/portal/components/pages/PageDialog.vue";
import PageHeadDialog from "@/modules/portal/components/pages/PageHeadDialog.vue";

const visible_create_page = ref(false);

const visible_create_head = ref(false);

const handleShowCreatePage = () => {
  visible_create_page.value = true;
};

const handleShowCreatePageHead = () => {
  visible_create_head.value = true;
};

const handleCloseCreateHead = () => {
  visible_create_head.value = false;
};

const handleClosePageDialog = () => {
  visible_create_page.value = false;
};

definePageMeta({
  layout: "project",
});
</script>

<style scoped></style>
