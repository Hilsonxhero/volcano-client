<template>
  <div>
    <base-dialog
      @close="handleClose"
      v-model="visible_time_dialog"
      title="ثبت زمان"
    >
      <div>
        <base-form :model="issue_time" ref="formRef" class="h-full space-y-4">
          <base-form-item
            :model="issue_time"
            prop="spent_on"
            label="در تاریخ"
            class="col-span-12 lg:col-span-4"
          >
            <client-only placeholder="loading...">
              <date-picker
                v-model="issue_time.spent_on"
                type="datetime"
                format="jYYYY/jMM/jDD"
              ></date-picker>
            </client-only>

            <BaseValidationError :errors="validation_errros" field="spent_on" />
          </base-form-item>
          <base-form-item
            :model="issue_time"
            prop="hours"
            label="ساعت"
            class="col-span-12 lg:col-span-4"
            :rules="[
              {
                required: true,
                message: '    ساعت  الزامی می باشد',
              },
            ]"
          >
            <client-only placeholder="loading...">
              <date-picker v-model="issue_time.hours" type="time"></date-picker>
            </client-only>

            <BaseValidationError :errors="validation_errros" field="hours" />
          </base-form-item>
          <base-form-item
            :model="issue_time"
            prop="description"
            label="توضیحات"
            class="col-span-12 mt-4"
          >
            <base-input
              class="h-[80px] resize-none"
              input-class="resize-none"
              type="textarea"
              v-model="issue_time.description"
              placeholder=" توضیحات "
            ></base-input>
            <BaseValidationError
              :errors="validation_errros"
              field="description"
            />
          </base-form-item>
          <base-form-item
            :model="issue_time"
            prop="project_time_category_id"
            :rules="[
              {
                required: true,
                message: '  دسته بندی زمان  الزامی می باشد',
              },
            ]"
            label="دسته بندی زمان"
            class="col-span-12"
          >
            <base-select
              v-model="issue_time.project_time_category_id"
              filterable
              placeholder="دسته بندی زمان"
              value-key="id"
              label="title"
              :options="project_time_categories"
            >
            </base-select>
            <BaseValidationError
              :errors="validation_errros"
              field="project_time_category_id"
            />
          </base-form-item>
        </base-form>
      </div>
      <template #footer>
        <div class="flex flex-col justify-between lg:items-center mt-8">
          <div class="w-full flex items-center">
            <base-button
              @click="handleSubmitTime"
              class=""
              :loading="loader"
              type="primary"
              block
            >
              ایجاد
            </base-button>
            <base-button :to="{ name: 'management-roles-index' }" class="mr-2">
              لغو
            </base-button>
          </div>
        </div>
      </template>
    </base-dialog>
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
import DatePicker from "@/components/common/DatePicker.clinet.vue";
import { UPDATE_MODEL_EVENT } from "@/core/constants";
import BaseMessage from "@/components/base/message";
import { emit } from "process";
const loader = ref(false);
const props = defineProps({
  issue: {},
  modelValue: {},
});
const emits = defineEmits([UPDATE_MODEL_EVENT, "create"]);
const route = useRoute();
const project_time_categories = ref([]);
const visible_time_dialog = ref(false);
const issue_time = ref({
  project_time_category_id: null,
  description: null,
  spent_on: null,
  hours: null,
});
const formRef = ref(null);
const validation_errros = ref([]);
const handleSubmitTime = () => {
  formRef.value?.validate(async (valid: any): Promise<void> => {
    if (valid) {
      try {
        loader.value = true;
        const formData = {
          project_time_category_id: issue_time.value.project_time_category_id,
          description: issue_time.value.description,
          spent_on: issue_time.value.spent_on,
          project_issue_id: props.issue,
          hours: issue_time.value.hours,
        };
        const data = await useApiService.post(
          `application/portal/projects/${route.params.id}/issue/${route.params.issue}/times`,
          formData
        );
        if (data.success) {
          BaseMessage({
            message: "ایجاد  زمان با موفقیت انجام شد!",
            type: "success",
            duration: 4000,
            center: true,
            offset: 20,
          });
          visible_time_dialog.value = false;
          issue_time.value.description = null;
          issue_time.value.hours = null;
          issue_time.value.spent_on = null;
          issue_time.value.project_time_category_id = null;
          formRef.value.resetFields();
          emits("create", data);
        } else {
        }

        loader.value = false;
      } catch ({ response }) {
        console.log("response", response);

        loader.value = false;
        validation_errros.value = response._data.data;
      }
    }
  });
};
const handleClose = () => {
  emits(UPDATE_MODEL_EVENT, false);
};

watch(
  () => props.modelValue,
  (val) => {
    visible_time_dialog.value = val;
  }
);

const fetchData = async () => {
  try {
    const { data } = await useApiService.get(
      `application/portal/projects/${route.params.id}/enumerations/time/categories`
    );
    project_time_categories.value = data.categories;
  } catch (error) {}
};

onMounted(() => {
  fetchData();
  const today = new Date();
  const persianOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    calendar: "persian",
  };
  const persianDate = new Intl.DateTimeFormat(
    "fa-IR-u-ca-persian",
    persianOptions
  ).format(today);
  const englishDigits = persianDate.replace(/[۰-۹]/g, (digit) =>
    String.fromCharCode(digit.charCodeAt(0) - 1728)
  );

  issue_time.value.spent_on = englishDigits;
});
</script>

<style scoped></style>
