<template>
  <div class="relative h-full">
    <ul class="board-module">
      <ListItem
        v-for="(list_item, index) in items"
        :key="index"
        :item="list_item"
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
      @create="handleOnCreateList"
      v-model="visible_create_list"
    />
  </div>
</template>

<script setup lang="ts">
import ListItem from "@/modules/portal/components/portal/projects/board/list/ListItem.vue";
import CreateListDialog from "@/modules/portal/components/portal/projects/board/list/CreateListDialog.vue";
import CreateCardDialog from "@/modules/portal/components/portal/projects/board/list/CreateCardDialog.vue";

const props = defineProps({
  items: {
    type: Array,
  },
});
const route = useRoute();
const visible_create_list = ref(false);
const handleOnCreateList = () => {};

const handleShowCreateList = () => {
  visible_create_list.value = true;
};
</script>

<style scoped></style>
