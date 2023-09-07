<template>
  <div>
    <client-only placeholder="loading...">
      <date-picker
        v-bind:disable="disable"
        v-bind:disabled="disabled"
        v-model="date"
        type="date"
      ></date-picker>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import DatePicker from "vue3-persian-datetime-picker";
import { UPDATE_MODEL_EVENT } from "@/core/constants";
const props = defineProps({
  modelValue: {},
  disable: {},
  disabled: {},
});

const date = ref("");
const emits = defineEmits([UPDATE_MODEL_EVENT]);
watch(
  () => date.value,
  (val) => {
    emits(UPDATE_MODEL_EVENT, val);
  }
);

onMounted(() => {
  date.value = props.modelValue;
});
</script>

<style scoped></style>
