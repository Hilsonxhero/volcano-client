<template>
  <div>
    <base-dialog @close="handleCloseCreateProject()" title="افزودن عضو جدید" custom-class="lg:w-[30%]"
      v-model="visible">
      <div>
        <base-form :model="form" ref="formRef" class="space-y-6">
          <div class="grid grid-cols-12 gap-2">
            <div class="col-span-12 lg:col-span-12">
              <base-form-item prop="username" :rules="[
                {
                  required: true,
                  message: ' ایمیل کاربر الزامی می باشد',
                },
              ]" label=" ایمیل">
                <base-input v-model="form.username" placeholder=" ایمیل"></base-input>
              </base-form-item>
            </div>

            <div class="col-span-12 lg:col-span-12">
              <base-form-item prop="role" :rules="[
                {
                  required: true,
                  message: ' سطح دسترسی الزامی می باشد',
                },
              ]" label="سطح دسترسی">
                <base-select v-model="form.role" filterable placeholder=" سطح دسترسی" value-key="id" label="title"
                  :options="roles">
                </base-select>
              </base-form-item>
            </div>
          </div>

          <div class="flex flex-col justify-between lg:items-center">
            <div class="w-full">
              <base-button class="w-full" @click="handleInviteUser" :loading="loader" type="primary" block>
                ارسال
              </base-button>
            </div>
          </div>
        </base-form>
      </div>
    </base-dialog>
  </div>
</template>

<script setup lang="ts">
import { UPDATE_MODEL_EVENT } from "~/core/constants";
import { BaseFormItem, BaseForm, BaseFormGroup } from "@/components/base/form";
import { FormItemContext } from "~/core/tokens";
import BaseMessage from "@/components/base/message";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits([UPDATE_MODEL_EVENT, "create"]);
const visible: Ref<boolean> = ref(false);
const loader = ref(false);
const roles = ref([]);
const role_groups = ref([]);
const project_id = ref(null);
const route = useRoute();
const formRef: Ref<FormItemContext | null> = ref(null);
const form = ref({
  username: null,
  role_group: null,
  role: null,
});
watch(
  () => props.modelValue,
  (val: boolean) => {
    visible.value = val;
  },
  { immediate: true }
);
watch(
  () => visible.value,
  (val: boolean) => {
    formRef.value?.resetFields();
  }
);

const handleChangeRoleGroup = (val) => {
  const role_group = role_groups.value.find((role, i) => role.id == val);
  roles.value = role_group.children;
};

const handleInviteUser = () => {
  formRef.value?.validate(async (valid: any): Promise<void> => {
    if (valid) {
      loader.value = true;
      try {
        const formData = {
          project: project_id.value,
          users: [
            {
              username: form.value.username,
              role: form.value.role,
            },
          ],
        };
        const data = await useApiService.post(
          "application/portal/projects/invite/membership",
          formData
        );

        if (data.success) {
          BaseMessage({
            message: " افزودن کاربر با موفقیت انجام شد!",
            type: "success",
            duration: 4000,
            center: true,
            offset: 20,
          });
          emits("create", true);
          form.value.username = null;
          form.value.role_group = null;
          form.value.role = null;
          handleCloseCreateProject();
        }

        loader.value = false;
      } catch (error) {
        loader.value = false;
      }
    } else {
    }
  });
};

const fetchRoles = async () => {
  try {
    const data = await useApiService.get(
      `application/portal/projects/${route.params.id}/roles/select/values`
    );
    // role_groups.value = data.data;
    roles.value = data.data.roles;
  } catch (error) { }
};

const handleCloseCreateProject = () => {
  emits(UPDATE_MODEL_EVENT, false);
};

onMounted(() => {
  project_id.value = route.params.id; 

  fetchRoles();
});
</script>

<style scoped></style>
