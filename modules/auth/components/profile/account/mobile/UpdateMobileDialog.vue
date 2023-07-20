<template>
  <div>
    <base-dialog
      custom-class="lg:w-[30%]"
      v-model="visible_update_phone"
      title="ویرایش شماره همراه"
      @close="handleOnCloseUpdatePhone"
    >
      <div>
        <template v-if="!show">
          <RequestUpdateMobile v-model="form" @close="cancel" />
        </template>
        <template v-else>
          <VerifyUpdateMobile :data="form" @close="cancel" @update="update" />
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
import RequestUpdateMobile from "@/modules/auth/components/profile/account/mobile/RequestUpdateMobile.vue";
import VerifyUpdateMobile from "@/modules/auth/components/profile/account/mobile/VerifyUpdateMobile.vue";
const emits = defineEmits([UPDATE_MODEL_EVENT, "close", "update"]);
const props = defineProps({
  modelValue: {},
});
const loader = ref(false);
const visible_update_phone = ref(false);
const formRef: Ref<FormItemContext | null> = ref(null);
const show = ref<boolean>(false);
const form = ref({
  phone: null,
});
const store = useAuthStore();
provide("show", show);
watch(
  () => props.modelValue,
  (newVal) => {
    visible_update_phone.value = newVal;
  }
);

const cancel = () => {
  visible_update_phone.value = false;
};
const update = () => {
  visible_update_phone.value = false;

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

const handleOnCloseUpdatePhone = () => {
  visible_update_phone.value = false;
  emits("UPDATE_MODEL_EVENT", false);
  emits("close", false);
};

const handleUpdatePhone = () => {};

onMounted(() => {
  form.value.phone = store.user?.phone;
});
</script>

<style scoped></style>
