<template>
  <button
    type="button"
    :class="[ns.e('menu-item'), { 'is-active': isActive ? isActive() : null }]"
    @click="action"
    :title="title"
  >
    <nuxt-icon filled :name="icon" class="w-6 h-6 text-gray-500"></nuxt-icon>
  </button>
</template>

<script lang="ts" setup>
// @ts-nocheck

const ns = useNamespace("tiptap");

const props = defineProps({
  icon: {
    type: String,
  },
  title: {
    type: String,
  },
  action: {
    type: Function,
  },
  isActive: {
    type: Function,
    default: null,
  },
});

// const www = (): void | Function => {
//     return props.action
// }
</script>
