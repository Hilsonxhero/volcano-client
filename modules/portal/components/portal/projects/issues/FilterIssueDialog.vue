<template>
  <div>
    <base-dialog
      @close="handleClose()"
      title="فیلتر و جستجو کارها"
      custom-class="lg:w-[50%]"
      v-model="visible"
    >
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 lg:col-span-12 flex flex-col lg:px-6">
          <div class="w-full">
            <base-form
              :model="form"
              ref="formRef"
              class="h-full space-y-6 grid grid-cols-12 gap-2"
            >
              <base-form-item
                :model="form"
                prop="title"
                label="عنوان یا توضیحات "
                class="col-span-12"
              >
                <base-input
                  type="title"
                  v-model="form.title"
                  placeholder="عنوان یا توضیحات "
                ></base-input>
              </base-form-item>

              <base-form-item
                :model="form"
                prop="project_tracker_id"
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
              </base-form-item>

              <base-form-item
                :model="form"
                prop="project_issue_status_id"
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
              </base-form-item>

              <base-form-item
                :model="form"
                prop="project_priority_id"
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
              </base-form-item>

              <base-form-item
                :model="form"
                prop="assigned_to"
                label="  مسئول مسئله"
                class="col-span-12"
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
              </base-form-item>

              <base-form-item
                :model="form"
                prop="start_date"
                label="  تاریخ شروع مسئله"
                class="col-span-12 lg:col-span-6"
              >
                <client-only placeholder="loading...">
                  <date-picker
                    v-model="form.start_date"
                    type="date"
                  ></date-picker>
                </client-only>
              </base-form-item>

              <base-form-item
                :model="form"
                prop="end_date"
                label="  تاریخ سررسید مسئله"
                class="col-span-12 lg:col-span-6"
              >
                <client-only placeholder="loading...">
                  <date-picker
                    v-model="form.end_date"
                    type="date"
                  ></date-picker>
                </client-only>
              </base-form-item>

              <div
                class="flex flex-col justify-between lg:items-center col-span-12 lgcol-span-3"
              >
                <div class="w-full">
                  <base-button
                    class="w-full"
                    @click="handleFilterAction"
                    :loading="loader"
                    type="warning"
                    block
                  >
                    جستجو
                  </base-button>
                </div>
              </div>
            </base-form>
          </div>
        </div>
      </div>
    </base-dialog>
  </div>
</template>

<script setup lang="ts">
import { UPDATE_MODEL_EVENT } from "~/core/constants";
import { BaseFormItem, BaseForm, BaseFormGroup } from "@/components/base/form";
import { FormItemContext } from "~/core/tokens";
import BaseMessage from "@/components/base/message";
import { useBoardStore } from "@/modules/portal/store/board";
import { storeToRefs } from "pinia";
import DatePicker from "@/components/common/DatePicker.clinet.vue";

const store = useBoardStore();
const { board } = storeToRefs(store);
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits([UPDATE_MODEL_EVENT, "store"]);
const visible: Ref<boolean> = ref(false);
const loader = ref(false);
const formRef: Ref<FormItemContext | null> = ref(null);
const route = useRoute();
const form = ref({
  title: null,
  project_tracker_id: null,
  start_date: null,
  end_date: null,
  assigned_to: null,
  project_issue_status_id: null,
  project_priority_id: null,
});
const project_trackers = ref([]);
const issue_statuses = ref([]);
const priorities = ref([]);
const users = ref([]);
watch(
  () => props.modelValue,
  (val: boolean) => {
    visible.value = val;
  }
);
watch(
  () => visible.value,
  (val: boolean) => {
    // formRef.value?.resetFields();
  }
);

const handleFilterAction = () => {
  formRef.value?.validate(async (valid: any): Promise<void> => {
    if (valid) {
      loader.value = true;
      try {
        emits("store", form.value);
        handleClose();
        loader.value = false;
      } catch (error) {
        loader.value = false;
      }
    } else {
    }
  });
};
const handleClose = () => {
  emits(UPDATE_MODEL_EVENT, false);
};
const handleDeleteMember = async (row, index) => {
  try {
    const formData = {
      email: form.value.email,
    };
    const data = await useApiService.remove(
      `application/portal/projects/board/${route.params.board}/members/${row.id}`,
      formData
    );

    if (data.success) {
      BaseMessage({
        message: " حذف کاربر با موفقیت انجام شد!",
        type: "success",
        duration: 4000,
        center: true,
        offset: 20,
      });
      store.updateBoardMembers(data.data);
      // handleClose();
    }

    loader.value = false;
  } catch (error) {
    loader.value = false;
  }
};

const fetchData = async () => {
  try {
    const [trackers_data, statuses_data, users_data, priorites_data] =
      await Promise.all([
        useApiService.get(
          `application/portal/projects/${route.params.id}/enumerations/trackers/select/values`
        ),
        useApiService.get(
          `application/portal/projects/${route.params.id}/enumerations/issue/select/statuses`
        ),
        useApiService.get(
          `application/portal/projects/${route.params.id}/users/select/values`
        ),

        useApiService.get(`application/portal/priorities/select`),
      ]);
    project_trackers.value = trackers_data.data;
    issue_statuses.value = statuses_data.data;
    priorities.value = priorites_data.data;
    users.value = users_data.data;
    loading.value = false;
  } catch (error) {}
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped></style>
