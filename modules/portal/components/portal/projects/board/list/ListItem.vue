<template>
  <li class="w-[272px] cursor-pointer board-module__item">
    <div
      class="px-4 py-3 rounded-xl bg-gray-100 border font-light mb-2 flex flex-col max-h-full board-module__item--box"
    >
      <div class="w-full flex justify-between items-center mb-3 font-semibold">
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
              <div>
                <div
                  @click="handleDeleteList(item, index)"
                  class="text-gray-700 cursor-pointer rounded-[12px] px-3 py-2 hover:bg-gray-100"
                >
                  <span> حذف لیست</span>
                </div>
                <div
                  @click="handleShowEditListDialog(item, index)"
                  class="text-gray-700 cursor-pointer rounded-[12px] px-3 py-2 hover:bg-gray-100"
                >
                  <span>ویرایش</span>
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
        handle=".handle"
        :component-data="collapseComponentData"
      >
        <template #item="{ element, index }">
          <div
            v-on:click.native="handleShowCard(element)"
            class="justify-between relative z-[100] list-group-item group bg-white px-3 py-2 mb-2 flex items-center rounded-xl whitespace-normal border-2 hover:border-2 hover:border-blue-600 transition-all ease-linear"
          >
            <p class="ellipsis-2">
              {{ element?.title }}
            </p>
            <span class="handle">
              <nuxt-icon
                name="command-square"
                class="w-6 h-6 text-gray-500"
              ></nuxt-icon>
            </span>
          </div>
        </template>
      </draggable>
      <div
        @click="showCreateCard"
        class="py-2 bg-white px-2 rounded-xl font-light flex items-center mt-3"
      >
        <div>
          <span
            class="cursor-pointer rounded-lg flex justify-center items-center"
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
import { BaseMessageBox } from "@/components/base/message-box";
import BaseMessage from "@/components/base/message";
import { useBoardStore } from "@/modules/portal/store/board";
import { storeToRefs } from "pinia";
const store = useBoardStore();
const props = defineProps({
  item: {
    type: Object,
  },
});
const route = useRoute();
const collapseComponentData = ref({});
const emits = defineEmits(["open", "show", "config"]);
const visible_card_detail = ref(false);
const visible_actions = ref(false);

const onChange = async (val) => {
  var element_id = null;
  if (val.removed != undefined) {
    element_id = val.removed.element.id;
  } else if (val.added != undefined) {
    element_id = val.added.element.id;
    const form_data = {
      board_list_id: props.item?.id,
      id: element_id,
      newIndex: val.added.newIndex,
    };
    const data = await useApiService.post(
      "application/portal/projects/board/card/position",
      form_data
    );
  } else if (val.moved != undefined) {
    element_id = val.moved.element.id;
    const form_data = {
      board_list_id: props.item?.id,
      id: element_id,
      newIndex: val.moved.newIndex,
    };
    const data = await useApiService.post(
      "application/portal/projects/board/card/position",
      form_data
    );
  }
  console.log("element_id", element_id);

  console.log("val", val);

  console.log("item", props.item);
};

const showCreateCard = () => {
  // visible_create_card.value = true;
  emits("open", props.item?.id);
};
const handleDeleteList = (row, index) => {
  BaseMessageBox.confirm(
    `آیا از حذف لیست  اطمینان دارید ؟!`,
    " تایید حذف لیست",
    {
      confirmButtonText: "تایید",
      cancelButtonText: "لغو",
      type: "warning",
    }
  )
    .then(async () => {
      const data = await store.deleteList({
        board: route.params.board,
        list: props.item.id,
      });

      if (data.success) {
        BaseMessage({
          message: "حذف   لیست با موفقیت انجام شد!",
          type: "success",
          duration: 4000,
          center: true,
          offset: 20,
        });
      }
    })
    .catch(() => {});
};
const handleShowCard = (row) => {
  emits("show", row);
};
const handleShowEditListDialog = (row, index) => {
  emits("config", row);
  visible_actions.value = false;
};
</script>

<style scoped></style>
