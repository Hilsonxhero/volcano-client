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
          <base-button
            type="primary"
            :loading="loader"
            @click="handleCreatePageHead"
          >
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
import BaseMessage from "@/components/base/message";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits([UPDATE_MODEL_EVENT, "close", "create"]);

const visible_create_head = ref(true);
const formRef: Ref<FormItemContext | null> = ref(null);
const project_id = ref(null);
const form = ref({
  title: "",
});
const loader = ref(false);
const route = useRoute();

const handleCloseCreateHead = () => {
  emits("close", false);
};

const handleCreatePageHead = () => {
  formRef.value?.validate(async (valid: any): Promise<void> => {
    if (valid) {
      loader.value = true;
      try {
        const formData = {
          title: form.value.title,
          parent_id: null,
          project_id: project_id.value,
        };
        const data = await useApiService.post(
          `portal/projects/${project_id.value}/pages`,
          formData
        );
        if (data.success) {
          BaseMessage({
            message: "ساخت عنوان صفحه با موفقیت انجام شد!",
            type: "success",
            duration: 4000,
            center: true,
            offset: 20,
          });
          emits("create", true);
          form.value.title = null;
          handleCloseCreateHead();
        }

        loader.value = false;
      } catch (error) {
        loader.value = false;
      }
    } else {
    }
  });
};

watch(
  () => props.visible,
  (val) => {
    formRef.value?.resetFields();
    visible_create_head.value = val;
  },
  { immediate: true }
);

onMounted(() => {
  project_id.value = route.params.id;
});
</script>

<style scoped></style>
