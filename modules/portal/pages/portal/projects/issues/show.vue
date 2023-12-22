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
        <div class="flex justify-between items-center">
          <h2 class="text-2xl my-4 text-gray-600"></h2>
          <div class="flex items-center">
            <base-button
              :to="{
                name: 'portal-projects-issues-edit',
                params: { id: route.params.id, issue: form.id },
              }"
              size="small"
              type="primary"
              class="w-full lg:w-auto"
            >
              <div class="flex items-center">
                <span class="ml-2"> ویرایش</span>
                <nuxt-icon name="magicpen"></nuxt-icon>
              </div>
            </base-button>
            <base-button
              @click="handleShowTimeDialog"
              size="small"
              type="primary"
              class="w-full lg:w-auto mr-2"
            >
              <div class="flex items-center">
                <span class="ml-2"> ثبت زمان</span>
                <nuxt-icon name="timer"></nuxt-icon>
              </div>
            </base-button>
          </div>
        </div>
        <div class="bg-white card-module rounded-xl p-4 mt-5">
          <div class="w-full">
            <div class="flex items-center mb-4 w-full">
              <div class="bg-gray-200 rounded-[14px] px-3 py-2">
                {{ form?.tracker?.title }}
              </div>

              <div class="bg-gray-200 rounded-[14px] px-2 py-2 mr-2">
                {{ form?.issue_status?.title }}
              </div>
            </div>
            <div
              class="bg-gray-100 rounded-[14px] p-3 font-extrabold border-r-2 border-teal-400 mb-3"
            >
              {{ form?.title }}
            </div>

            <div class="grid grid-cols-12 gap-2 mb-4">
              <div
                class="col-span-12 lg:col-span-6 bg-gray-200 rounded-[14px] px-3 py-2"
              >
                <div class="flex items-center">
                  <nuxt-icon name="calendar"></nuxt-icon>
                  <span class="mr-2"> زمان آغاز : {{ form?.start_date }}</span>
                </div>
              </div>
              <div
                class="col-span-12 lg:col-span-6 bg-gray-200 rounded-[14px] px-3 py-2"
              >
                <div class="flex items-center">
                  <nuxt-icon name="project-time"></nuxt-icon>
                  <span class="mr-2">
                    زمان صرف شده : {{ form?.total_hours }}</span
                  >
                </div>
              </div>
              <div
                class="col-span-12 lg:col-span-6 bg-gray-200 rounded-[14px] px-3 py-2"
              >
                <div class="flex items-center">
                  <nuxt-icon name="user-bulk"></nuxt-icon>
                  <span class="mr-2">
                    مسئول : {{ form?.assigned?.username }}</span
                  >
                </div>
              </div>
              <div
                class="col-span-12 lg:col-span-6 bg-gray-200 rounded-[14px] px-3 py-2"
              >
                <div>
                  <div class="flex items-center">
                    <div>{{ form?.done_ratio }}%</div>
                    <div class="bg-gray-100 rounded-[10px] p-1 m-1 w-full mr-2">
                      <div
                        class="bg-green-400 rounded-[10px] p-1 w-7"
                        :style="{ width: form?.done_ratio + '%' }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white card-module rounded-xl p-4 mt-5"></div>

        <div class="mt-10">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg text-gray-600">مسئله های فرزند</h2>
            <base-button
              size="small"
              type="primary"
              class="w-full lg:w-auto"
              :to="{
                name: 'portal-projects-issues-create',
                params: { id: route.params.id },
              }"
            >
              <div class="flex items-center">
                <span class="ml-2"> ایجاد مسئله</span>
                <nuxt-icon name="add"></nuxt-icon>
              </div>
            </base-button>
          </div>
          <IssueChildren />
        </div>
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
            message: "مشاهده  مسئله با موفقیت انجام شد!",
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
    // project_trackers.value = trackers_data.data;
    // issue_statuses.value = statuses_data.data;
    // priorities.value = priorites_data.data;
    // users.value = users_data.data;
    // project_issues.value = issues_data.data;
    // project_issue.value = project_issue_data.data;
    // form.value.title = project_issue.value.title;
    // form.value.description = project_issue.value.description;
    // form.value.project_issue_status_id = project_issue.value.issue_status.id;
    // form.value.project_tracker_id = project_issue.value.tracker.id;
    // form.value.project_priority_id = project_issue.value.project_priority;
    // form.value.start_date = project_issue.value.start_date;
    // form.value.parent_id = project_issue.value.parent_id;
    // form.value.end_date = project_issue.value.end_date;
    // form.value.estimated_hours = project_issue.value.estimated_hours;
    // form.value.done_ratio = project_issue.value.done_ratio;
    // form.value.assigned_to = project_issue.value.assigned?.id;
    // form.value.note = project_issue.value.note;
    // form.value.attachments = project_issue.value.attachments;

    form.value = project_issue_data.data;
    loading.value = false;
  } catch (error) {}
};

onMounted(async () => {
  project_issue_id.value = route.params.issue;
  await fetchData();
});
</script>

<style scoped></style>
