<template>
  <div>
    <base-skeleton class="mt-3" animated :loading="loading">
      <template #template>
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12">
            <base-skeleton-item
              variant="card"
              class="h-[400px]"
            ></base-skeleton-item>
          </div>
        </div>
      </template>
      <template #default>
        <base-form
          @submit.prevent="handleSave"
          :model="form"
          ref="formRef"
          class="h-full"
        >
          <div>
            <h2 class="text-xl my-4 text-gray-600 font-semibold">
              تنظیمات پروژه
            </h2>
          </div>
          <div
            class="bg-white shadow-xl rounded-xl p-4 grid grid-cols-12 gap-2"
          >
            <base-form-item
              :model="form"
              prop="title"
              :rules="[
                {
                  required: true,
                  message: ' عنوان مسئله  الزامی می باشد',
                },
              ]"
              label="  عنوان مسئله"
              class="col-span-12"
            >
              <base-input
                v-model="form.title"
                placeholder="  عنوان مسئله "
              ></base-input>
              <BaseValidationError :errors="validation_errros" field="title" />
            </base-form-item>
            <base-form-item
              :model="form"
              prop="description"
              label="توضیحات"
              class="col-span-12 mt-6"
            >
              <base-input
                input-class="h-[80px]"
                type="textarea"
                v-model="form.description"
                placeholder="توضیحات "
              ></base-input>
              <BaseValidationError
                :errors="validation_errros"
                field="description"
              />
            </base-form-item>

            <base-form-item
              :model="form"
              prop="public_pages"
              label="دسترسی کاربران به صفحات و داکیومنت های ساخته شده"
              class="col-span-12 mt-6"
            >
              <base-radio-group v-model="form.meta.public_pages" class="">
                <base-radio label="1" size="large"
                  >نمایش به تمام کاربران</base-radio
                >
                <base-radio label="0" size="large"
                  >نمایش فقط به کاربران دارای مجوز دسترسی</base-radio
                >
              </base-radio-group>
              <BaseValidationError
                :errors="validation_errros"
                field="description"
              />
            </base-form-item>
          </div>

          <div class="col-span-12">
            <div class="flex flex-col justify-between lg:items-center mt-8">
              <div class="w-full flex items-center">
                <base-button
                  nativeType="submit"
                  class="w-full"
                  :loading="loader"
                  type="primary"
                  block
                >
                  ذخیره
                </base-button>
                <base-button
                  :to="{ name: 'management-roles-index' }"
                  class="w-full mr-2"
                >
                  لغو
                </base-button>
              </div>
            </div>
          </div>
        </base-form>
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
import { BaseRadioGroup, BaseRadio } from "@/components/base/radio";

import { FormItemContext } from "~/core/tokens";
import BaseMessage from "@/components/base/message";
import { BaseSkeleton, BaseSkeletonItem } from "@/components/base/skeleton";
definePageMeta({
  layout: "project",
  middleware: ["auth"],
});
const validation_errros = ref([]);
const loading = ref(true);
const project = ref(null);
const loader = ref(false);
const radio1 = ref("1");
const formRef: Ref<FormItemContext | null> = ref(null);
const form = ref({
  title: null,
  description: null,
  meta: {
    public_pages: "1",
  },
});
const route = useRoute();

const handleSave = () => {
  formRef.value?.validate(async (valid: any): Promise<void> => {
    if (valid) {
      loader.value = true;
      try {
        const payload = new FormData();
        payload.append("title", form.value.title);
        payload.append("description", form.value.description);
        payload.append("meta", JSON.stringify(form.value.meta));
        const data = await useApiService.post(
          `application/portal/projects/${route.params.id}/setting/variables`,
          payload
        );
        if (data.success) {
          BaseMessage({
            message: "ویرایش  تنظیمات پروژه با موفقیت انجام شد!",
            type: "success",
            duration: 4000,
            center: true,
            offset: 20,
          });
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

const fetchData = async () => {
  const data = await useApiService.get(
    `application/portal/projects/${route.params.id}/show`
  );
  form.value.title = data.data.title;
  form.value.description = data.data.description;
  form.value.meta.public_pages = data.data.meta.public_pages.toString();
  project.value = data.data;

  loading.value = false;
};

onMounted(async () => {
  await fetchData();
});
</script>

<style scoped></style>
