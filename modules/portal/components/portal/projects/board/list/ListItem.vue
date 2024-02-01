<template>
  <li class="w-[272px] cursor-pointer board-module__item">
    <div
      class="px-4 py-3 rounded-xl bg-gray-100 border font-light mb-2 flex flex-col max-h-full board-module__item--box"
    >
      <div class="w-full flex justify-between items-center mb-3">
        <div>{{ item?.title }}</div>
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
                  @click="handleDeleteList(item, index)"
                  class="text-gray-700 cursor-pointer rounded-[12px] px-3 py-2 hover:bg-gray-100"
                >
                  <span> حذف لیست</span>
                </div>
              </div>
            </template>
          </base-dropdown>
        </div>
      </div>

      <draggable
        class="mb-4 cards-list list-group"
        v-model="item.cards"
        item-key="id"
        group="elements"
        :multi-drag="true"
        @change="onChange"
      >
        <template #item="{ element, index }">
          <div
            class="list-group-item bg-white px-3 py-2 mb-2 handle flex items-center rounded-xl"
          >
            <div>{{ element?.title }}</div>
          </div>
        </template>
      </draggable>
      <div
        @click="showCreateCard"
        class="py-1 bg-white px-2 rounded-xl font-light flex items-center mt-3"
      >
        <div>
          <span
            class="bg-gray-100 cursor-pointer rounded-lg flex justify-center items-center min-w-[2rem] h-[2rem]"
          >
            <span class="svg-icon svg-icon-2">
              <nuxt-icon name="add" class="w-6 h-6 text-gray-500"></nuxt-icon>
            </span>
          </span>
        </div>
        <span class="mr-3">ایجاد یادداشت</span>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import draggable from "vuedraggable";

const props = defineProps({
  item: {
    type: Object,
  },
});

const emits = defineEmits(["open"]);
const visible_create_card = ref(false);

const onChange = (val) => {
  var element_id = null;
  if (val.removed != undefined) {
    element_id = val.removed.element.id;
  } else if (val.added != undefined) {
    element_id = val.added.element.id;
  } else if (val.moved != undefined) {
    element_id = val.moved.element.id;
  }
};

const showCreateCard = () => {
  // visible_create_card.value = true;
  emits("open", props.item?.id);
};
const handleDeleteList = (row, index) => {};
</script>

<style scoped></style>
