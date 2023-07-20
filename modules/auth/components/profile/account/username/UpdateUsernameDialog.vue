<template>
  <div>
    <base-dialog
      custom-class="lg:w-[30%]"
      v-model="visible_update_username"
      title="ویرایش  نام کاربری"
      @close="handleOnCloseUpdateUsername"
    >
      <div>
        <base-form :model="form" ref="formRef" class="h-full space-y-6">
          <base-form-item
            prop="username"
            :rules="[
              {
                required: true,
                message: '  نام کاربری الزامی می باشد',
              },
            ]"
            label="نام کاربری"
          >
            <base-input
              v-model="form.username"
              placeholder=" نام کاربری را وارد کنید"
            ></base-input>
            <BaseValidationError :errors="validation_errros" field="username" />
          </base-form-item>
          <div class="text-right mt-4">
            <base-button type="primary" @click="handleUpdate" :loading="loader"
              >ثبت</base-button
            >
            <base-button variant="light" class="mr-1" @click="cancel"
              >لغو</base-button
            >
          </div>
        </base-form>
      </div>
    </base-dialog>
  </div>
</template>

<script setup lang="ts">
import { UPDATE_MODEL_EVENT } from "@/core/constants";
import { FormItemContext } from "~/core/tokens";
import {
  BaseFormItem,
  BaseForm,
  BaseFormGroup,
  BaseValidationError,
} from "@/components/base/form";
import BaseMessage from "@/components/base/message";
import { useAuthStore } from "@/modules/auth/store";

const emits = defineEmits([UPDATE_MODEL_EVENT, "close", "update"]);
const props = defineProps({
  modelValue: {},
});
const loader = ref(false);
const visible_update_username = ref(false);
const formRef: Ref<FormItemContext | null> = ref(null);
const validation_errros = ref([]);
const form = ref({
  username: null,
});
const store = useAuthStore();
watch(
  () => props.modelValue,
  (newVal) => {
    visible_update_username.value = newVal;
  }
);
const cancel = () => {
  visible_update_username.value = false;
};

const handleUpdate = async () => {
  const formData = {
    username: form.value.username,
  };
  loader.value = true;
  try {
    const data = await useApiService.post(
      "application/profile/update/username",
      formData
    );
    loader.value = false;
    if (data.success) {
      visible_update_username.value = false;
      emits("UPDATE_MODEL_EVENT", false);
      emits("close", false);
      BaseMessage({
        message: "عملیات ویرایش با موفقیت انجام شد",
        type: "success",
        duration: 4000,
        center: true,
      });
      store
        .personalInfo()
        .then(() => {
          emits("update", true);
        })
        .catch((e) => {});
    }
  } catch ({ response }) {
    loader.value = false;
  }
};

const handleOnCloseUpdateUsername = () => {
  visible_update_username.value = false;
  emits("UPDATE_MODEL_EVENT", false);
  emits("close", false);
};

onMounted(() => {
  form.value.username = store.user?.username;
});
</script>

<style scoped></style>
