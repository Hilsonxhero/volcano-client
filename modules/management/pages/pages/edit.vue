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
          <h2 class="text-2xl my-4 text-gray-600">.ویرایش صفحه</h2>
        </div>
        <div class="bg-white shadow-xl rounded-xl p-4">
          <base-form
            @submit.prevent="handleUpdatePage"
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
              prop="key"
              :rules="[
                {
                  required: true,
                  message: '   کلید  الزامی می باشد',
                },
              ]"
              label=" کلید"
              class="col-span-12 lg:col-span-6"
            >
              <base-input v-model="form.key" placeholder=" کلید "></base-input>
            </base-form-item>

            <base-form-item
              :model="form"
              prop="image"
              label=" متن"
              class="col-span-12 mt-8"
            >
              <div>
                <TiptapEditor
                  :content="form.content"
                  v-model="form.content"
                  placeholder="متن صفحه را وارد کنید"
                />
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
                  .ویرایش
                </base-button>
                <base-button
                  :to="{ name: 'management-pages-index' }"
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
  content: null,
  key: null,
});
const validation_errros = ref([]);
const page_id = ref(null);
const route = useRoute();
const handleUpdatePage = () => {
  formRef.value?.validate(async (valid: any): Promise<void> => {
    if (valid) {
      loader.value = true;
      try {
        const formData = {
          title: form.value.title,
          key: form.value.key,
          content: form.value.content,
        };
        const data = await useApiService.put(
          `management/pages/${page_id.value}`,
          formData
        );

        if (data.success) {
          BaseMessage({
            message: ".ویرایش صفحه با موفقیت انجام شد!",
            type: "success",
            duration: 4000,
            center: true,
            offset: 20,
          });
          form.value.title = null;
          form.value.content = null;
          form.value.key = null;
          formRef.value.resetFields();
          navigateTo({ name: "management-pages-index" });
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

const fetchPage = async () => {
  const data = await useApiService.get(`management/pages/${page_id.value}`);
  form.value.title = data.data.title;
  form.value.key = data.data.key;
  form.value.content = data.data.content;
};

onMounted(async () => {
  page_id.value = route.params.id;
  await fetchPage();
});
</script>

<style scoped></style>
