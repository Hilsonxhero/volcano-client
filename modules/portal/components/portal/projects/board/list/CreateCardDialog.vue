<template>
  <div>
    <base-dialog
      @close="handleOnClose()"
      v-model="visible"
      title="ایجاد یادداشت"
      custom-class="lg:w-[60%] "
    >
      <div class="mt-3">
        <base-form
          @submit.prevent="handleCreate"
          :model="form"
          ref="formRef"
          class="grid grid-cols-12 gap-4 px-4"
        >
          <base-form-item
            :model="form"
            prop="title"
            :rules="[
              {
                required: true,
                message: '    عنوان الزامی می باشد',
              },
            ]"
            label=" عنوان"
            class="col-span-12 mb-4"
          >
            <base-input
              v-model="form.title"
              placeholder="  عنوان یادداشت را وارد کنید .."
            ></base-input>
          </base-form-item>

          <base-form-item
            :model="form"
            prop="image"
            label=" توضیحات"
            class="col-span-12"
          >
            <div>
              <TiptapEditor
                v-model="form.content"
                placeholder="توضیحات یادداشت را وارد کنید"
              />
            </div>
          </base-form-item>

          <base-form-item
            :model="form"
            prop="attachments"
            label="پیوست ها"
            class="col-span-12"
          >
            <base-upload multiple :max="5" v-model="form.image"></base-upload>
          </base-form-item>

          <div class="col-span-12">
            <div class="flex flex-col justify-between lg:items-center mt-2">
              <div class="w-full flex items-center">
                <base-button
                  nativeType="submit"
                  class=""
                  :loading="loader"
                  type="primary"
                  block
                >
                  ایجاد
                </base-button>
              </div>
            </div>
          </div>
        </base-form>
      </div>
    </base-dialog>
  </div>
</template>

<script setup lang="ts">
import { BaseFormItem, BaseForm, BaseFormGroup } from "@/components/base/form";
import BaseMessage from "@/components/base/message";
import { UPDATE_MODEL_EVENT } from "~/core/constants";
import { FormItemContext } from "~/core/tokens";
import TiptapEditor from "@/components/common/tiptap/tiptap-editor.vue";

const emits = defineEmits([UPDATE_MODEL_EVENT, "create"]);

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  list: {},
});
const visible: Ref<boolean> = ref(false);

const route = useRoute();
const form = ref({
  title: null,
  content: null,
});
const formRef = ref(null);
const loader = ref(false);

watch(
  () => props.modelValue,
  (val: boolean) => {
    visible.value = val;
  }
);
watch(
  () => visible.value,
  (val: boolean) => {
    formRef.value?.resetFields();
  }
);

const handleCreate = () => {
  formRef.value?.validate(async (valid: any): Promise<void> => {
    if (valid) {
      loader.value = true;
      try {
        const form_data = new FormData();
        form_data.append("title", form.value.title);
        form_data.append("description", form.value.title);
        form_data.append("board_list_id", props.list);
        if (form.value.image && form.value.image.length >= 1) {
          let uploaded_media = form.value.image.filter((item, j) =>
            item.hasOwnProperty("media")
          );
          if (uploaded_media.length >= 1) {
            for (var i = 0; i < uploaded_media.length; i++) {
              form_data.append(`attachments[${i}]`, uploaded_media[i].media);
            }
          }
        }

        const data = await useApiService.post(
          `application/portal/projects/board/list/${props.list}/cards`,
          form_data
        );

        if (data.success) {
          BaseMessage({
            message: "ساخت  یادداشت با موفقیت انجام شد!",
            type: "success",
            duration: 4000,
            center: true,
            offset: 20,
          });
          form.value.title = null;
          formRef.value.resetFields();
          emits("create", data.data);
          handleOnClose();
        }

        loader.value = false;
      } catch (error) {
        loader.value = false;
      }
    } else {
    }
  });
};

const handleOnClose = () => {
  emits(UPDATE_MODEL_EVENT, false);
};
</script>

<style scoped></style>
