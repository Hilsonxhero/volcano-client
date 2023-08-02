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
          <h2 class="text-2xl my-4 text-gray-600">ویرایش مقاله</h2>
        </div>
        <div class="bg-white shadow-xl rounded-xl p-4">
          <base-form
            @submit.prevent="handleUpdateArticle"
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
              class="col-span-12 lg:col-span-4"
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
              class="col-span-12 lg:col-span-4"
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
              class="col-span-12 lg:col-span-4"
              prop="category_id"
              :rules="[
                {
                  required: true,
                  message: '  دسته بندی الزامی می باشد',
                },
              ]"
              label="  دسته بندی"
            >
              <base-select
                v-model="form.category_id"
                filterable
                placeholder="  دسته بندی"
                value-key="id"
                label="title"
                :options="categories"
              >
              </base-select>
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
                  placeholder="متن مقاله را وارد کنید"
                />
              </div>
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
              label=" تضویر"
              class="col-span-12 mt-8"
            >
              <div>
                <base-upload
                  :max="1"
                  v-model="form.image"
                  :sources="form.media?.thumb"
                ></base-upload>
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
                  ویرایش
                </base-button>
                <base-button
                  :to="{ name: 'management-articles-index' }"
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
const loading = ref(true);
const loader = ref(false);
const formRef: Ref<FormItemContext | null> = ref(null);
const form = ref({
  title: null,
  status: null,
  category_id: null,
  image: null,
  content: null,
  description: null,
});
const article_id = ref(null);
const validation_errros = ref([]);
const categories = ref([]);
const statuses = ref([
  { title: "فعال", key: "enable" },
  { title: "غیر فعال", key: "disable" },
  { title: "در حال انتظار", key: "pending" },
  { title: "رد شده", key: "rejected" },
]);
const route = useRoute();
const handleUpdateArticle = () => {
  formRef.value?.validate(async (valid: any): Promise<void> => {
    if (valid) {
      loader.value = true;
      try {
        // const formData = {
        //   id: article_id.value,
        //   title: form.value.title,
        //   category_id: form.value.category_id,
        //   status: form.value.status,
        //   content: form.value.content,
        //   image: form.value.image?.base64,
        //   description: form.value.description,
        // };
        const form_data = new FormData();
        form_data.append("id", article_id.value);
        form_data.append("title", form.value.title);
        form_data.append("description", form.value.description);
        form_data.append("content", form.value.content);
        form_data.append("category_id", form.value.category_id);
        form_data.append("status", form.value.status);
        if (form.value.image.file) {
          form_data.append("image", form.value.image?.file);
        }
        const data = await useApiService.put(
          `management/articles/${article_id.value}`,
          form_data
        );

        if (data.success) {
          BaseMessage({
            message: "ویرایش مقاله با موفقیت انجام شد!",
            type: "success",
            duration: 4000,
            center: true,
            offset: 20,
          });
          form.value.title = null;
          form.value.category_id = null;
          form.value.content = null;
          form.value.description = null;
          form.value.status = null;
          formRef.value.resetFields();
          navigateTo({ name: "management-articles-index" });
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

const fetchCategories = async () => {
  try {
    const data = await useApiService.get(`management/category/select`);
    categories.value = data.data;
  } catch (error) {}
};

const fetchArticle = async () => {
  try {
    const data = await useApiService.get(
      `management/articles/${article_id.value}`
    );

    form.value.title = data.data.title;
    form.value.category_id = data.data.category.id;
    form.value.status = data.data.status;
    form.value.content = data.data.content;
    form.value.description = data.data.description;
    form.value.media = data.data.media;
    loading.value = false;
  } catch (error) {}
};

onMounted(async () => {
  article_id.value = route.params.id;
  await fetchCategories();
  await fetchArticle();
});
</script>

<style scoped></style>
