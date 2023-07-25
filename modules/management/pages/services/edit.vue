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
          <h2 class="text-2xl my-4 text-gray-600">ویرایش خدمات</h2>
        </div>
        <div class="bg-white shadow-xl rounded-xl p-4">
          <base-form
            @submit.prevent="handleUpdateService"
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
              prop="is_promotion"
              label="ویژه شده"
              class="col-span-12 mt-8"
            >
              <base-switch v-model="form.is_promotion" />
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
                  :to="{ name: 'management-services-index' }"
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
  is_promotion: false,
});
const service_id = ref(null);
const validation_errros = ref([]);
const categories = ref([]);
const statuses = ref([
  { title: "فعال", key: "active" },
  { title: "غیر فعال", key: "inactive" },
]);
const route = useRoute();
const handleUpdateService = () => {
  formRef.value?.validate(async (valid: any): Promise<void> => {
    if (valid) {
      loader.value = true;
      try {
        const formData = new FormData();
        formData.append("title", form.value.title);
        formData.append("description", form.value.description);
        formData.append("status", form.value.status);
        formData.append("is_promotion", form.value.is_promotion ? 1 : 0);
        if (form.value.image.file) {
          formData.append("media", form.value.image?.file);
        }
        const data = await useApiService.put(
          `management/services/${service_id.value}`,
          formData
        );

        if (data.success) {
          BaseMessage({
            message: "ویرایش خدمات با موفقیت انجام شد!",
            type: "success",
            duration: 4000,
            center: true,
            offset: 20,
          });
          form.value.title = null;
          form.value.description = null;
          form.value.status = null;
          formRef.value.resetFields();
          navigateTo({ name: "management-services-index" });
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

const fetchService = async () => {
  try {
    const data = await useApiService.get(
      `management/services/${service_id.value}`
    );
    form.value.title = data.data.title;
    form.value.status = data.data.status;
    form.value.description = data.data.description;
    form.value.is_promotion = data.data.is_promotion ? true : false;
    form.value.media = data.data.media;
    loading.value = false;
  } catch (error) {}
};

onMounted(async () => {
  service_id.value = route.params.id;
  await fetchService();
});
</script>

<style scoped></style>
