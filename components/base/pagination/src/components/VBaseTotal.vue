<template>
  <span :class="ns.e('total')" :disabled="disabled"> sample text </span>
</template>

<script lang="ts" setup>
import { usePagination } from "../usePagination";
import { paginationTotalProps } from "./VTotal";

const ns = useNamespace("pagination");
const { disabled } = usePagination();

defineProps(paginationTotalProps);
</script>
