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
            <base-skeleton-item
              variant="card"
              class="h-[200px]"
            ></base-skeleton-item>
          </div>
        </div>
      </template>
      <template #default>
        <base-form
          @submit.prevent="handleUpdate"
          :model="form"
          ref="formRef"
          class="h-full"
        >
          <div class="flex justify-between items-center">
            <h2 class="text-2xl my-4 text-gray-600">ویرایش مسئله</h2>
            <div>
              <base-button
                @click="handleShowTimeDialog"
                size="small"
                type="primary"
                class="w-full lg:w-auto"
              >
                <div class="flex items-center">
                  <span class="ml-2"> ثبت زمان</span>
                  <nuxt-icon name="timer"></nuxt-icon>
                </div>
              </base-button>
            </div>
          </div>
          <div
            class="bg-white card-module rounded-xl p-4 grid grid-cols-12 gap-2"
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
              prop="project_tracker_id"
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
                v-model="form.project_tracker_id"
                filterable
                placeholder="نوع مسئله "
                value-key="id"
                label="title"
                :options="project_trackers"
              >
              </base-select>
              <BaseValidationError
                :errors="validation_errros"
                field="project_tracker_id"
              />
            </base-form-item>

            <base-form-item
              :model="form"
              prop="project_issue_status_id"
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
                v-model="form.project_issue_status_id"
                filterable
                placeholder="وضعیت"
                value-key="id"
                label="title"
                :options="issue_statuses"
              >
              </base-select>
              <BaseValidationError
                :errors="validation_errros"
                field="project_issue_status_id"
              />
            </base-form-item>

            <base-form-item
              :model="form"
              prop="project_priority_id"
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
                v-model="form.project_priority_id"
                filterable
                placeholder="اولویت"
                value-key="id"
                label="title"
                :options="priorities"
              >
              </base-select>
              <BaseValidationError
                :errors="validation_errros"
                field="project_priority_id"
              />
            </base-form-item>

            <base-form-item
              :model="form"
              prop="start_date"
              label="  تاریخ شروع مسئله"
              class="col-span-12 lg:col-span-4"
            >
              <client-only placeholder="loading...">
                <date-picker
                  v-model="form.start_date"
                  type="datetime"
                  :disable="checkStartDate"
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
              label="  تاریخ سررسید مسئله"
              class="col-span-12 lg:col-span-4"
            >
              <client-only placeholder="loading...">
                <date-picker
                  v-model="form.end_date"
                  type="datetime"
                  :disable="checkEndDate"
                  :disabled="!form.start_date"
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
                label="username"
                :options="users"
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
                value-key="value"
                label="title"
                :options="ratio_options"
              >
              </base-select>
              <BaseValidationError
                :errors="validation_errros"
                field="done_ratio"
              />
            </base-form-item>

            <base-form-item
              :model="form"
              prop="parent_id"
              label=" مسئله پدر "
              class="col-span-12 lg:col-span-4"
            >
              <base-select
                v-model="form.parent_id"
                filterable
                placeholder=" مسئله پدر"
                value-key="id"
                label="title"
                remote
                :remote-method="handleSearchProjectissue"
                :options="project_issues"
              >
              </base-select>
              <BaseValidationError
                :errors="validation_errros"
                field="parent_id"
              />
            </base-form-item>
          </div>
          <div
            class="bg-white card-module rounded-xl p-4 mt-10 my-6 grid grid-cols-12 gap-2"
          >
            <base-form-item
              :model="form"
              prop="image"
              label=" یادداشت"
              class="col-span-12 mt-6"
            >
              <div>
                <TiptapEditor
                  v-model="form.note"
                  :content="form.note"
                  placeholder="یادداشت "
                />
              </div>
            </base-form-item>
            <base-form-item
              :model="form"
              prop="attachments"
              label="پیوست ها"
              class="col-span-12 mt-6"
            >
              <base-upload
                multiple
                :max="5"
                v-model="form.image"
                :sources="form.attachments"
                @delete="handleOnDeleteAttachment"
              ></base-upload>
            </base-form-item>
          </div>
          <div>
            <h2 class="text-2xl text-gray-600 mt-8">مسئله های فرزند</h2>
          </div>
          <IssueChildren />
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
          </div>
        </base-form>
      </template>
    </base-skeleton>

    <CreateIssueTimeDialog
      v-model="visible_time_dialog"
      :issue="project_issue_id"
    />
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
import DatePicker from "@/components/common/DatePicker.clinet.vue";
import TiptapEditor from "@/components/common/tiptap/tiptap-editor.vue";
import IssueChildren from "@/modules/portal/components/portal/projects/issues/Children.vue";
import CreateIssueTimeDialog from "@/modules/portal/components/portal/projects/issues/time/CreateIssueTimeDialog.vue";

definePageMeta({
  layout: "project",
  middleware: ["auth"],
});
const project_issue_id = ref(null);
const loading = ref(true);
const loader = ref(false);
const formRef: Ref<FormItemContext | null> = ref(null);
const visible_time_dialog = ref(false);
const form = ref({
  title: null,
  description: null,
  parent_id: "",
  project_issue_status_id: null,
  project_tracker_id: null,
  assigned_to: null,
  project_priority_id: null,
  note: null,
  start_date: null,
  end_date: null,
  estimated_hours: null,
  done_ratio: null,
  attachments: [],
});
const project_trackers = ref([]);
const issue_statuses = ref([]);
const priorities = ref([]);
const validation_errros = ref([]);
const project_issues = ref([]);
const ratio_options = ref([
  { title: "10", value: "10" },
  { title: "20", value: "20" },
  { title: "30", value: "30" },
  { title: "40", value: "40" },
  { title: "50", value: "50" },
  { title: "60", value: "60" },
  { title: "70", value: "70" },
  { title: "80", value: "80" },
  { title: "90", value: "90" },
  { title: "100", value: "100" },
]);
const users = ref([]);
const route = useRoute();
const project_issue = ref({});

const handleShowTimeDialog = () => {
  visible_time_dialog.value = true;
};
const checkEndDate = (formatted: any, dateMoment: any, checkingFor: any) => {
  return formatted <= form.value.start_date;
};
const checkStartDate = (formatted: any, dateMoment: any, checkingFor: any) => {
  return formatted >= form.value.end_date;
};
const handleOnDeleteAttachment = async (id: any) => {
  try {
    const data = await useApiService.post(
      `application/portal/projects/${route.params.id}/issues/attachments/${id}/delete`
    );
  } catch (error) {}
};
const handleSearchProjectissue = async (query: any) => {
  if (query !== "") {
    let params = {
      q: query,
    };
    try {
      const data = await useApiService.get(
        `application/portal/projects/${route.params.id}/issues/select/values`,
        {
          params: params,
        }
      );
      loading.value = false;
      project_issues.value = data.data;
    } catch (error) {}
  } else {
    project_issues.value = [];
  }
};
const handleUpdate = () => {
  formRef.value?.validate(async (valid: any): Promise<void> => {
    if (valid) {
      loader.value = true;
      try {
        const form_data = new FormData();
        form_data.append("title", form.value.title);
        form_data.append("description", form.value.description);
        form_data.append("note", form.value.note);
        form_data.append("project_id", route.params.id);
        form_data.append("parent_id", form.value.parent_id ?? "");
        form_data.append("project_tracker_id", form.value.project_tracker_id);
        form_data.append(
          "project_issue_status_id",
          form.value.project_issue_status_id
        );
        form_data.append("assigned_to_id", form.value.assigned_to);
        form_data.append("project_priority_id", form.value.project_priority_id);
        form_data.append("start_date", form.value.start_date);
        form_data.append("end_date", form.value.end_date);
        form_data.append("done_ratio", form.value.done_ratio);
        if (form.value.image && form.value.image.length >= 1) {
          let uploaded_media = form.value.image.filter((item, j) =>
            item.hasOwnProperty("media")
          );
          if (uploaded_media.length >= 1) {
            for (var i = 0; i < uploaded_media.length; i++) {
              form_data.append(`attachments[${i}]`, uploaded_media[i].media);
            }
          }
        }
        const data = await useApiService.patch(
          `application/portal/projects/${route.params.id}/issues/${route.params.issue}`,
          form_data
        );
        if (data.success) {
          BaseMessage({
            message: "ویرایش  مسئله با موفقیت انجام شد!",
            type: "success",
            duration: 4000,
            center: true,
            offset: 20,
          });
          form.value.title = null;
          form.value.description = null;
          form.value.parent_id = null;
          formRef.value.resetFields();
          navigateTo({ name: "portal-projects-issues-index" });
        } else {
        }

        loader.value = false;
      } catch ({ response }) {
        loader.value = false;
        // validation_errros.value = response._data.data;
      }
    } else {
    }
  });
};
const fetchData = async () => {
  try {
    const [
      trackers_data,
      statuses_data,
      users_data,
      issues_data,
      priorites_data,
      project_issue_data,
    ] = await Promise.all([
      useApiService.get(
        `application/portal/projects/${route.params.id}/enumerations/trackers/select/values`
      ),
      useApiService.get(
        `application/portal/projects/${route.params.id}/enumerations/issue/select/statuses`
      ),
      useApiService.get(
        `application/portal/projects/${route.params.id}/users/select/values`
      ),
      useApiService.get(
        `application/portal/projects/${route.params.id}/issues/select/values`
      ),
      useApiService.get(`application/portal/priorities/select`),

      useApiService.get(
        `application/portal/projects/${route.params.id}/issues/${route.params.issue}`
      ),
    ]);
    project_trackers.value = trackers_data.data;
    issue_statuses.value = statuses_data.data;
    priorities.value = priorites_data.data;
    users.value = users_data.data;
    project_issues.value = issues_data.data;
    project_issue.value = project_issue_data.data;
    form.value.title = project_issue.value.title;
    form.value.description = project_issue.value.description;
    form.value.project_issue_status_id = project_issue.value.issue_status.id;
    form.value.project_tracker_id = project_issue.value.tracker.id;
    form.value.project_priority_id = project_issue.value.project_priority;
    form.value.start_date = project_issue.value.start_date;
    form.value.parent_id = project_issue.value.parent_id;
    form.value.end_date = project_issue.value.end_date;
    form.value.estimated_hours = project_issue.value.estimated_hours;
    form.value.done_ratio = project_issue.value.done_ratio;
    form.value.assigned_to = project_issue.value.assigned?.id;
    form.value.note = project_issue.value.note;
    form.value.attachments = project_issue.value.attachments;
    loading.value = false;
  } catch (error) {}
};

onMounted(async () => {
  project_issue_id.value = route.params.issue;
  await fetchData();

  // const today = new Date();
  // const persianOptions = {
  //   year: "numeric",
  //   month: "2-digit",
  //   day: "2-digit",
  //   calendar: "persian",
  // };
  // const persianDate = new Intl.DateTimeFormat(
  //   "fa-IR-u-ca-persian",
  //   persianOptions
  // ).format(today);
  // const englishDigits = persianDate.replace(/[۰-۹]/g, (digit) =>
  //   String.fromCharCode(digit.charCodeAt(0) - 1728)
  // );
  // console.log(englishDigits);
});
</script>

<style scoped></style>
