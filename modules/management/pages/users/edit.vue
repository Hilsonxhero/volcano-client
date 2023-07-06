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
          <h2 class="text-2xl my-4 text-gray-600">ویرایش کاربر</h2>
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
              prop="username"
              :rules="[
                {
                  required: true,
                  message: '  نام کاربری  الزامی می باشد',
                },
              ]"
              label="نام کاربری"
              class="col-span-12 lg:col-span-4"
            >
              <base-input
                v-model="form.username"
                placeholder="نام کاربری "
              ></base-input>
            </base-form-item>

            <base-form-item
              :model="form"
              prop="email"
              :rules="[
                {
                  required: true,
                  message: '   ایمیل الزامی می باشد',
                },
              ]"
              label="ایمیل"
              class="col-span-12 lg:col-span-4"
            >
              <base-input
                v-model="form.email"
                placeholder="ایمیل "
              ></base-input>
              <BaseValidationError :errors="validation_errros" field="email" />
            </base-form-item>

            <base-form-item
              :model="form"
              prop="phone"
              :rules="[
                {
                  required: true,
                  message: '   شماره همراه الزامی می باشد',
                },
              ]"
              label="شماره همراه"
              class="col-span-12 lg:col-span-4"
            >
              <base-input
                v-model="form.phone"
                placeholder="شماره همراه "
              ></base-input>
              <BaseValidationError :errors="validation_errros" field="phone" />
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
              prop="role_group"
              :rules="[
                {
                  required: true,
                  message: 'گروه سطح دسترسی الزامی می باشد',
                },
              ]"
              label="گروه سطح دسترسی"
            >
              <base-select
                v-model="form.role_group"
                filterable
                placeholder="گروه سطح دسترسی"
                value-key="id"
                label="title"
                :options="role_groups"
                @change="handleChangeRoleGroup"
              >
              </base-select>
            </base-form-item>

            <base-form-item
              class="col-span-12 lg:col-span-4"
              prop="role"
              :rules="[
                {
                  required: true,
                  message: 'گروه سطح دسترسی الزامی می باشد',
                },
              ]"
              label="سطح دسترسی"
            >
              <base-select
                v-model="form.role"
                filterable
                placeholder=" سطح دسترسی"
                value-key="id"
                label="title"
                :options="roles"
              >
              </base-select>
            </base-form-item>

            <base-form-item
              :model="form"
              prop="image"
              label="پروفایل کاربری"
              class="col-span-12 mt-8"
            >
              <div v-if="form.avatar">
                <base-upload
                  :max="1"
                  v-model="form.image"
                  :sources="form.avatar?.thumb"
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
                  :to="{ name: 'management-users-index' }"
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

definePageMeta({
  layout: "management",
  middleware: ["auth"],
});
const loading = ref(true);
const loader = ref(false);
const formRef: Ref<FormItemContext | null> = ref(null);
const form = ref({
  username: null,
  email: null,
  phone: null,
  image: null,
  avatar: null,
  role: null,
  role_group: null,
  sattus: null,
});
const validation_errros = ref([]);
const role_groups = ref([]);
const roles = ref([]);
const statuses = ref([
  { title: "فعال", key: "active" },
  { title: "غیر فعال", key: "inactive" },
  { title: "مسدود", key: "ban" },
]);
const user_id = ref(null);
const users = ref([]);
const route = useRoute();
const handleUpdateProject = () => {
  formRef.value?.validate(async (valid: any): Promise<void> => {
    if (valid) {
      loader.value = true;
      try {
        const formData = {
          id: user_id.value,
          username: form.value.username,
          email: form.value.email,
          status: form.value.status,
          phone: form.value.phone,
          avatar: form.value.image?.base64,
          role: form.value.role,
        };
        const data = await useApiService.put(
          `management/users/${user_id.value}`,
          formData
        );

        if (data.success) {
          BaseMessage({
            message: "ویرایش کاربر با موفقیت انجام شد!",
            type: "success",
            duration: 4000,
            center: true,
            offset: 20,
          });
          form.value.username = null;
          form.value.phone = null;
          form.value.email = null;
          form.value.image = null;
          formRef.value.resetFields();
          navigateTo({ name: "management-users-index" });
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

const handleChangeRoleGroup = (val) => {
  const role_group = role_groups.value.find((role, i) => role.id == val);

  roles.value = role_group.children;
};

const fetchuser = async () => {
  try {
    const data = await useApiService.get(`management/users/${user_id.value}`);
    form.value.username = data.data.username;
    form.value.email = data.data.email;
    form.value.phone = data.data.phone;
    form.value.status = data.data.status;
    form.value.avatar = data.data.avatar;
    form.value.role_group = data.data.role.parent_id;
    form.value.role = data.data.role.id;
    handleChangeRoleGroup(form.value.role_group);

    loading.value = false;
  } catch (error) {}
};

const fetchRoles = async () => {
  try {
    const data = await useApiService.get("application/portal/roles");
    role_groups.value = data.data;
  } catch (error) {}
};

onMounted(async () => {
  user_id.value = route.params.id;
  await fetchRoles();
  await fetchuser();
});
</script>

<style scoped></style>
