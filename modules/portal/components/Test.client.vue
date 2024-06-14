<template>
  <div>
    <ClientOnly>
      <draggable
        class="mb-4 cards-list list-group"
        v-model="list1"
        item-key="name"
      >
        <template #item="{ element, index }">
          <div class="list-group-item bg-gray-200 px-3 py-3 mb-2 handle">
            {{ element.name }}
          </div>
        </template>
      </draggable>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import draggable from "vuedraggable";
const list1 = ref([
  { name: "John", id: 1 },
  { name: "Joao", id: 2 },
  { name: "Jean", id: 3 },
  { name: "Gerard", id: 4 },
]);
</script>

<style scoped></style>
