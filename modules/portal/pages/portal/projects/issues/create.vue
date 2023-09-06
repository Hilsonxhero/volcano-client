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
        <base-form
          @submit.prevent="handleCreateRole"
          :model="form"
          ref="formRef"
          class="h-full"
        >
          <div>
            <h2 class="text-2xl my-4 text-gray-600">ایجاد مسئله</h2>
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
              :rules="[
                {
                  required: true,
                  message: '   توضیحات الزامی می باشد',
                },
              ]"
              label="توضیحات"
              class="col-span-12"
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
              prop="tracker"
              :rules="[
                {
                  required: true,
                  message: ' نوع مسئله  الزامی می باشد',
                },
              ]"
              label="  نوع مسئله"
              class="col-span-12 lg:col-span-4"
            >
              <base-select
                v-model="form.tracker"
                filterable
                placeholder="گروه سطح دسترسی"
                value-key="id"
                label="title"
                :options="project_trackers"
              >
              </base-select>
              <BaseValidationError
                :errors="validation_errros"
                field="tracker"
              />
            </base-form-item>

            <base-form-item
              :model="form"
              prop="issue_status"
              :rules="[
                {
                  required: true,
                  message: ' وضعیت مسئله  الزامی می باشد',
                },
              ]"
              label="  وضعیت مسئله"
              class="col-span-12 lg:col-span-4"
            >
              <base-select
                v-model="form.issue_status"
                filterable
                placeholder="وضعیت"
                value-key="id"
                label="title"
                :options="issue_statuses"
              >
              </base-select>
              <BaseValidationError
                :errors="validation_errros"
                field="issue_status"
              />
            </base-form-item>

            <base-form-item
              :model="form"
              prop="priority"
              :rules="[
                {
                  required: true,
                  message: ' اولویت مسئله  الزامی می باشد',
                },
              ]"
              label="  اولویت مسئله"
              class="col-span-12 lg:col-span-4"
            >
              <base-select
                v-model="form.priority"
                filterable
                placeholder="اولویت"
                value-key="id"
                label="title"
                :options="priorities"
              >
              </base-select>
              <BaseValidationError
                :errors="validation_errros"
                field="priority"
              />
            </base-form-item>

            <base-form-item
              :model="form"
              prop="start_date"
              :rules="[
                {
                  required: true,
                  message: ' تاریخ شروع مسئله  الزامی می باشد',
                },
              ]"
              label="  تاریخ شروع مسئله"
              class="col-span-12 lg:col-span-4"
            >
              <client-only placeholder="loading...">
                <date-picker
                  v-model="form.start_date"
                  type="datetime"
                ></date-picker>
              </client-only>

              <BaseValidationError
                :errors="validation_errros"
                field="start_date"
              />
            </base-form-item>

            <base-form-item
              :model="form"
              prop="end_date"
              :rules="[
                {
                  required: true,
                  message: ' تاریخ سررسید مسئله  الزامی می باشد',
                },
              ]"
              label="  تاریخ سررسید مسئله"
              class="col-span-12 lg:col-span-4"
            >
              <client-only placeholder="loading...">
                <date-picker
                  v-model="form.end_date"
                  type="datetime"
                ></date-picker>
              </client-only>

              <BaseValidationError
                :errors="validation_errros"
                field="end_date"
              />
            </base-form-item>

            <base-form-item
              :model="form"
              prop="estimated_hours"
              :rules="[
                {
                  required: true,
                  message: ' زمان برآورد شده   الزامی می باشد',
                },
              ]"
              label="  زمان برآورد شده "
              class="col-span-12 lg:col-span-4"
            >
              <base-input
                v-model="form.estimated_hours"
                placeholder="  زمان برآورد شده  "
              ></base-input>
              <BaseValidationError
                :errors="validation_errros"
                field="estimated_hours"
              />
            </base-form-item>

            <base-form-item
              :model="form"
              prop="assigned_to"
              :rules="[
                {
                  required: true,
                  message: ' مسئول مسئله  الزامی می باشد',
                },
              ]"
              label="  مسئول مسئله"
              class="col-span-12 lg:col-span-4"
            >
              <base-select
                v-model="form.assigned_to"
                filterable
                placeholder="مسئول"
                value-key="id"
                label="title"
                :options="priorities"
              >
              </base-select>
              <BaseValidationError
                :errors="validation_errros"
                field="assigned_to"
              />
            </base-form-item>

            <base-form-item
              :model="form"
              prop="done_ratio"
              :rules="[
                {
                  required: true,
                  message: ' انجام شده   الزامی می باشد',
                },
              ]"
              label="  انجام شده "
              class="col-span-12 lg:col-span-4"
            >
              <base-select
                v-model="form.done_ratio"
                filterable
                placeholder="انجام شده"
                value-key="id"
                label="title"
                :options="priorities"
              >
              </base-select>
              <BaseValidationError
                :errors="validation_errros"
                field="done_ratio"
              />
            </base-form-item>

            <base-form-item
              :model="form"
              prop="done_ratio"
              :rules="[
                {
                  required: true,
                  message: '  مسئله پدر الزامی می باشد',
                },
              ]"
              label=" مسئله پدر "
              class="col-span-12 lg:col-span-4"
            >
              <base-select
                v-model="form.done_ratio"
                filterable
                placeholder=" مسئله پدر"
                value-key="id"
                label="title"
                :options="priorities"
              >
              </base-select>
              <BaseValidationError
                :errors="validation_errros"
                field="done_ratio"
              />
            </base-form-item>
          </div>

          <div class="bg-white shadow-xl rounded-xl p-4 mt-10 mb-6">
            <base-form-item
              :model="form"
              prop="attachments"
              label="پیوست ها"
              class="col-span-12"
            >
              <base-upload multiple :max="5" v-model="form.image"></base-upload>
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
import { FormItemContext } from "~/core/tokens";
import BaseMessage from "@/components/base/message";
import { BaseSkeleton, BaseSkeletonItem } from "@/components/base/skeleton";
import { BaseCheckbox, BaseCheckboxGroup } from "@/components/base/checkbox";
// import DatePicker from "vue3-persian-datetime-picker";
import DatePicker from "@/components/common/DatePicker.clinet.vue";

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
const project_trackers = ref([
  {
    id: 1,
    title: "قابلیت",
  },
  {
    id: 2,
    title: "مدیریت",
  },
]);
const issue_statuses = ref([
  {
    id: 1,
    title: "قابلیت",
  },
  {
    id: 2,
    title: "مدیریت",
  },
]);

const priorities = ref([
  {
    id: 1,
    title: "کم",
  },
  {
    id: 2,
    title: "معمولی",
  },
  {
    id: 3,
    title: "زیاد",
  },
  {
    id: 4,
    title: "فوری",
  },
  {
    id: 5,
    title: "بی درنگ",
  },
]);

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
