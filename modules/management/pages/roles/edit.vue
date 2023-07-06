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
          <h2 class="text-2xl my-4 text-gray-600">ویرایش سطح دسترسی</h2>
        </div>
        <div class="bg-white shadow-xl rounded-xl p-4">
          <base-form
            @submit.prevent="handleCreateRole"
            :model="form"
            ref="formRef"
            class="h-full grid grid-cols-12 gap-2"
          >
            <base-form-item
              :model="form"
              prop="name"
              :rules="[
                {
                  required: true,
                  message: '  نام سطح دسترسیی  الزامی می باشد',
                },
              ]"
              label="نام سطح دسترسیی"
              class="col-span-12 lg:col-span-4"
            >
              <base-input
                v-model="form.name"
                placeholder="نام سطح دسترسیی "
              ></base-input>
              <BaseValidationError :errors="validation_errros" field="name" />
            </base-form-item>

            <base-form-item
              :model="form"
              prop="title"
              :rules="[
                {
                  required: true,
                  message: '   عنوان الزامی می باشد',
                },
              ]"
              label="عنوان"
              class="col-span-12 lg:col-span-4"
            >
              <base-input
                v-model="form.title"
                placeholder="عنوان "
              ></base-input>
              <BaseValidationError :errors="validation_errros" field="title" />
            </base-form-item>

            <base-form-item
              class="col-span-12 lg:col-span-4"
              prop="parent_id"
              :rules="[
                {
                  required: true,
                  message: 'گروه سطح دسترسی الزامی می باشد',
                },
              ]"
              label="گروه سطح دسترسی"
            >
              <base-select
                v-model="form.parent_id"
                filterable
                placeholder="گروه سطح دسترسی"
                value-key="id"
                label="title"
                :options="role_groups"
              >
              </base-select>
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
                  :to="{ name: 'management-roles-index' }"
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

definePageMeta({
  layout: "management",
  middleware: ["auth"],
});
const loading = ref(true);
const loader = ref(false);
const formRef: Ref<FormItemContext | null> = ref(null);
const form = ref({
  title: null,
  name: null,
  parent_id: null,
});
const role_id = ref(null);
const validation_errros = ref([]);
const role_groups = ref([]);
const route = useRoute();
const handleCreateRole = () => {
  formRef.value?.validate(async (valid: any): Promise<void> => {
    if (valid) {
      loader.value = true;
      try {
        const formData = {
          id: role_id.value,
          title: form.value.title,
          name: form.value.name,
          parent_id: form.value.parent_id,
        };
        const data = await useApiService.put(
          `management/roles/${role_id.value}`,
          formData
        );

        if (data.success) {
          BaseMessage({
            message: "ویرایش سطح دسترسی با موفقیت انجام شد!",
            type: "success",
            duration: 4000,
            center: true,
            offset: 20,
          });
          form.value.title = null;
          form.value.name = null;
          form.value.parent_id = null;
          formRef.value.resetFields();
          navigateTo({ name: "management-roles-index" });
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

const fetchRoles = async () => {
  try {
    const data = await useApiService.get("application/portal/roles");
    role_groups.value = data.data;
    loading.value = false;
  } catch (error) {}
};

const fetchRole = async () => {
  try {
    const data = await useApiService.get(`management/roles/${role_id.value}`);
    console.log("data", data);
    form.value.title = data.data.title;
    form.value.name = data.data.name;
    form.value.parent_id = data.data.parent_id;
    loading.value = false;
  } catch (error) {}
};

onMounted(async () => {
  role_id.value = route.params.id;
  await fetchRoles();
  await fetchRole();
});
</script>

<style scoped></style>
