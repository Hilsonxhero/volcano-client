<template>
  <div>
    <ClientOnly>
      <QuillEditor options="options" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { QuillEditor } from "@vueup/vue-quill";
import ImageUploader from "quill-image-uploader";
// import "@vueup/vue-quill/dist/vue-quill.snow.css";
const modules = {
  name: "imageUploader",
  module: ImageUploader,
  options: {
    upload: (file) => {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("image", file);

        useApiService
          .post("/upload-image", formData)
          .then((res) => {})
          .catch((err) => {});
      });
    },
  },
};
const options = ref({
  debug: "info",
  modules: {
    toolbar: ["bold", "italic", "underline"],
  },
  placeholder: "Compose an epic...",
  readOnly: true,
  theme: "snow",
});
</script>

<style scoped></style>
