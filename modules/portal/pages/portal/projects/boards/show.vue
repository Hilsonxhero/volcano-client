<template>
  <div class="board-canvas">
    <ul class="board-module">
      <li
        class="w-[272px] cursor-pointer board-module__item"
        v-for="(board, index) in 7"
        :key="index"
      >
        <div
          class="px-4 py-3 rounded-xl bg-gray-100 border font-light mb-2 flex flex-col max-h-full board-module__item--box"
        >
          <div class="w-full flex justify-between items-center">
            <div>لورم ایپسوم متن ساختگی</div>
            <div>
              <base-dropdown placement="left-start">
                <span
                  class="bg-gray-100 cursor-pointer rounded-lg flex justify-center items-center min-w-[2rem] h-[2rem]"
                >
                  <span class="svg-icon svg-icon-2">
                    <nuxt-icon
                      name="more-out"
                      class="w-6 h-6 text-gray-500"
                    ></nuxt-icon>
                  </span>
                </span>

                <template #content>
                  <ul></ul>
                  <div>
                    <div
                      @click="handleDeleteboard(board, index)"
                      class="text-gray-700 cursor-pointer rounded-[12px] px-3 py-2 hover:bg-gray-100"
                    >
                      <span> حذف تابلو</span>
                    </div>
                  </div>
                </template>
              </base-dropdown>
            </div>
          </div>
          <div class="mb-4 cards-list">
            <div
              v-for="(item, index) in 20"
              :key="index"
              class="py-3 bg-white px-2 rounded-xl font-light flex items-center mb-2"
            >
              <span class="mr-3">ایجاد یادداشت</span>
            </div>
          </div>
          <div
            class="py-1 bg-white px-2 rounded-xl font-light flex items-center mt-3"
          >
            <div>
              <span
                class="bg-gray-100 cursor-pointer rounded-lg flex justify-center items-center min-w-[2rem] h-[2rem]"
              >
                <span class="svg-icon svg-icon-2">
                  <nuxt-icon
                    name="add"
                    class="w-6 h-6 text-gray-500"
                  ></nuxt-icon>
                </span>
              </span>
            </div>
            <span class="mr-3">ایجاد یادداشت</span>
          </div>
        </div>
      </li>
      <li class="w-[272px] cursor-pointer">
        <div class="px-4 py-2 rounded-xl border-2 font-light flex items-center">
          <div>
            <span
              class="bg-gray-100 cursor-pointer rounded-lg flex justify-center items-center min-w-[2rem] h-[2rem]"
            >
              <span class="svg-icon svg-icon-2">
                <nuxt-icon name="add" class="w-6 h-6 text-gray-500"></nuxt-icon>
              </span>
            </span>
          </div>
          <span class="mr-3">ایجاد لیست جدید</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "board",
  middleware: ["auth"],
});
</script>

<style scoped></style>
