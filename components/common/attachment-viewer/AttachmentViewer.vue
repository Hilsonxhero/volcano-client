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
                  <img
                    class="attachment-viewer-frame-preview-image js-stop inline text-center"
                    :src="attachment?.preview"
                    alt="Screenshot from 2023-09-05 13-30-22.png"
                  />
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
                <h2 class="attachment-viewer-frame-details-title">
                  Screenshot from 2023-09-05 13-30-22.png
                </h2>
                <p>
                  Added
                  <span
                    class="date"
                    dt="2023-09-09T21:19:26.883Z"
                    data-date="Sun Sep 10 2023 00:49:27 GMT+0330 (Iran Standard Time)"
                    title="September 10, 2023 12:49 AM"
                    >3 minutes ago</span
                  >
                  • 70.87 KB
                </p>
                <p>
                  <span class="js-meta"
                    ><a
                      href="https://trello.com/1/cards/6197ef9cb409c372b87cc255/attachments/64fce15ed65cc0ff9a52729a/download/Screenshot_from_2023-09-05_13-30-22.png"
                      target="_blank"
                      ><span
                        class="icon-sm icon-external-link light attachment-viewer-option-icon"
                      ></span
                      >Open in new tab</a
                    ><span class="js-cover-options"
                      ><span class="js-make-cover-box"
                        ><a class="js-make-cover" href="#"
                          ><span
                            class="icon-sm icon-card-cover light attachment-viewer-option-icon"
                          ></span
                          >Make cover</a
                        ></span
                      ><span class="js-remove-cover-box hide"
                        ><a class="js-remove-cover" href="#"
                          ><span
                            class="icon-sm icon-card-cover light attachment-viewer-option-icon"
                          ></span
                          >Remove cover</a
                        ></span
                      ></span
                    ><a class="js-open-delete-confirm" href="#"
                      ><span
                        class="icon-sm icon-close light attachment-viewer-option-icon"
                      ></span
                      >Delete</a
                    ></span
                  ><span class="js-confirm-delete hide"
                    >Are you sure you want to delete? There is no undo.<a
                      class="attachment-viewer-delete-link js-delete"
                      href="#"
                      >Delete forever.</a
                    ><a
                      class="attachment-viewer-delete-link js-close-delete-confirm"
                      href="#"
                      >Nevermind.</a
                    ></span
                  >
                </p>
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
