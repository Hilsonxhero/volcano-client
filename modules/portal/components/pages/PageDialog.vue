<template>
  <div>
    <base-dialog
      @close="handleCloseCreatePage()"
      title=" "
      custom-class="lg:w-[90%] lg:h-[96vh]"
      v-model="visible_create_page"
    >
      <div>
        <div class="">
          <menu-bar
            class="editor__header sticky top-0 bg-white z-10"
            :editor="editor"
          >
            <template #link>
              <button
                type="button"
                :class="[ns.e('menu-item')]"
                title="image"
                @click="show = !show"
              >
                <nuxt-icon
                  filled
                  name="link-m"
                  class="w-6 h-6 text-gray-500"
                ></nuxt-icon>
              </button>
            </template>

            <template v-slot:image>
              <input
                type="file"
                class="hidden"
                ref="upload"
                @change="uploadImageHandler"
              />
              <button
                type="button"
                :class="[ns.e('menu-item')]"
                title="image"
                @click="showFileHandler"
              >
                <nuxt-icon
                  filled
                  name="image-line"
                  class="w-6 h-6 text-gray-500"
                ></nuxt-icon>
              </button>
            </template>

            <template v-slot:color>
              <button
                type="button"
                :class="[ns.e('menu-item')]"
                title="color"
                @click="showColorBox"
              >
                <nuxt-icon
                  filled
                  name="font-color"
                  class="w-6 h-6 text-gray-500"
                ></nuxt-icon>
              </button>

              <div style="position: relative">
                <input
                  id="color-box"
                  ref="color"
                  style="visibility: hidden"
                  type="color"
                  @input="
                    editor.chain().focus().setColor($event.target.value).run()
                  "
                  :value="editor.getAttributes('textStyle').color"
                />
              </div>
            </template>
          </menu-bar>
          <div class="w-3/4 mx-auto mt-10">
            <div class="mb-8 w-3/4">
              <input
                class="px-3 py-2 placeholder:text-base text-base placeholder:font-semibold font-semibold border-b border-gray-200 w-full"
                placeholder="نام صفحه را وارد کنید (عنوانی که برای کاربران در منو نمایش داده می شود)"
              />
            </div>
            <div>
              <textarea
                class="px-3 py-2 placeholder:text-2xl text-2xl w-full"
                placeholder="عنوان صفحه را وارد کنید"
              ></textarea>
            </div>

            <div>
              <editor-content
                v-bind="$attrs"
                class="editor__content"
                :editor="editor"
              />
            </div>
          </div>

          <base-dialog
            @close="show != show"
            title="ایجاد لینک"
            custom-class=""
            v-model="show"
          >
            <base-input v-model="url" placeholder="مسیر پیوست"></base-input>

            <template #footer="{ close }">
              <div class="flex items-center space-x-reverse space-x-4">
                <base-button type="primary" @click="handleSetLink">
                  تایید
                </base-button>
                <hx-button variant="light" @click="close"> لغو </hx-button>
              </div>
            </template>
          </base-dialog>
        </div>
      </div>
    </base-dialog>
  </div>
</template>

<script setup lang="ts">
import TiptapEditor from "@/components/common/tiptap/tiptap-editor.vue";
import { UPDATE_MODEL_EVENT } from "~/core/constants";
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import MenuBar from "@/components/common/tiptap/tiptap-menu.vue";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits([UPDATE_MODEL_EVENT, "update:visible", "close"]);

const ns = useNamespace("tiptap");

const visible_create_page = ref(false);
const upload = ref<null | HTMLElement>(null);
const url = ref(null);
const editor = ref<any>(null);
const file = ref<any>(null);
const color = ref<any>(null);
const show = ref(false);
const placeholder = ref(
  "آیا می دانستید که می توانید انواع چیزهای جالب مانند فهرست مطالب، تاریخ یا نقشه راه را به این صفحه اضافه کنید؟ برای باز کردن یک لیست، / را تایپ کنید"
);
const form = ref({
  content: "",
});

watch(
  () => props.visible,
  (val) => {
    visible_create_page.value = val;
  },
  { immediate: true }
);

watch(
  () => form.value.content,
  (val, prevVal) => {
    editor.value.commands.setContent(val);
  }
);

const handleCloseCreatePage = () => {
  emits("close", false);
};

const showColorBox = () => {
  // document.getElementById("color-box").click();
};
const showFileHandler = () => {
  upload.value.click();
};

const handleSetLink = () => {
  const previousUrl = editor.value.getAttributes("link").href;

  show.value = !show.value;

  if (url.value === null) {
    return;
  }

  if (url.value === "") {
    editor.value.chain().focus().extendMarkRange("link").unsetLink().run();

    return;
  }

  // update link
  editor.value
    .chain()
    .focus()
    .extendMarkRange("link")
    .setLink({ href: url.value })
    .run();

  url.value = null;
};

const uploadImageHandler = (event) => {
  file.value = event.target.files[0];
  const data = new FormData();
  data.append("file", file.value);
  useApiService
    .post("/upload/editor", data)
    .then(({ data }) => {
      editor.value.commands.setImage({ src: data.data });
    })
    .catch((error) => {});
};

onMounted(() => {
  editor.value = new Editor({
    extensions: [
      StarterKit.configure({
        history: true,
      }),
      Image,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        // emptyEditorClass: 'is-editor-empty',
        placeholder: placeholder.value,
      }),
      TextStyle,
      Highlight,
      Color,
    ],
    content: form.value.content,
    onUpdate: () => {
      emits(UPDATE_MODEL_EVENT, editor.value.getHTML());
    },
  });
});

onUnmounted(() => {
  editor.value.destroy();
});
</script>

<style scoped></style>
