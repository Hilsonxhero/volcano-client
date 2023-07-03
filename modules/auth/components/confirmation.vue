<template>
  <div>
    <h1 class="flex justify-start mb-6 text-typo text-xl">ورود</h1>
    <div class="w-full">
      <base-form :model="form" ref="formRef" class="h-full space-y-6">
        <div class="block mb-4">
          <base-form-item
            :model="form"
            v-slot="{ field }"
            prop="username"
            :rules="[
              {
                required: true,
                message: ' شماره موبایل  الزامی می باشد',
              },
            ]"
            label="عنوان"
            class="col-span-12"
          >
            <base-input
              v-bind="field"
              v-model="form.username"
              placeholder="شماره موبایل"
            ></base-input>
          </base-form-item>
        </div>
        <span class="text-justify lg:text-xs text-gray-600">
          با ورود به ،
          <a class="cursor-pointer"><span class="text-link"> شرایط </span></a>
          و

          <a class="cursor-pointer"
            ><span class=""> قوانین حریم ‌خصوصی </span></a
          >

          آن را می‌پذیرید.
        </span>

        <div class="flex flex-col justify-between lg:items-center">
          <div class="w-full">
            <base-button
              class="w-full"
              @click="handleSubmit"
              :loading="loader"
              type="primary"
              block
              >ورود</base-button
            >
          </div>
        </div>
      </base-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { UPDATE_MODEL_EVENT } from "@/core/constants";
import { useAuthStore } from "@/modules/auth/store";
import { BaseFormItem, BaseForm, BaseFormGroup } from "@/components/base/form";

const store = useAuthStore();
const emit = defineEmits([UPDATE_MODEL_EVENT, "change"]);

const otp = ref(false);
const loader = ref(false);
const formRef = ref(null);
const form = ref({
  username: "",
});
const end = ref<any>(null);

watch(form.value, (val, oldVal) => {
  emit(UPDATE_MODEL_EVENT, val.username);
});

watchEffect(() => {
  if (formRef.value) {
  }
});

const handleSubmit = async () => {
  loader.value = true;
  const formDate = {
    phone: form.value.username,
  };

  const data = await store.authenticate(formDate);
  end.value = data.ttl * 1000;
  otp.value = true;
  emit("change", end.value);
  loader.value = false;
};
</script>

<style scoped></style>
