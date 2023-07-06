<template>
  <div class="editor" v-if="editor">
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
            style="display: none"
            type="color"
            @input="editor.chain().focus().setColor($event.target.value).run()"
            :value="editor.getAttributes('textStyle').color"
          />
        </div>
      </template>

      <template v-slot:backColor>
        <button
          type="button"
          :class="[ns.e('menu-item')]"
          title="color"
          @click="showBackColorBox"
        >
          <nuxt-icon
            filled
            name="text-bg"
            class="w-6 h-6 text-gray-500"
          ></nuxt-icon>
        </button>

        <div style="position: relative">
          <input
            id="bc-box"
            ref="backColor"
            style="display: none"
            type="color"
            @input="
              editor.chain().focus().setBackColor($event.target.value).run()
            "
            :value="editor.getAttributes('textStyle').backgroundColor"
          />
        </div>
      </template>
    </menu-bar>

    <editor-content v-bind="$attrs" class="editor__content" :editor="editor" />

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
          <base-button type="text" @click="close"> لغو </base-button>
        </div>
      </template>
    </base-dialog>
  </div>
</template>

<script lang="ts" setup>
//@ts-nocheck
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import MenuBar from "./tiptap-menu.vue";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { BackColor } from "@/components/common/tiptap/extentions/backColor";

import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Table } from "@/components/common/tiptap/extentions/supercharged-table/extension-table";
import { TableCell } from "@/components/common/tiptap/extentions/supercharged-table/extension-table-cell";
import { TableHeader } from "@/components/common/tiptap/extentions/supercharged-table/extension-table-header";
import { TableRow } from "@/components/common/tiptap/extentions/supercharged-table/extension-table-row";
import { ref, onMounted, onUnmounted, watch } from "vue";
import { ResizableMedia } from "@/components/common/tiptap/extentions/resizableMedia";

const ns = useNamespace("tiptap");
const props = defineProps({
  content: {},
  placeholder: {
    type: String,
    default: "..",
  },
});
const emit = defineEmits(["update:modelValue"]);

defineOptions({
  inheritAttrs: false,
});

const show = ref(false);
const upload = ref(false);
const url = ref(null);
const editor = ref<any>(null);
const file = ref<any>(null);
const color = ref<any>(null);
const backColor = ref(null);

const showColorBox = () => {
  color.value.click();
};

const showBackColorBox = () => {
  backColor.value.click();
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
    .post("application/upload/editor", data)
    .then(({ data }) => {
      editor.value.commands.setMedia({
        src: data,
        "media-type": "img",
        alt: "Something else",
        title: "Something",
        width: "800",
        height: "400",
      });
    })
    .catch((error) => {});
};

onMounted(() => {
  editor.value = new Editor({
    extensions: [
      StarterKit.configure({
        history: true,
      }),
      ResizableMedia,
      BackColor,
      Image.configure({}),
      Link.configure({
        openOnClick: false,
      }),
      Table.configure({
        resizable: false,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Placeholder.configure({
        // emptyEditorClass: 'is-editor-empty',
        placeholder: props.placeholder,
      }),
      TextStyle,
      Highlight,
      Color,
    ],
    content: props.content,
    onUpdate: () => {
      emit("update:modelValue", editor.value.getHTML());
    },
  });
});
onUnmounted(() => {
  editor.value.destroy();
});

watch(
  () => props.content,
  (val, prevVal) => {
    editor.value.commands.setContent(val);
  }
);
</script>
