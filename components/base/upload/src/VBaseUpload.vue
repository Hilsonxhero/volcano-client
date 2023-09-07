<template>
  <div
    class="flex items-center justify-start flex-wrap space-x-2 space-x-reverse"
  >
    <div class="flex flex-col relative w-full">
      <label
        for="file-upload"
        class="relative block bg-white border-dashed border-2 border-gray-300 rounded-xl overflow-hidden"
      >
        <input
          v-bind:multiple="multiple"
          ref="uploadRef"
          id="file-upload"
          @change="handleObjectURL"
          type="file"
          class="opacity-0 cursor-pointer absolute inset-0 w-full"
        />
        <span class="items-center flex justify-center h-full">
          <span
            class="flex items-center justify-center h-full text-center mx-auto"
          >
            <div class="p-1 space-y-4 flex lg:t-col">
              <div class="items-center flex justify-center">
                <template v-if="files.length >= 1">
                  <div
                    class="relative h-[110px] w-[120px] mt-2 ml-2 rounded-md overflow-hidden uploader-item"
                    v-for="(uploaded_file, j) in files"
                    :key="j"
                  >
                    <img
                      v-if="uploaded_file?.preview"
                      :src="uploaded_file?.preview"
                      class="w-full h-full object-cover"
                      alt=""
                    />
                    <nuxt-icon v-else class="" name="doc"></nuxt-icon>

                    <div
                      class="w-full h-full opacity-0 hover:opacity-100 cursor-pointer left-0 top-0 flex flex-col absolute justify-center items-center uploader-cover transition-all duration-100 ease-out"
                    >
                      <nuxt-icon
                        @click.prevent="handleDeleteFile(uploaded_file, j)"
                        class="mb-2 w-6 h-6 text-typo-light fill-current icon sprite-next text-white z-10 relative"
                        name="trash"
                      ></nuxt-icon>

                      <div
                        class="text-white font-bold text-ellipsis overflow-hidden whitespace-nowrap w-[98%]"
                      >
                        {{ uploaded_file.name }}
                      </div>
                    </div>
                  </div>
                </template>

                <div v-else>
                  <client-only>
                    <div class="flex flex-col items-center">
                      <nuxt-icon
                        class="mb-2 w-10 h-10 text-typo-light fill-current icon sprite-next text-gray-500"
                        name="gallery"
                      ></nuxt-icon>
                      <div class="text-typo-light text-xs font-bold">
                        فایل را انتخاب کنید
                      </div>
                    </div>
                  </client-only>
                </div>
              </div>
            </div>
          </span></span
        ></label
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
//@ts-nocheck
import { isString } from "@/utils";
const props = defineProps({
  max: {
    type: Number,
    default: 1,
  },
  modelValue: {
    type: [Array, String, Object],
  },
  sources: {
    type: [String, Array, Object],
    default: [],
  },
  multiple: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["fileChange", "update:modelValue", "delete"]);

const uploadRef = ref(null);
const files = ref<Array<any>>([]);
const uploaded_file = ref<any>({});

const handleObjectURL = async (event: any) => {
  let uploaded_files = event.target.files;
  for (let index = 0; index < uploaded_files.length; index++) {
    const uploaded_file = uploaded_files[index];
    if (files.value.length >= props.max) {
      files.value = [];
    }
    files.value.push({
      media: uploaded_file,
      file: null,
      name: uploaded_file.name,
      preview: uploaded_file.type.startsWith("image/")
        ? URL.createObjectURL(uploaded_file)
        : null,
    });
  }

  // const file = event.target.files[0];
  // uploaded_file.value.base64 = await useBase64(file);
  // uploaded_file.value.media = file;
  // uploaded_file.value.name = file.name;
  // uploaded_file.value.preview = URL.createObjectURL(file);
  // if (files.value.length >= props.max) return false;
  // files.value.push({
  //   media: file,
  //   file: await useBase64(file),
  //   name: uploaded_file.value.name,
  //   preview: uploaded_file.value.preview,
  // });

  // uploaded_file.value = {
  //   media: file,
  //   file: await useBase64(file),
  //   name: media.value.name,
  //   preview: media.value.preview,
  // }
};

const handleDeleteFile = (file, index) => {
  console.log("delete");

  files.value.splice(index, 1);
  // emit("delete", file.id);
};
const clear = () => {
  uploaded_file.value = {};
};

defineExpose({ clear });

watch(
  () => files.value,
  (val, oldVal) => {
    if (val.length == 0) {
      emit("update:modelValue", null);
    } else {
      if (props.multiple) {
        emit("update:modelValue", files.value);
      } else {
        emit("update:modelValue", {
          file: files.value[0]?.media,
          name: files.value[0].name,
          base64: files.value[0].base64,
          preview: files.value[0].preview,
        });
      }
    }
  },
  { deep: true }
);

watch(
  () => props.sources,
  (val, oldVal) => {
    if (isString(val)) uploaded_file.value.preview = val;
  },
  { deep: true }
);

onMounted(() => {
  if (props.sources) {
    if (isString(props.sources)) files.value.push({ preview: props.sources });
  }
});
</script>
