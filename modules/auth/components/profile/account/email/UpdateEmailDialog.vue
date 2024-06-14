<template>
  <div>
    <base-dialog
      custom-class="lg:w-[30%]"
      v-model="visible_update_email"
      title="ویرایش  ایمیل"
      @close="handleOnCloseUpdateEmail"
    >
      <div>
        <template v-if="!show">
          <RequestUpdateEmail v-model="form" @close="cancel" />
        </template>
        <template v-else>
          <VerifyUpdateEmail :data="form" @close="cancel" @update="update" />
        </template>
      </div>
    </base-dialog>
  </div>
</template>

<script setup lang="ts">
import { UPDATE_MODEL_EVENT } from "@/core/constants";
import { FormItemContext } from "~/core/tokens";
import { BaseFormItem, BaseForm, BaseFormGroup } from "@/components/base/form";
import BaseMessage from "@/components/base/message";
import { useAuthStore } from "@/modules/auth/store";
import RequestUpdateEmail from "@/modules/auth/components/profile/account/email/RequestUpdateEmail.vue";
import VerifyUpdateEmail from "@/modules/auth/components/profile/account/email/VerifyUpdateEmail.vue";
const emits = defineEmits([UPDATE_MODEL_EVENT, "close", "update"]);
const props = defineProps({
  modelValue: {},
});
const loader = ref(false);
const visible_update_email = ref(false);
const formRef: Ref<FormItemContext | null> = ref(null);
const show = ref<boolean>(false);
const form = ref({
  email: null,
});
const store = useAuthStore();
provide("show", show);
watch(
  () => props.modelValue,
  (newVal) => {
    visible_update_email.value = newVal;
  }
);

const cancel = () => {
  visible_update_email.value = false;
};
const update = () => {
  visible_update_email.value = false;

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
};

const handleOnCloseUpdateEmail = () => {
  visible_update_email.value = false;
  emits("UPDATE_MODEL_EVENT", false);
  emits("close", false);
};

onMounted(() => {
  form.value.email = store.user?.email;
});
</script>

<style scoped></style>
