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
          <h2 class="text-2xl my-4 text-gray-600">ایجاد سطح دسترسی</h2>
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
              class="col-span-12 lg:col-span-6"
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
              class="col-span-12 lg:col-span-6"
            >
              <base-input
                v-model="form.title"
                placeholder="عنوان "
              ></base-input>
              <BaseValidationError :errors="validation_errros" field="title" />
            </base-form-item>

            <div class="col-span-12">
              <div class="grid grid-cols-12 gap-2 mt-8">
                <div
                  class="col-span-4"
                  v-for="(permission, index) in permissions"
                  :key="index"
                >
                  <div>
                    <h2>{{ permission.title }}</h2>
                  </div>
                  <base-checkbox-group v-model="selectedPermissions">
                    <base-checkbox
                      v-for="(childPermission, j) in permission.children"
                      :label="childPermission.id"
                      >{{ childPermission.title }}</base-checkbox
                    >
                  </base-checkbox-group>
                  <!-- <ul>
                      <li
                        v-for="(childPermission, j) in permission.children"
                        :key="j"
                      >
                        <base-checkbox
                          :label="childPermission.title"
                        ></base-checkbox>
                      </li>
                    </ul> -->
                </div>
              </div>
            </div>

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
import { BaseCheckbox, BaseCheckboxGroup } from "@/components/base/checkbox";

definePageMeta({
  layout: "project",
  middleware: ["auth"],
});
const loading = ref(false);
const loader = ref(false);
const selectedPermissions = ref([]);
const formRef: Ref<FormItemContext | null> = ref(null);
const form = ref({
  title: null,
  name: null,
  parent_id: null,
});
const validation_errros = ref([]);
const role_groups = ref([]);
const permissions = ref([]);
const route = useRoute();
const handleCreateRole = () => {
  formRef.value?.validate(async (valid: any): Promise<void> => {
    if (valid) {
      loader.value = true;
      try {
        const formData = {
          title: form.value.title,
          name: form.value.name,
          permissions: selectedPermissions.value,
        };
        const data = await useApiService.post(
          `application/portal/projects/${route.params.id}/roles`,
          formData
        );
        if (data.success) {
          BaseMessage({
            message: "ایجاد سطح دسترسی با موفقیت انجام شد!",
            type: "success",
            duration: 4000,
            center: true,
            offset: 20,
          });
          form.value.title = null;
          form.value.name = null;
          form.value.parent_id = null;
          formRef.value.resetFields();
          navigateTo({ name: "portal-projects-roles-index" });
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

const fetchPermissions = async () => {
  try {
    const data = await useApiService.get(
      `application/portal/projects/${route.params.id}/permissions`
    );
    permissions.value = data.data;
    loading.value = false;
  } catch (error) {}
};

onMounted(async () => {
  await fetchPermissions();
});
</script>

<style scoped></style>
