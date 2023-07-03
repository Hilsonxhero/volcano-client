<template>
  <div>
    <base-dialog
      @close="handleCloseCreateProject()"
      title="ایجاد پروژه"
      custom-class="lg:w-[50%]"
      v-model="visible"
    >
      <div class="grid grid-cols-12 gap-4 py-14">
        <div class="col-span-6 flex flex-col items-center justify-center px-6">
          <div class="w-full">
            <base-form :model="form" ref="formRef" class="h-full space-y-6">
              <base-form-item
                :model="form"
                prop="title"
                :rules="[
                  {
                    required: true,
                    message: '  عنوان پروژه الزامی می باشد',
                  },
                ]"
                label="عنوان"
                class="col-span-12"
              >
                <base-input
                  v-model="form.title"
                  placeholder="عنوان پروژه"
                ></base-input>
              </base-form-item>

              <base-form-item
                :model="form"
                prop="description"
                :rules="[
                  {
                    required: true,
                    message: '  توضیحات پروژه الزامی می باشد',
                  },
                ]"
                label="توضیحات"
                class="col-span-12"
              >
                <base-input
                  input-class="h-20 resize-none"
                  type="textarea"
                  v-model="form.description"
                  placeholder="توضیحات پروژه"
                ></base-input>
              </base-form-item>

              <div class="flex flex-col justify-between lg:items-center">
                <div class="w-full">
                  <base-button
                    class="w-full"
                    @click="handleCreateProject"
                    :loading="loader"
                    type="primary"
                    block
                  >
                    ایجاد
                  </base-button>
                </div>
              </div>
            </base-form>
          </div>
        </div>
        <div class="col-span-6 flex flex-col items-center justify-center">
          <div class="w-3/4 mx-auto">
            <img src="@/assets/media/28.svg" alt="" />
          </div>
        </div>
      </div>
    </base-dialog>
  </div>
</template>

<script setup lang="ts">
import { UPDATE_MODEL_EVENT } from "~/core/constants";
import { BaseFormItem, BaseForm, BaseFormGroup } from "@/components/base/form";
import { FormItemContext } from "~/core/tokens";
import BaseMessage from "@/components/base/message";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits([UPDATE_MODEL_EVENT, "create"]);
const visible: Ref<boolean> = ref(false);
const loader = ref(false);
const formRef: Ref<FormItemContext | null> = ref(null);
const form = ref({
  title: null,
  description: null,
});
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

const handleCreateProject = () => {
  formRef.value?.validate(async (valid: any): Promise<void> => {
    if (valid) {
      loader.value = true;
      try {
        const formData = {
          title: form.value.title,
          description: form.value.description,
        };
        const data = await useApiService.post(
          "portal/projects/setup",
          formData
        );

        if (data.success) {
          BaseMessage({
            message: "ساخت پروژه با موفقیت انجام شد!",
            type: "success",
            duration: 4000,
            center: true,
            offset: 20,
          });
          emits("create", true);
          form.value.title = null;
          form.value.description = null;
          handleCloseCreateProject();
        }

        loader.value = false;
      } catch (error) {
        loader.value = false;
      }
    } else {
    }
  });
};
const handleCloseCreateProject = () => {
  emits(UPDATE_MODEL_EVENT, false);
};
</script>

<style scoped></style>
