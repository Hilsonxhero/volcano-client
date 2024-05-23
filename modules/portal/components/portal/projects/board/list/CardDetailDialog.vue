<template>
  <div>
    <base-dialog
      @close="handleOnClose()"
      v-model="visible"
      title="مشاهده یادداشت"
      custom-class="lg:w-[60%] lg:h-[96vh]"
    >
      <div class="grid grid-cols-12 gap-2 h-full">
        <div class="col-span-12 lg:col-span-9">
          <div class="mt-3">
            <base-form
              @submit.prevent="handleUpdate"
              :model="form"
              ref="formRef"
              class="grid grid-cols-12 gap-4 px-4"
            >
              <base-form-item
                :model="form"
                prop="title"
                :rules="[
                  {
                    required: true,
                    message: '    عنوان الزامی می باشد',
                  },
                ]"
                label=" عنوان"
                class="col-span-12 mb-4"
              >
                <base-input
                  v-model="form.title"
                  placeholder="  عنوان یادداشت را وارد کنید .."
                ></base-input>
              </base-form-item>

              <base-form-item
                :model="form"
                prop="description"
                label=" توضیحات"
                class="col-span-12"
              >
                <div>
                  <TiptapEditor
                    :content="form.description"
                    v-model="form.description"
                    placeholder="توضیحات یادداشت را وارد کنید"
                  />
                </div>
              </base-form-item>

              <base-form-item
                :model="form"
                prop="attachments"
                label="پیوست ها"
                class="col-span-12"
              >
                <base-upload
                  multiple
                  :max="5"
                  v-model="form.image"
                  :sources="form.attachments"
                ></base-upload>
              </base-form-item>

              <!-- <div class="col-span-12">
            <div class="flex flex-col justify-between lg:items-center mt-2">
              <div class="w-full flex items-center">
                <base-button
                  nativeType="submit"
                  class=""
                  :loading="loader"
                  type="primary"
                  block
                >
                  مشاهده
                </base-button>
              </div>
            </div>
          </div> -->
            </base-form>
          </div>
        </div>
        <div class="col-span-12 lg:col-span-3">
          <div class="h-full mt-4">
            <div
              class="border h-full px-2 py-2 rounded-xl flex justify-start flex-col items-center"
            >
              <div class="mb-3 w-full mt-3">
                <span
                  @click="handleShareBoardCard"
                  class="bg-gray-100 justify-between cursor-pointer rounded-2xl flex px-4 items-center min-w-[2.75rem] h-[2.75rem] ml-2"
                >
                  <span class="ml-2"> اشتراک گذاری </span>
                  <nuxt-icon name="send" class="w-6 h-6"></nuxt-icon>
                </span>
              </div>
              <div class="mb-3 w-full">
                <span
                  @click="handleShowMoveCard"
                  class="bg-gray-100 cursor-pointer justify-between rounded-2xl flex px-4 items-center min-w-[2.75rem] h-[2.75rem] ml-2"
                >
                  <span class="ml-2"> انتقال </span>
                  <nuxt-icon name="convertshape" class="w-6 h-6"></nuxt-icon>
                </span>
              </div>

              <div class="w-full">
                <span
                  @click="handleDelete"
                  class="bg-gray-100 cursor-pointer justify-between px-4 rounded-2xl flex items-center min-w-[2.75rem] h-[2.75rem] ml-2"
                >
                  <span class="ml-2"> حذف </span>
                  <nuxt-icon name="trash" class="w-5 h-5"></nuxt-icon>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex flex-col justify-between lg:items-center mt-2">
          <div class="w-full flex items-center">
            <base-button
              @click="handleUpdate"
              class=""
              :loading="loader"
              type="primary"
              block
            >
              ویرایش
            </base-button>
          </div>
        </div>
      </template>
    </base-dialog>

    <div>
      <base-dialog v-model="visible_move" title=" انتقال یادداشت">
        <base-select
          v-model="selected_move_list"
          filterable
          placeholder="  انتخاب لیست"
          value-key="id"
          label="title"
          :options="lists"
        >
        </base-select>

        <template #footer>
          <base-button
            @click="handleMoveCard"
            class=""
            :loading="loader"
            type="primary"
            block
          >
            انتقال
          </base-button>
        </template>
      </base-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseFormItem, BaseForm, BaseFormGroup } from "@/components/base/form";
import BaseMessage from "@/components/base/message";
import { UPDATE_MODEL_EVENT } from "~/core/constants";
import { FormItemContext } from "~/core/tokens";
import TiptapEditor from "@/components/common/tiptap/tiptap-editor.vue";
import { useBoardStore } from "@/modules/portal/store/board";
import { storeToRefs } from "pinia";
import { BaseMessageBox } from "@/components/base/message-box";
import { useClipboard } from "@vueuse/core";

const { text, copy, copied, isSupported } = useClipboard();
const visible_move = ref(false);
const store = useBoardStore();
const emits = defineEmits([UPDATE_MODEL_EVENT, "create"]);
const selected_move_list = ref(null);
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  card: {},
  lists: {},
});
const visible: Ref<boolean> = ref(false);

const route = useRoute();
const form = ref({
  title: null,
  description: null,
  attachments: [],
});
const formRef = ref(null);
const loader = ref(false);

watch(
  () => props.modelValue,
  (val: boolean) => {
    visible.value = val;
    if (val) {
      form.value.title = props.card.title;
      form.value.description = props.card.description;
      form.value.attachments = props.card.attachments;
      // form.value.attachments.forEach((attc, index) => {
      //   var file_type = attc.path.split(".").pop();
      //   attc.type = file_type;
      // });
    }
  }
);
watch(
  () => visible.value,
  (val: boolean) => {
    formRef.value?.resetFields();
  }
);
watch(
  () => copied.value,
  (val) => {
    if (val) {
      BaseMessage({
        message: "لینک یادداشت با موفقیت کپی شد.",
        type: "success",
        duration: 4000,
        center: true,
        offset: 40,
      });
    }
  }
);

const handleMoveCard = async () => {
  if (selected_move_list.value !== null) {
    const form_data = new FormData();
    form_data.append("id", props.card?.id);
    form_data.append("board_list_id", selected_move_list.value);
    const data = await useApiService.post(
      `application/portal/projects/board/card/update/list`,
      form_data
    );

    if (data.success) {
      await store.moveCard({
        id: selected_move_list.value,
        card: props.card,
      });
      visible_move.value = false;
      BaseMessage({
        message: "انتقال یادداشت با موفقیت انجام شد.",
        type: "success",
        duration: 4000,
        center: true,
        offset: 20,
      });

      // handleOnClose();
    }
  }
};

const handleShowMoveCard = () => {
  visible_move.value = true;
};

const handleUpdate = () => {
  formRef.value?.validate(async (valid: any): Promise<void> => {
    if (valid) {
      loader.value = true;
      try {
        const form_data = new FormData();
        form_data.append("title", form.value.title);
        form_data.append("description", form.value.description);

        if (form.value.image && form.value.image.length >= 1) {
          let uploaded_media = form.value.image.filter((item, j) =>
            item.hasOwnProperty("media")
          );
          if (uploaded_media.length >= 1) {
            for (var i = 0; i < uploaded_media.length; i++) {
              form_data.append(`attachments[${i}]`, uploaded_media[i].media);
            }
          }
        }

        const data = await useApiService.put(
          `application/portal/projects/board/list/${props.card.board_list_id}/cards/${props.card.id}`,
          form_data
        );

        if (data.success) {
          BaseMessage({
            message: "ویرایش  یادداشت با موفقیت انجام شد!",
            type: "success",
            duration: 4000,
            center: true,
            offset: 20,
          });
          store.updateBoardList({
            id: props.card.board_list_id,
            row: data.data,
          });
          handleOnClose();
        }

        loader.value = false;
      } catch (error) {
        loader.value = false;
      }
    } else {
    }
  });
};

const handleOnClose = () => {
  emits(UPDATE_MODEL_EVENT, false);
};

const handleDelete = () => {
  BaseMessageBox.confirm(`آیا از حذف   اطمینان دارید ؟!`, " تایید حذف ", {
    confirmButtonText: "تایید",
    cancelButtonText: "لغو",
    type: "warning",
  })
    .then(async () => {
      const data = await store.deleteCard({
        list: props.card.board_list_id,
        card: props.card.id,
      });

      if (data.success) {
        visible.value = false;
        BaseMessage({
          message: "حذف    با موفقیت انجام شد!",
          type: "success",
          duration: 4000,
          center: true,
          offset: 20,
        });
      }
    })
    .catch(() => {});
};

const handleShareBoardCard = () => {
  copy(window.location.host + `${route.fullPath}?card=${props.card?.id}`);
};

onMounted(() => {});
</script>

<style scoped></style>
