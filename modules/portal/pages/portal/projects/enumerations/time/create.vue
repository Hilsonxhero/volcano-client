<template>
  <div>
    <div>
      <h2 class="text-2xl my-4 text-gray-600">ایجاد دسته بندی زمان</h2>
    </div>
    <div class="bg-white shadow-xl rounded-xl p-4">
      <base-form
        @submit.prevent="handleCreate"
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
              message: '  نام  دسته بندی زمانی  الزامی می باشد',
            },
          ]"
          label="نام  دسته بندی زمانی"
          class="col-span-12 lg:col-span-6"
        >
          <base-input
            v-model="form.title"
            placeholder="نام  دسته بندی زمانی "
          ></base-input>
          <BaseValidationError :errors="validation_errros" field="title" />
        </base-form-item>

        <base-form-item
          :model="form"
          prop="status"
          :rules="[
            {
              required: true,
              message: '   وضعیت الزامی می باشد',
            },
          ]"
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
          <BaseValidationError :errors="validation_errros" field="form" />
        </base-form-item>

        <base-form-item
          :model="form"
          prop="is_default"
          label="پیش فرض"
          class="col-span-12 mt-8"
        >
          <base-switch v-model="form.is_default" />
        </base-form-item>

        <div class="flex flex-col lg:items-center mt-8 col-span-12">
          <div class="w-full flex items-center flex-wrap">
            <base-button
              nativeType="submit"
              class="w-full lg:w-auto"
              :loading="loader"
              type="primary"
            >
              ایجاد
            </base-button>
            <base-button
              :to="{ name: 'portal-projects-enumerations-index' }"
              class="w-full lg:w-auto lg:mr-2 mt-3 lg:mt-0"
            >
              لغو
            </base-button>
          </div>
        </div>
      </base-form>
    </div>
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
import { BaseCheckbox, BaseCheckboxGroup } from "@/components/base/checkbox";

definePageMeta({
  layout: "project",
  middleware: ["auth"],
});
const loader = ref(false);
const formRef: Ref<FormItemContext | null> = ref(null);
const form = ref({
  title: null,
  status: "active",
  is_default: null,
});
const statuses = ref([
  { title: "فعال", key: "active" },
  { title: "غیر فعال", key: "inactive" },
]);
const validation_errros = ref([]);
const route = useRoute();
const handleCreate = () => {
  formRef.value?.validate(async (valid: any): Promise<void> => {
    if (valid) {
      loader.value = true;
      try {
        const formData = {
          title: form.value.title,
          is_default: form.value.is_default,
          status: form.value.status,
          project_id: route.params.id,
        };
        const data = await useApiService.post(
          `application/portal/projects/${route.params.id}/enumerations/time/categories`,
          formData
        );
        if (data.success) {
          BaseMessage({
            message: "ایجاد  دسته بندی زمان با موفقیت انجام شد!",
            type: "success",
            duration: 4000,
            center: true,
            offset: 20,
          });
          form.value.title = null;
          form.value.name = null;
          form.value.parent_id = null;
          formRef.value.resetFields();
          navigateTo({ name: "portal-projects-enumerations-index" });
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

onMounted(() => {});
</script>

<style scoped></style>
