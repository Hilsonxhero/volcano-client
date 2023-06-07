<template>
  <div>
    <base-dialog
      @close="handleCloseCreateHead()"
      title="ایجاد عنوان صفحات"
      custom-class=""
      v-model="visible_create_head"
    >
      <base-form :model="form" ref="formRef" class="h-full space-y-6">
        <base-form-item
          :model="form"
          prop="title"
          :rules="[
            {
              required: true,
              message: '  عنوان  الزامی می باشد',
            },
          ]"
          label="عنوان"
          class="col-span-12"
        >
          <base-input v-model="form.title" placeholder="عنوان "></base-input>
        </base-form-item>
      </base-form>

      <template #footer="{ close }">
        <div class="flex items-center space-x-reverse space-x-4">
          <base-button type="primary" @click="handleCreatePageHead">
            تایید
          </base-button>
          <base-button type="text" @click="close"> لغو </base-button>
        </div>
      </template>
    </base-dialog>
  </div>
</template>

<script setup lang="ts">
import { BaseFormItem, BaseForm } from "@/components/base/form";
import { UPDATE_MODEL_EVENT } from "~/core/constants";
import { FormItemContext } from "~/core/tokens";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits([UPDATE_MODEL_EVENT, "close"]);

const visible_create_head = ref(true);
const formRef: Ref<FormItemContext | null> = ref(null);

const handleCloseCreateHead = () => {
  emits("close", false);
};

const form = ref({
  title: "",
});

const handleCreatePageHead = () => {
  formRef.value?.validate((valid: any): void => {
    if (valid) {
    } else {
    }
  });
};

watch(
  () => props.visible,
  (val) => {
    visible_create_head.value = val;
  },
  { immediate: true }
);
</script>

<style scoped></style>
