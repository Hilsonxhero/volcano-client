<template>
  <div>
    <base-dialog
      @close="handleCloseCreateHead()"
      :title="head_edit_mode ? 'ویرایش عنوان صفحه' : 'ایجاد عنوان صفحه'"
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
          <base-button type="primary" :loading="loader" @click="handleSave">
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
import { head } from "lodash-unified";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  head: {},
});

const emits = defineEmits([UPDATE_MODEL_EVENT, "close", "store"]);
const head_edit_mode = ref(false);
const visible_create_head = ref(true);
const formRef: Ref<FormItemContext | null> = ref(null);
const project_id = ref(null);
const form = ref({
  title: "",
});
const loader = ref(false);
const route = useRoute();

const handleCloseCreateHead = () => {
  form.value.title = "";
  head_edit_mode.value = false;
  // formRef.value?.resetFields();
  emits("close", false);
};

const handleSave = () => {
  if (props.head) {
    handleUpdatePageHead();
  } else {
    handleCreatePageHead();
  }
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
          `application/portal/projects/${project_id.value}/pages`,
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
          emits("store", true);
          form.value.title = "";
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

const handleUpdatePageHead = () => {
  formRef.value?.validate(async (valid: any): Promise<void> => {
    if (valid) {
      loader.value = true;
      try {
        const formData = {
          title: form.value.title,
          parent_id: null,
          project_id: project_id.value,
        };

        const data = await useApiService.patch(
          `application/portal/projects/${project_id.value}/pages/${props.head?.id}`,
          formData
        );
        if (data.success) {
          BaseMessage({
            message: "ویرایش عنوان صفحه با موفقیت انجام شد!",
            type: "success",
            duration: 4000,
            center: true,
            offset: 20,
          });
          emits("store", true);
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
    visible_create_head.value = val;
  },
  { immediate: true }
);

watch(
  () => props.head,
  (val) => {
    if (val) {
      head_edit_mode.value = true;
      form.value.title = val?.title;
    }
  }
);

onMounted(() => {
  project_id.value = route.params.id;
});
</script>

<style scoped></style>
