<template>
  <div>
    <ClientOnly>
      <CKEditor.component
        :editor="editor"
        v-model="content"
        :config="editorConfig"
      />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import ClassicEditor from "@/components/common/ckeditor/ckeditor";
import CKEditor from "@ckeditor/ckeditor5-vue";
import UploadAdapter from "@/components/common/ckeditor/uploader";
import { List } from "@ckeditor/ckeditor5-list";
import { Bold, Italic } from "@ckeditor/ckeditor5-basic-styles";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { Table, TableToolbar } from "@ckeditor/ckeditor5-table";
import { Heading } from "@ckeditor/ckeditor5-heading";
import { Link } from "@ckeditor/ckeditor5-link";
import {
  Image,
  ImageCaption,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  PictureEditing,
  ImageResizeEditing,
  ImageResizeHandles,
} from "@ckeditor/ckeditor5-image";
import { MediaEmbed } from "@ckeditor/ckeditor5-media-embed";
import { SimpleUploadAdapter } from "@ckeditor/ckeditor5-upload";
import { TextTransformation } from "@ckeditor/ckeditor5-typing";
import { Highlight } from "@ckeditor/ckeditor5-highlight";
import { Alignment } from "@ckeditor/ckeditor5-alignment";
import { CodeBlock } from "@ckeditor/ckeditor5-code-block";
import { Indent } from "@ckeditor/ckeditor5-indent";
import { BlockQuote } from "@ckeditor/ckeditor5-block-quote";
import {
  SpecialCharacters,
  SpecialCharactersEssentials,
} from "@ckeditor/ckeditor5-special-characters";
const editor = reactive(ClassicEditor);
const content = ref("");
// const ClassicEditor = require("@/components/common/ckeditor/ckeditor");
function SpecialCharactersEmoji(editor) {
  editor.plugins.get("SpecialCharacters").addItems(
    "Emoji",
    [
      { title: "smiley face", character: "😊" },
      { title: "rocket", character: "🚀" },
      { title: "wind blowing face", character: "🌬️" },
      { title: "floppy disk", character: "💾" },
      { title: "heart", character: "❤️" },
    ],
    { label: "Emoticons" }
  );
}

const editorConfig = ref({
  plugins: [
    List,
    Table,
    TableToolbar,
    Bold,
    Italic,
    Paragraph,
    Heading,
    Link,
    ImageUpload,
    Image,
    ImageResizeEditing,
    ImageResizeHandles,
    SimpleUploadAdapter,
    ImageToolbar,
    ImageStyle,
    PictureEditing,
    ImageCaption,
    MediaEmbed,
    TextTransformation,
    Highlight,
    Alignment,
    CodeBlock,
    Indent,
    BlockQuote,
    SpecialCharacters,
    SpecialCharactersEssentials,
    SpecialCharactersEmoji,
  ],
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "link",
    "image",
    "bulletedList",
    "numberedList",
    "blockQuote",
    "imageUpload",
    "|",
    "table",
    "insertTable",
    "highlight",
    "undo",
    "redo",
    "alignment",
    "codeBlock",
    "ImageToolbar",
    "ImageStyle",
    "resizeImage",
    "|",
    "outdent",
    "indent",
    "|",
    "blockQuote",
    "specialCharacters",
  ],
  simpleUpload: {
    uploadUrl: "http://localhost:8000/api/v1/application/upload/editor",
    withCredentials: true,
  },
  indentBlock: {
    offset: 1,
    unit: "em",
  },
  placeholder:
    "آیا می دانستید که می توانید انواع چیزهای جالب مانند فهرست مطالب، تاریخ یا نقشه راه را به این صفحه اضافه کنید؟ برای باز کردن یک لیست، / را تایپ کنید",
  image: {
    toolbar: [
      {
        name: "imageStyle:icons",
        title: "Alignment",
        items: [
          "imageStyle:alignRight",
          "imageStyle:alignCenter",
          "imageStyle:alignLeft",
        ],
        defaultItem: "imageStyle:alignCenter",
      },
      {
        name: "imageStyle:pictures",
        title: "Style",
        items: ["imageStyle:block", "imageStyle:side"],
        defaultItem: "imageStyle:block",
      },
      "|",
      "toggleImageCaption",
      "linkImage",
    ],
  },
  table: {
    contentToolbar: [
      "tableColumn",
      "tableRow",
      "mergeTableCells",
      "tableCellProperties",
      "tableProperties",
    ],
  },
  highlight: {
    options: [
      {
        model: "greenMarker",
        class: "marker-green",
        title: "Green marker",
        color: "var(--ck-highlight-marker-green)",
        type: "marker",
      },
      {
        model: "redPen",
        class: "pen-red",
        title: "Red pen",
        color: "var(--ck-highlight-pen-red)",
        type: "pen",
      },
    ],
  },

  // extraPlugins: [wwwww],
  heading: {
    options: [
      { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
      {
        model: "heading1",
        view: "h1",
        title: "Heading 1",
        class: "ck-heading_heading1",
      },
      {
        model: "heading2",
        view: "h2",
        title: "Heading 2",
        class: "ck-heading_heading2",
      },
    ],
  },
  language: {
    // The UI will be English.
    ui: "ar",

    // But the content will be edited in Arabic.
    content: "ar",
  },
});
</script>

<style scoped></style>
