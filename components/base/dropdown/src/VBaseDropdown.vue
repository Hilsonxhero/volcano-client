<template>
  <div>
    <tippy
      @show="handleOnShow"
      :interactive="true"
      :placement="placement"
      zIndex="50"
    >
      <slot />
      <template #content>
        <div class="bg-white rounded-[16px]">
          <slot name="content"></slot>
        </div>
      </template>
    </tippy>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
const props = defineProps({
  placement: {
    type: String,
    default: "bottom",
  },
  width: {
    type: [Number, String],
    default: 200,
  },
  class: {
    type: String,
  },
  modelValue: {},
});

const handleOnShow = (instance: any) => {
  if (props.class) {
    instance.popper.classList.add(`base-dropdown`, props.class);
  } else {
    instance.popper.classList.add(`base-dropdown`);
  }
  if (props.width) {
    instance.popper.style.width = `${props.width}px`;
  }
};

const emit = defineEmits(["update:modelValue"]);
</script>

<style scoped></style>
