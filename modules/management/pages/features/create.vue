<template>
  <div>
    <base-skeleton class="mt-3" animated :loading="loading">
      <template #template>
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12">
            <base-skeleton-item variant="card"></base-skeleton-item>
          </div>
        </div>
      </template>
      <template #default>
        <div>
          <h2 class="text-2xl my-4 text-gray-600">ایجاد خدمات</h2>
        </div>
        <div class="bg-white shadow-xl rounded-xl p-4">
          <base-form
            @submit.prevent="handleCreateFeature"
            :model="form"
            ref="formRef"
            class="h-full grid grid-cols-12 gap-2"
          >
            <base-form-item
              :model="form"
              prop="title"
              :rules="[
                {
                  required: true,
                  message: '   عنوان  الزامی می باشد',
                },
              ]"
              label=" عنوان"
              class="col-span-12 lg:col-span-6"
            >
              <base-input
                v-model="form.title"
                placeholder=" عنوان "
              ></base-input>
            </base-form-item>

            <base-form-item
              :model="form"
              prop="status"
              label="وضعیت"
              class="col-span-12 lg:col-span-6"
            >
              <base-select
                v-model="form.status"
                placeholder="وضعیت"
                value-key="key"
                label="title"
                :options="statuses"
              >
              </base-select>
              <BaseValidationError :errors="validation_errros" field="status" />
            </base-form-item>

            <base-form-item
              :model="form"
              prop="description"
              label="توضیحات"
              class="col-span-12 mt-4"
            >
              <base-input
                class="h-[80px] resize-none"
                input-class="resize-none"
                type="textarea"
                v-model="form.description"
                placeholder=" توضیحات "
              ></base-input>
              <BaseValidationError
                :errors="validation_errros"
                field="description"
              />
            </base-form-item>

            <base-form-item
              :model="form"
              prop="image"
              label=" تصویر"
              class="col-span-6 mt-8"
            >
              <div>
                <base-upload :max="1" v-model="form.cover"></base-upload>
              </div>
            </base-form-item>
            <base-form-item
              :model="form"
              prop="image"
              label=" آیکون"
              class="col-span-6 mt-8"
            >
              <div>
                <base-upload :max="1" v-model="form.icon"></base-upload>
              </div>
            </base-form-item>

            <div class="flex flex-col justify-between lg:items-center mt-8">
              <div class="w-full flex items-center">
                <base-button
                  nativeType="submit"
                  class="w-full"
                  :loading="loader"
                  type="primary"
                  block
                >
                  ایجاد
                </base-button>
                <base-button
                  :to="{ name: 'management-features-index' }"
                  class="w-full mr-2"
                >
                  لغو
                </base-button>
              </div>
            </div>
          </base-form>
        </div>
      </template>
    </base-skeleton>
  </div>
</template>

<script setup lang="ts">
import { UPDATE_MODEL_EVENT } from "~/core/constants";
import {
  BaseFormItem,
  BaseForm,
  BaseFormGroup,
  BaseValidationError,
} from "@/components/base/form";
import { FormItemContext } from "~/core/tokens";
import BaseMessage from "@/components/base/message";
import { BaseSkeleton, BaseSkeletonItem } from "@/components/base/skeleton";
import TiptapEditor from "@/components/common/tiptap/tiptap-editor.vue";

definePageMeta({
  layout: "management",
  middleware: ["auth"],
});
const loading = ref(false);
const loader = ref(false);
const formRef: Ref<FormItemContext | null> = ref(null);
const form = ref({
  title: null,
  status: null,
  category_id: null,
  cover: null,
  icon: null,
  description: null,
});
const validation_errros = ref([]);
const statuses = ref([
  { title: "فعال", key: "active" },
  { title: "غیر فعال", key: "inactive" },
]);
const route = useRoute();
const handleCreateFeature = () => {
  formRef.value?.validate(async (valid: any): Promise<void> => {
    if (valid) {
      loader.value = true;
      try {
        const formData = new FormData();
        formData.append("title", form.value.title);
        formData.append("description", form.value.description);
        formData.append("status", form.value.status);
        formData.append("cover", form.value.cover?.file);
        formData.append("icon", form.value.icon?.file);

        const data = await useApiService.post(`management/features`, formData);

        if (data.success) {
          BaseMessage({
            message: "ایجاد خدمات با موفقیت انجام شد!",
            type: "success",
            duration: 4000,
            center: true,
            offset: 20,
          });
          form.value.title = null;
          form.value.category_id = null;
          form.value.description = null;
          form.value.status = null;
          formRef.value.resetFields();
          navigateTo({ name: "management-features-index" });
        } else {
        }

        loader.value = false;
      } catch ({ response }) {
        loader.value = false;
        validation_errros.value = response._data.data;
      }
    } else {
    }
  });
};

onMounted(async () => {});
</script>

<style scoped></style>
