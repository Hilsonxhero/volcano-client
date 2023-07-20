<template>
  <div>
    <base-dialog
      custom-class="lg:w-[40%]"
      v-model="visible_account"
      title="حساب کاربری"
      @close="handleOnCloseManageAccount"
    >
      <div>
        <base-form :model="form" ref="formRef" class="grid grid-cols-12 gap-4">
          <base-form-item
            :model="form"
            prop="avatar"
            :rules="[
              {
                required: true,
                message: '',
              },
            ]"
            label=" "
            class="col-span-12 lg:col-span-12 mb-4"
          >
            <div class="flex justify-center">
              <base-avatar
                ref="avatarRef"
                class="w-[100px] h-[100px]"
                fit="cover"
                shape="circle"
                @click="handleClickAvatar"
              >
                <img :src="user.media.avatar" class="" />
              </base-avatar>
              <input
                @change="handleChangeAvatar"
                class="hidden"
                ref="avatarInput"
                type="file"
              />
            </div>
          </base-form-item>
          <base-form-item
            :model="form"
            prop="username"
            :rules="[
              {
                required: true,
                message: '   نام کاربری الزامی می باشد',
              },
            ]"
            label="نام کاربری"
            class="col-span-12 lg:col-span-6 mb-4"
          >
            <base-input
              suffix-icon="magicpen"
              readonly
              v-model="form.username"
              placeholder=" نام کاربری"
              @focus="handleShowUpdateUsername"
            ></base-input>
          </base-form-item>

          <base-form-item
            :model="form"
            prop="email"
            :rules="[
              {
                required: true,
                message: '   ایمیل الزامی می باشد',
              },
            ]"
            label="ایمیل"
            class="col-span-12 lg:col-span-6 mb-4"
          >
            <base-input
              suffix-icon="magicpen"
              readonly
              input-class="h-20 resize-none"
              type="email"
              v-model="form.email"
              placeholder=" ایمیل"
              @focus="handleShowUpdateEmail"
            ></base-input>
          </base-form-item>

          <base-form-item
            :model="form"
            prop="phone"
            :rules="[
              {
                required: true,
                message: '   شماره همراه الزامی می باشد',
              },
            ]"
            label="شماره همراه"
            class="col-span-12 lg:col-span-6 mb-4"
          >
            <base-input
              suffix-icon="magicpen"
              readonly
              input-class="h-20 resize-none"
              v-model="form.phone"
              placeholder=" شماره همراه"
              @focus="handleShowUpdatePhone"
            ></base-input>
          </base-form-item>
        </base-form>
      </div>
    </base-dialog>
    <UpdateMobileDialog
      @update="handleOnUpdateProfile"
      v-model="visible_update_phone"
      @close="handleOnCloseUpdateProfile"
    />
    <UpdateEmailDialog
      @update="handleOnUpdateProfile"
      v-model="visible_update_email"
      @close="handleOnCloseUpdateProfile"
    />
    <UpdateUsernameDialog
      @update="handleOnUpdateProfile"
      v-model="visible_update_username"
      @close="handleOnCloseUpdateProfile"
    />
  </div>
</template>

<script setup lang="ts">
import { UPDATE_MODEL_EVENT } from "@/core/constants";
import { storeToRefs } from "pinia";
import { FormItemContext } from "~/core/tokens";
import { BaseFormItem, BaseForm, BaseFormGroup } from "@/components/base/form";
import BaseMessage from "@/components/base/message";
import { useAuthStore } from "@/modules/auth/store";
import UpdateMobileDialog from "@/modules/auth/components/profile/account/mobile/UpdateMobileDialog.vue";
import UpdateEmailDialog from "@/modules/auth/components/profile/account/email/UpdateEmailDialog.vue";
import UpdateUsernameDialog from "@/modules/auth/components/profile/account/username/UpdateUsernameDialog.vue";
const emits = defineEmits([UPDATE_MODEL_EVENT, "close"]);
const props = defineProps({
  modelValue: {},
});
const store = useAuthStore();
const { user } = storeToRefs(store);
const visible_account = ref(false);
const visible_update_phone = ref(false);
const visible_update_email = ref(false);
const visible_update_username = ref(false);

const formRef: Ref<FormItemContext | null> = ref(null);
const avatarInput = ref(null);
const form = ref({
  username: null,
  email: null,
  phone: null,
  avatar: null,
});

watch(
  () => props.modelValue,
  (newVal) => {
    visible_account.value = newVal;
  }
);

const handleOnCloseManageAccount = () => {
  visible_account.value = false;
  emits("UPDATE_MODEL_EVENT", false);
  emits("close", false);
};
const handleShowUpdatePhone = () => {
  handleOnCloseManageAccount();
  visible_update_phone.value = true;
};
const handleShowUpdateEmail = () => {
  handleOnCloseManageAccount();
  visible_update_email.value = true;
};

const handleShowUpdateUsername = () => {
  handleOnCloseManageAccount();
  visible_update_username.value = true;
};

const handleClickAvatar = () => {
  avatarInput.value.click();
};
const handleChangeAvatar = (e) => {
  form.value.avatar = e.target.files[0];
  handleUpdateAvatar();
};

const handleOnUpdateProfile = () => {
  visible_account.value = true;
  syncUserData();
};
const handleOnCloseUpdateProfile = () => {
  visible_update_phone.value = false;
  visible_update_email.value = false;
  visible_update_username.value = false;
  visible_account.value = true;
};

const syncUserData = () => {
  form.value.email = user.value?.email;
  form.value.phone = user.value?.phone;
  form.value.username = user.value?.username;
};

const handleUpdateAvatar = async () => {
  const form_data = new FormData();
  form_data.append("avatar", form.value.avatar);
  try {
    const data = await useApiService.post(
      "application/profile/update/avatar",
      form_data
    );
    if (data.success) {
      store
        .personalInfo()
        .then(() => {})
        .catch((e) => {});
    }
  } catch ({ response }) {
    error.value = response.data.data;
  }
};

onMounted(() => {
  syncUserData();
});
</script>

<style scoped></style>
