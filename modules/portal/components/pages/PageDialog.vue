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
          <div class="sticky top-0 z-[999] justify-between items-center">
            <div class="flex justify-between items-center">
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
                      @input="
                        editor
                          .chain()
                          .focus()
                          .setColor($event.target.value)
                          .run()
                      "
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
                        editor
                          .chain()
                          .focus()
                          .setBackColor($event.target.value)
                          .run()
                      "
                      :value="editor.getAttributes('textStyle').backgroundColor"
                    />
                  </div>
                </template>
              </menu-bar>
              <div>
                <base-button type="primary" @click="handleSave()"
                  >ذخیره</base-button
                >
              </div>
            </div>
          </div>

          <div class="w-3/4 mx-auto mt-10">
            <base-form :model="form" ref="formRef" class="">
              <div class="mb-8 w-3/4">
                <base-form-item
                  :model="form"
                  prop="name"
                  :rules="[
                    {
                      required: true,
                      message: '  نام  الزامی می باشد',
                    },
                  ]"
                  label="نام"
                >
                  <input
                    v-model="form.name"
                    class="py-2 placeholder:text-base text-base placeholder:font-semibold font-semibold border-b border-gray-200 w-full"
                    placeholder="نام صفحه را وارد کنید (عنوانی که برای کاربران در منو نمایش داده می شود)"
                  />
                </base-form-item>
              </div>
              <div>
                <base-form-item
                  :model="form"
                  prop="title"
                  :rules="[
                    {
                      required: true,
                      message: '  عنوان  الزامی می باشد',
                    },
                  ]"
                  label="عنوان"
                >
                  <textarea
                    v-model="form.title"
                    class="py-2 placeholder:text-2xl text-2xl w-full resize-none"
                    placeholder="عنوان صفحه را وارد کنید"
                  ></textarea>
                </base-form-item>
              </div>

              <editor-content class="" :editor="editor" />
            </base-form>
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
                <base-button type="text" @click="close"> لغو </base-button>
              </div>
            </template>
          </base-dialog>
        </div>
      </div>

      <template #footer> </template>
    </base-dialog>
  </div>
</template>

<script setup lang="ts">
import { UPDATE_MODEL_EVENT } from "~/core/constants";
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@/components/common/tiptap/extentions";
import MenuBar from "@/components/common/tiptap/tiptap-menu.vue";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { BackColor } from "@/components/common/tiptap/extentions/backColor";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { BaseFormItem, BaseForm } from "@/components/base/form";
import BaseMessage from "@/components/base/message";
import { FormItemContext } from "~/core/tokens";
import { ResizableMedia } from "@/components/common/tiptap/extentions/resizableMedia";
import { Table } from "@/components/common/tiptap/extentions/supercharged-table/extension-table";
import { TableCell } from "@/components/common/tiptap/extentions/supercharged-table/extension-table-cell";
import { TableHeader } from "@/components/common/tiptap/extentions/supercharged-table/extension-table-header";
import { TableRow } from "@/components/common/tiptap/extentions/supercharged-table/extension-table-row";
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  selected: {
    type: Object,
  },
  page: {
    type: Object,
  },
});
const emits = defineEmits([
  UPDATE_MODEL_EVENT,
  "update:visible",
  "close",
  "create",
]);
const ns = useNamespace("tiptap");
const visible_create_page = ref(false);
const upload = ref<null | HTMLElement>(null);
const url = ref(null);
const editor = ref<any>(null);
const file = ref<any>(null);
const color = ref<any>(null);
const show = ref(false);
const project_id = ref(null);
const route = useRoute();
const formRef: Ref<FormItemContext | null> = ref(null);
const loader = ref(false);
const page_edit_mode = ref(false);
const backColor = ref(null);
const placeholder = ref(
  "آیا می دانستید که می توانید انواع چیزهای جالب مانند فهرست مطالب، تاریخ یا نقشه راه را به این صفحه اضافه کنید؟ برای باز کردن یک لیست، / را تایپ کنید"
);
const form = ref({
  title: "",
  name: null,
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
    // editor.value.commands.setContent(val);
  }
);

watch(
  () => props.page,
  (val) => {
    if (val) {
      page_edit_mode.value = true;
      form.value.title = val?.title;
      form.value.name = val?.name;
      form.value.content = val?.content;
      editor.value.commands.setContent(val?.content);
    }
  }
);

const handleCloseCreatePage = () => {
  form.value.title = "";
  form.value.name = "";
  form.value.content = "";
  page_edit_mode.value = false;
  emits("close", false);
};

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

const handleSave = () => {
  if (props.page) {
    handleUpdatePage();
  } else {
    handleCreatePage();
  }
};

const handleCreatePage = () => {
  formRef.value?.validate(async (valid: any): Promise<void> => {
    if (valid) {
      loader.value = true;
      try {
        const formData = {
          title: form.value.title,
          name: form.value.name,
          content: form.value.content,
          parent_id: props?.selected?.id,
          project_id: project_id.value,
        };
        const data = await useApiService.post(
          `application/portal/projects/${project_id.value}/pages`,
          formData
        );
        if (data.success) {
          BaseMessage({
            message: "ساخت  صفحه با موفقیت انجام شد!",
            type: "success",
            duration: 4000,
            center: true,
            offset: 20,
          });
          emits("create", true);
          form.value.title = null;
          handleCloseCreatePage();
        }

        loader.value = false;
      } catch (error) {
        loader.value = false;
      }
    } else {
    }
  });
};

const handleUpdatePage = () => {
  formRef.value?.validate(async (valid: any): Promise<void> => {
    if (valid) {
      loader.value = true;
      try {
        const formData = {
          title: form.value.title,
          name: form.value.name,
          content: form.value.content,
          parent_id: props?.page?.parent_id,
          project_id: project_id.value,
        };
        const data = await useApiService.patch(
          `application/portal/projects/${project_id.value}/pages/${props.page.id}`,
          formData
        );
        if (data.success) {
          BaseMessage({
            message: "ویرایش  صفحه با موفقیت انجام شد!",
            type: "success",
            duration: 4000,
            center: true,
            offset: 20,
          });
          emits("create", true);
          handleCloseCreatePage();
        }

        loader.value = false;
      } catch (error) {
        loader.value = false;
      }
    } else {
    }
  });
};

onMounted(() => {
  project_id.value = route.params.id;
  editor.value = new Editor({
    extensions: [
      StarterKit.configure({
        // history: true,
      }),
      ResizableMedia,
      BackColor,
      Image.configure({}),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
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
        placeholder: placeholder.value,
      }),
      TextStyle,
      Highlight,
      Color,
    ],
    content: form.value.content,
    onUpdate: () => {
      const isSame = editor.value.getHTML() === form.value.content;
      if (isSame) {
        return;
      } else {
        form.value.content = editor.value.getHTML();
      }
      // emits(UPDATE_MODEL_EVENT, editor.value.getHTML());
    },
  });
});

onUnmounted(() => {
  editor.value.destroy();
});
</script>

<style scoped></style>
