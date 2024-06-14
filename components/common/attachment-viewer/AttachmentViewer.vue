<template>
  <div>
    <div v-if="visible_attachment">
      <teleport to="body">
        <div class="attachment-viewer" data-elevation="2">
          <div class="attachment-viewer-header js-close-viewer">
            <!-- <span
              class="icon-lg icon-close attachment-viewer-header-close-icon"
            ></span> -->
            <div class="p-3">
              <nuxt-icon
                icon
                name="close-square"
                class="w-9 h-9 text-white cursor-pointer"
                @click="handleClose"
              ></nuxt-icon>
            </div>
          </div>
          <div class="attachment-viewer-underlay js-close-viewer"></div>
          <div class="attachment-viewer-frames js-frames">
            <div
              class="attachment-viewer-frame js-close-viewer attachment-viewer-frame-center attachment-viewer-frame-loaded"
              data-idattachment="64fce15ed65cc0ff9a52729a"
            >
              <div class="attachment-viewer-frame-preview-wrapper">
                <div
                  class="attachment-viewer-frame-preview attachment-viewer-frame-preview-image-wrapper"
                >
                  <template v-if="attachment.type == 'pdf'">
                    <embed
                      class="attachment-viewer-frame-preview-image js-stop inline text-center w-[80%] h-[60vh]"
                      :src="attachment?.preview"
                    />
                  </template>
                  <template
                    v-else-if="
                      attachment.type == 'doc' || attachment.type == 'docx'
                    "
                  >
                    <img
                      class="attachment-viewer-frame-preview-image js-stop inline text-center"
                      src="@/assets/media/docx-icon.svg"
                      alt=""
                    />
                  </template>
                  <template v-else>
                    <embed
                      class="attachment-viewer-frame-preview-image js-stop inline text-center"
                      :src="attachment?.preview"
                    />
                  </template>

                  <!-- <img
                    class="attachment-viewer-frame-preview-image js-stop inline text-center"
                    :src="attachment?.preview"
                    alt=""
                  /> -->
                </div>
              </div>
            </div>
            <div
              class="attachment-viewer-frame js-close-viewer attachment-viewer-frame-right attachment-viewer-frame-loaded"
              data-idattachment="64fce102233740b60a19980f"
            >
              <div class="attachment-viewer-frame-preview-wrapper">
                <div class="attachment-viewer-frame-preview"></div>
              </div>
            </div>
          </div>
          <div class="attachment-viewer-overlay">
            <div
              class="attachment-viewer-frame-details js-display-frame-details"
            >
              <div class="attachment-viewer-frame-details">
                <h2 class="attachment-viewer-frame-details-title"></h2>
                <base-button @click="showFile" class="" type="primary" block>
                  نمایش فایل
                </base-button>
                <base-button
                  @click="downloadMedia"
                  class="mr-2"
                  type="success"
                  block
                >
                  دانلود فایل
                </base-button>
                <!-- <a class="p-3 border rounded-xl" :href="``"> دانلود فایل </a> -->
              </div>
            </div>
          </div>
          <a class="attachment-viewer-next-frame-btn js-show-next-frame"
            ><span
              class="icon-lg icon-forward light attachment-viewer-next-frame-btn-icon"
            ></span></a
          ><a class="attachment-viewer-prev-frame-btn js-show-prev-frame hide"
            ><span
              class="icon-lg icon-back light attachment-viewer-prev-frame-btn-icon"
            ></span
          ></a>
        </div>
      </teleport>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UPDATE_MODEL_EVENT } from "@/core/constants";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  attachment: {},
});
const visible_attachment = ref(false);
const emit = defineEmits([UPDATE_MODEL_EVENT]);
const showFile = () => {
  window.open(props.attachment.preview, "_blank");
};
const downloadMedia = async () => {
  try {
    const response = await useApiService.get(
      `application/media/download/stream/${props.attachment.id}`
    );
    window.open(response.data, "_blank");
  } catch (error) {}
};
watch(
  () => props.modelValue,
  (val) => {
    visible_attachment.value = val;
  }
);
const handleClose = () => {
  visible_attachment.value = false;
  emit(UPDATE_MODEL_EVENT, false);
};
</script>

<style scoped></style>
