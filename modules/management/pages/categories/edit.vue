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
          <h2 class="text-2xl my-4 text-gray-600">ویرایش دسته بندی</h2>
        </div>
        <div class="bg-white shadow-xl rounded-xl p-4">
          <base-form
            @submit.prevent="handleUpdateProject"
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
                  message: '  عنوان  الزامی می باشد',
                },
              ]"
              label="عنوان"
              class="col-span-12 lg:col-span-6"
            >
              <base-input
                v-model="form.title"
                placeholder="عنوان "
              ></base-input>
            </base-form-item>

            <base-form-item
              :model="form"
              prop="link"
              :rules="[
                {
                  required: true,
                  message: '   لینک الزامی می باشد',
                },
              ]"
              label="لینک"
              class="col-span-12 lg:col-span-6"
            >
              <base-input v-model="form.link" placeholder="لینک "></base-input>
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
            </base-form-item>

            <base-form-item
              :model="form"
              prop="parent"
              label="دسته پدر"
              class="col-span-12 lg:col-span-6"
            >
              <base-select
                v-model="form.parent"
                filterable
                placeholder="دسته پدر"
                value-key="id"
                label="title"
                :options="categories"
              >
              </base-select>
            </base-form-item>

            <base-form-item
              :model="form"
              prop="description"
              :rules="[
                {
                  required: true,
                  message: '  توضیحات  الزامی می باشد',
                },
              ]"
              label="توضیحات"
              class="col-span-12"
            >
              <base-input
                input-class="h-20 resize-none"
                type="textarea"
                v-model="form.description"
                placeholder="توضیحات "
              ></base-input>
            </base-form-item>

            <base-form-item
              :model="form"
              prop="description"
              :rules="[
                {
                  required: true,
                  message: '  تصویر  الزامی می باشد',
                },
              ]"
              label="تصویر"
              class="col-span-12"
            >
              <div v-if="form.media">
                <client-only>
                  <base-upload
                    :max="1"
                    v-model="form.image"
                    :sources="form.media?.thumb"
                  ></base-upload>
                </client-only>
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
                  :to="{ name: 'management-categories-index' }"
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
import { BaseFormItem, BaseForm, BaseFormGroup } from "@/components/base/form";
import { FormItemContext } from "~/core/tokens";
import BaseMessage from "@/components/base/message";
import { BaseSkeleton, BaseSkeletonItem } from "@/components/base/skeleton";

definePageMeta({
  layout: "management",
  middleware: ["auth"],
});
const loading = ref(true);
const loader = ref(false);
const formRef: Ref<FormItemContext | null> = ref(null);
const form = ref({
  title: null,
  description: null,
  parent: null,
  link: null,
  image: null,
  media: null,
});
const statuses = ref([
  { title: "فعال", key: "enable" },
  { title: "غیر فعال", key: "disable" },
]);
const category_id = ref(null);
const categories = ref([]);
const route = useRoute();
const handleUpdateProject = () => {
  formRef.value?.validate(async (valid: any): Promise<void> => {
    if (valid) {
      loader.value = true;
      try {
        // const formData = {
        //   title: form.value.title,
        //   link: form.value.link,
        //   status: form.value.status,
        //   parent: form.value.parent,
        //   description: form.value.description,
        //   image: form.value.image?.base64,
        // };
        const form_data = new FormData();
        form_data.append("title", form.value.title);
        form_data.append("link", form.value.link);
        form_data.append("status", form.value.status);
        form_data.append("parent", form.value.parent ?? "");
        form_data.append("description", form.value.description);
        if (form.value.image?.file) {
          form_data.append("image", form.value.image?.file);
        }
        const data = await useApiService.put(
          `management/categories/${category_id.value}`,
          form_data
        );

        if (data.success) {
          BaseMessage({
            message: "ویرایش دسته بندی با موفقیت انجام شد!",
            type: "success",
            duration: 4000,
            center: true,
            offset: 20,
          });
          form.value.title = null;
          form.value.description = null;
          form.value.link = null;
          form.value.image = null;
          formRef.value.resetFields();
          navigateTo({ name: "management-categories-index" });
        }

        loader.value = false;
      } catch (error) {
        loader.value = false;
      }
    } else {
    }
  });
};

const fetchCategories = async () => {
  // let params = {
  //   page: current_page.value,
  // };
  try {
    const { data } = await useApiService.get(`management/category/select`, {
      // params: params,
    });
    categories.value = data;
    loading.value = false;
  } catch (error) {}
};
const fetchCategory = async () => {
  try {
    const data = await useApiService.get(
      `management/categories/${category_id.value}`
    );
    form.value.title = data.data.title;
    form.value.link = data.data.link;
    form.value.description = data.data.description;
    form.value.status = data.data.status;
    form.value.media = data.data.media;
    form.value.parent = data.data.parent.id;
  } catch (error) {}
};

onMounted(() => {
  fetchCategories();
  category_id.value = route.params.id;
  fetchCategory();
});
</script>

<style scoped></style>
