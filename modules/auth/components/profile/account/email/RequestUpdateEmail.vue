<template>
  <div>
    <base-form :model="form" ref="formRef" class="h-full space-y-6">
      <base-form-item
        prop="email"
        :rules="[
          {
            required: true,
            message: '  ایمیل  الزامی می باشد',
          },
        ]"
        label=" ایمیل"
      >
        <base-input
          v-model="form.email"
          placeholder=" ایمیل را وارد کنید"
        ></base-input>
        <BaseValidationError :errors="validation_errros" field="email" />
      </base-form-item>
      <div class="text-right mt-4">
        <base-button type="primary" @click="request" :loading="loader"
          >ثبت</base-button
        >
        <base-button variant="light" class="mr-1" @click="cancel"
          >لغو</base-button
        >
      </div>
    </base-form>
  </div>
</template>

<script setup lang="ts">
import {
  BaseForm,
  BaseFormItem,
  BaseFormGroup,
  BaseValidationError,
} from "@/components/base/form";
import { useAuthStore } from "@/modules/auth/store";
import { storeToRefs } from "pinia";
import { UPDATE_MODEL_EVENT } from "@/core/constants";
const emit = defineEmits(["update", "close", UPDATE_MODEL_EVENT]);
const store = useAuthStore();
const { user } = storeToRefs(store);
const loader = ref<boolean>(false);
const formRef = ref(null);
const error = ref<any>(null);
const show = inject<any>("show", false);
const validation_errros = ref([]);
const form = ref({
  email: store?.user?.email,
  ttl_time: 0,
});

const request = async () => {
  const formData = {
    email: form.value.email,
  };
  loader.value = true;
  try {
    const data = await useApiService.post(
      "application/profile/update/email/request",
      formData
    );
    loader.value = false;
    if (data.success) {
      show.value = true;
      form.value.ttl_time = data.data.ttl * 1000;
      emit(UPDATE_MODEL_EVENT, form.value);
    }
  } catch ({ response }) {
    loader.value = false;
    validation_errros.value = response._data.data;
  }
};

const cancel = () => {
  emit("close", true);
};

onMounted(() => {
  form.value.email = user.value.email;
});
</script>

<style scoped></style>
