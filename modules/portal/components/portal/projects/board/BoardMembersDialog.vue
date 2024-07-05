<template>
  <div>
    <base-dialog @close="handleClose()" title="اشتراک گذاری تابلو" custom-class="lg:w-[50%]" v-model="visible">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 lg:col-span-7 flex flex-col lg:px-6">
          <div class="w-full">
            <base-form :model="form" ref="formRef" class="h-full space-y-6">
              <base-form-item :model="form" prop="email" :rules="[
                {
                  required: true,
                  message: '   ایمیل  الزامی می باشد',
                },
              ]" label="" class="col-span-12">
                <base-input v-model="form.email" placeholder="  ایمیل "></base-input>
              </base-form-item>

              <div class="flex flex-col justify-between lg:items-center">
                <div class="w-full">
                  <base-button class="w-full" @click="handleInviteUser" :loading="loader" type="primary" block>
                    ارسال
                  </base-button>
                </div>
              </div>
            </base-form>
          </div>
        </div>
        <div class="col-span-12 lg:col-span-5">
          <div class="flex flex-col space-y-2 lg:mx-2 max-h-[200px] overflow-y-auto">
            <div class="flex items-center bg-gray-100 rounded-xl py-4 px-3" v-for="(member, i) in board?.members"
              :key="i">
              <div>
                <nuxt-icon name="user-bulk" class="w-5 h-5"></nuxt-icon>
              </div>
              <div class="mr-2 whitespace-nowrap text-ellipsis overflow-hidden max-w-[70%]">
                <span class="text-xs">
                  {{ member?.email }}
                </span>
              </div>

              <div class="mr-auto">
                <base-dropdown placement="left-start">
                  <span class="mr-auto cursor-pointer">
                    <nuxt-icon name="setting-bulk" class="w-4 h-4"></nuxt-icon>
                  </span>

                  <template #content>
                    <ul></ul>
                    <div>
                      <div @click="handleDeleteMember(member, i)"
                        class="text-gray-700 cursor-pointer rounded-[12px] px-3 py-2 hover:bg-gray-100">
                        <span> حذف کاربر</span>
                      </div>
                    </div>
                  </template>
                </base-dropdown>
              </div>
            </div>
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
const store = useBoardStore();
const { board } = storeToRefs(store);
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits([UPDATE_MODEL_EVENT, "create"]);
const visible: Ref<boolean> = ref(false);
const loader = ref(false);
const formRef: Ref<FormItemContext | null> = ref(null);
const route = useRoute();
const form = ref({
  email: null,
});
watch(
  () => props.modelValue,
  (val: boolean) => {
    visible.value = val;
  }
);
watch(
  () => visible.value,
  (val: boolean) => {
    formRef.value?.resetFields();
  }
);

const handleInviteUser = () => {
  formRef.value?.validate(async (valid: any): Promise<void> => {
    if (valid) {
      loader.value = true;
      try {
        const formData = {
          email: form.value.email,
        };
        const data = await useApiService.post(
          `application/portal/projects/board/${route.params.board}/members`,
          formData
        );

        if (data.success) {
          BaseMessage({
            message: " عملیات با موفقیت انجام شد!",
            type: "success",
            duration: 4000,
            center: true,
            offset: 20,
          });
          emits("create", true);
          form.value.email = "";
          formRef.value.resetFields();
          store.updateBoardMembers(data.data);
          // handleClose();
        }

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
</script>

<style scoped></style>
