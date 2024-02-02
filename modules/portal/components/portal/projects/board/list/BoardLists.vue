<template>
  <div class="relative h-full">
    <ul class="board-module">
      <ListItem
        v-for="(list_item, index) in items"
        :key="index"
        :item="list_item"
        @open="showCreateCardDialog"
        @show="handleOnShowCardDetail"
      />
      <li class="w-[272px] cursor-pointer" @click="handleShowCreateList">
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
    <CreateListDialog
      @create="handleOnCreateList"
      v-model="visible_create_list"
    />
    <CreateCardDialog
      :list="selected_list"
      @create="handleOnCreateCard"
      v-model="visible_create_card"
    />
    <CardDetailDialog :card="selected_card" v-model="visible_card_detail" />
  </div>
</template>

<script setup lang="ts">
import ListItem from "@/modules/portal/components/portal/projects/board/list/ListItem.vue";
import CreateListDialog from "@/modules/portal/components/portal/projects/board/list/CreateListDialog.vue";
import CreateCardDialog from "@/modules/portal/components/portal/projects/board/list/CreateCardDialog.vue";
import CardDetailDialog from "@/modules/portal/components/portal/projects/board/list/CardDetailDialog.vue";

import { useBoardStore } from "@/modules/portal/store/board";
import { storeToRefs } from "pinia";

const props = defineProps({
  items: {
    type: Array,
  },
});
const store = useBoardStore();
const { board_lists } = storeToRefs(store);
const route = useRoute();
const visible_create_list = ref(false);
const visible_create_card = ref(false);
const visible_card_detail = ref(false);

const selected_card = ref({});
const selected_list = ref(null);
const handleOnCreateList = (row) => {
  store.addList(row);
};
const handleOnCreateCard = (row) => {
  store.addCard({ id: row.board_list_id, card: row });
};
const handleShowCreateList = () => {
  visible_create_list.value = true;
};
const showCreateCardDialog = (id) => {
  selected_list.value = id;
  visible_create_card.value = true;
};

const handleOnShowCardDetail = (row) => {
  selected_card.value = row;
  visible_card_detail.value = true;
};
</script>

<style scoped></style>
