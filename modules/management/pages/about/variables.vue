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
        <section class="mb-6 bg-white shadow-lg p-4 rounded-2xl">
          <div>
            <base-form
              @submit.prevent="handleSave"
              :model="form"
              ref="formRef"
              class="h-full"
            >
              <section class="grid grid-cols-12 gap-2">
                <base-form-item
                  :model="form"
                  prop="title"
                  :rules="[
                    {
                      required: true,
                      message: '    عنوان  الزامی می باشد',
                    },
                  ]"
                  label=" عنوان "
                  class="col-span-12 lg:col-span-12"
                >
                  <base-input
                    v-model="form.title"
                    placeholder=" عنوان  "
                  ></base-input>
                </base-form-item>
                <base-form-item
                  :model="form"
                  prop="subtitle"
                  :rules="[
                    {
                      required: true,
                      message: '    عنوان توضیحات  الزامی می باشد',
                    },
                  ]"
                  label=" عنوان توضیحات "
                  class="col-span-12 lg:col-span-12"
                >
                  <base-input
                    v-model="form.subtitle"
                    placeholder=" عنوان توضیحات  "
                  ></base-input>
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
                <base-form-item
                  :model="form"
                  prop="image"
                  label="تصویر"
                  class="col-span-12 mt-8"
                >
                  <div>
                    <base-upload
                      :max="1"
                      v-model="form.cover_media"
                      :sources="form.cover"
                    ></base-upload>
                  </div>
                </base-form-item>
              </section>

              <div class="flex flex-col justify-between lg:items-center mt-8">
                <div class="w-full flex items-center">
                  <base-button
                    nativeType="submit"
                    class="w-full"
                    :loading="loader"
                    type="primary"
                    block
                  >
                    ویرایش
                  </base-button>
                </div>
              </div>
            </base-form>
          </div>
        </section>
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
import { BaseSkeleton, BaseSkeletonItem } from "@/components/base/skeleton";
import { FormItemContext } from "~/core/tokens";
import BaseMessage from "@/components/base/message";
import TiptapEditor from "@/components/common/tiptap/tiptap-editor.vue";

definePageMeta({
  layout: "management",
  middleware: ["auth"],
});
const formRef = ref(null);
const loader = ref(false);
const loading = ref(true);
const form = ref({
  title: null,
  subtitle: null,
  content: null,
  cover: null,
  cover_media: null,
});
const handleSave = () => {
  formRef.value?.validate(async (valid: any): Promise<void> => {
    if (valid) {
      try {
        const form_data = new FormData();
        form_data.append("title", form.value.title);
        form_data.append("subtitle", form.value.subtitle);
        form_data.append("content", form.value.content);

        if (form.value.cover_media.file) {
          form_data.append("cover", form.value.cover_media?.file);
        }

        loader.value = true;
        const data = await useApiService.post(
          "management/about/variables",
          form_data
        );

        BaseMessage({
          message: "ویرایش تنظیمات با موفقیت انجام شد!",
          type: "success",
          duration: 4000,
          center: true,
          offset: 20,
        });
      } catch (error) {}

      loader.value = false;
    }
  });
};

const fetchSetting = async () => {
  const data = await useApiService.get("management/about/variables");
  loading.value = false;
  form.value.title = data.data.title;
  form.value.subtitle = data.data.subtitle;
  form.value.content = data.data.content;
  form.value.cover = data.data.cover;
};

onMounted(() => {
  fetchSetting();
});
</script>

<style scoped></style>
