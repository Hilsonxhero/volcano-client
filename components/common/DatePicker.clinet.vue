<template>
  <div>
    <client-only placeholder="loading...">
      <date-picker v-model="date" type="date"></date-picker>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import DatePicker from "vue3-persian-datetime-picker";
import { UPDATE_MODEL_EVENT } from "@/core/constants";

const date = ref("");
const emits = defineEmits([UPDATE_MODEL_EVENT]);
watch(
  () => date.value,
  (val) => {
    console.log("val", val);

    emits(UPDATE_MODEL_EVENT, val);
  }
);
</script>

<style scoped></style>
