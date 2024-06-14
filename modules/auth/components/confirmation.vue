<template>
  <div>
    <div class="w-full">
      <base-form
        @submit.prevent="handleSubmit"
        :model="form"
        ref="formRef"
        class="h-full space-y-6"
      >
        <div class="block mb-4">
          <base-form-item
            :model="form"
            v-slot="{ field }"
            prop="username"
            :rules="[
              {
                required: true,
                message: ' شماره همراه   الزامی می باشد',
              },
            ]"
            label=""
            class="col-span-12"
          >
            <!-- <base-input
              v-bind="field"
              v-model="form.username"
              placeholder="آدرس ایمیل"
            ></base-input> -->
            <input
              v-bind="field"
              class="text-field w-input text-center"
              maxlength="256"
              name="Email"
              data-name="Email"
              placeholder="شماره همراه"
              v-model="form.username"
            />
          </base-form-item>
        </div>

        <div class="flex flex-col justify-between lg:items-center">
          <div class="w-full">
            <!-- <base-button
              class="w-full"
              @click="handleSubmit"
              :loading="loader"
              type="primary"
              block
              >ورود</base-button
            > -->
            <button type="submit" class="submit-button w-button block w-full">
              ادامه
            </button>
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
  formRef.value?.validate(async (valid: any): Promise<void> => {
    if (valid) {
      loader.value = true;
      const formDate = {
        username: form.value.username,
      };

      const data = await store.authenticate(formDate);
      end.value = data.ttl * 1000;
      otp.value = true;
      emit("change", end.value);
      loader.value = false;
    }
  });
};
</script>

<style scoped></style>
