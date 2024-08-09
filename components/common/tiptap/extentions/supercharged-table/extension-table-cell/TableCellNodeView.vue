<script setup lang="ts">
import { Editor, Node, NodeViewContent, NodeViewWrapper } from "@tiptap/vue-3";
import { ref, onMounted, computed, watch } from "vue";
import { Node as ProseMirrorNode } from "prosemirror-model";
import { Decoration } from "prosemirror-view";

interface Props {
  editor: Editor;
  node: ProseMirrorNode;
  decorations: Decoration;
  selected: boolean;
  extension: Node<any, any>;
  getPos: () => number;
  updateAttributes: (attributes: Record<string, any>) => void;
  deleteNode: () => void;
}

const props = defineProps<Props>();

interface CellButton {
  name: string;
  action: (editor: Editor) => boolean;
  icon?: string;
}

const cellButtonsConfig: CellButton[] = [
  {
    name: "اضافه کردن به ردیف بالا",
    action: (editor) => editor.chain().focus().addRowBefore().run(),
    icon: "row-plus-before",
  },
  {
    name: "اضافه کردن به ردیف پایین",
    action: (editor) => editor.chain().focus().addRowAfter().run(),
    icon: "row-plus-after",
  },
  {
    name: "اضافه کردن ستون قبل",
    action: (editor) => editor.chain().focus().addColumnBefore().run(),
    icon: "column-plus-before",
  },
  {
    name: "اضافه کردن ستون بعد",
    action: (editor) => editor.chain().focus().addColumnAfter().run(),
    icon: "column-plus-after",
  },
  {
    name: "حذف ردیف",
    action: (editor) => editor.chain().focus().deleteRow().run(),
    icon: "row-remove",
  },
  {
    name: "حذف ستون",
    action: (editor) => editor.chain().focus().deleteColumn().run(),
    icon: "column-remove",
  },
  {
    name: "تغییر ردیف سرصفحه",
    action: (editor) => editor.chain().focus().toggleHeaderRow().run(),
    icon: "toogle-table-row",
  },
  {
    name: "تغییر ستون سرصفحه",
    action: (editor) => editor.chain().focus().toggleHeaderColumn().run(),
    icon: "toggle-table-column",
  },
  // {
  //   name: "Toggle header cell",
  //   action: (editor) => editor.chain().focus().toggleHeaderCell().run(),
  //   icon: "toggle-table-border",
  // },
  {
    name: "حذف جدول",
    action: (editor) => editor.chain().focus().deleteTable().run(),
    icon: "table-remove",
  },
];
const isCurrentCellActive = ref<Record<string, boolean>>({});

const calculateActiveSateOfCurrentCell = () => {
  const { from, to } = props.editor.state.selection;
  const nodeFrom = props.getPos();
  const nodeTo = nodeFrom + props.node.nodeSize;

  isCurrentCellActive.value = nodeFrom <= from && to <= nodeTo;
};

onMounted(() => {
  props.editor.on("selectionUpdate", calculateActiveSateOfCurrentCell);
  setTimeout(calculateActiveSateOfCurrentCell, 100);
});
</script>

<template>
  <node-view-wrapper as="td" class="relative">
    <NodeViewContent as="span" />
    <template v-if="isCurrentCellActive || selected">
      <tippy
        placement="right-start"
        trigger="click"
        :interactive="true"
        animation="shift-toward-subtle"
        class="trigger-button z-50"
      >
        <button type="button" :tabIndex="0" class="ml-1 mb-1">
          <nuxt-icon name="arrow-square-down" class=""></nuxt-icon>
        </button>

        <template #content>
          <section class="image-actions-container flex flex-col space-y-3">
            <button
              class="btn btn-sm btn-ghost image-action-button text-right"
              v-for="(action, index) in cellButtonsConfig"
              :key="index"
            >
              <div @click="() => action.action(editor)" class="text-right">
                <div>{{ action.name }}</div>
              </div>
            </button>
          </section>
        </template>
      </tippy>
    </template>
  </node-view-wrapper>
</template>

<style scoped lang="scss">
.dropdown {
  @apply bg-white w-52 z-50 -translate-x-2 rounded;

  .dropdown-content {
    @apply bg-white flex flex-col;

    .button {
      @apply flex gap-2 text-black py-1 px-2 w-full rounded items-center;

      &:hover {
        @apply bg-gray-100;
      }
    }
  }
}

.trigger-button {
  @apply absolute left-0 bottom-0 flex justify-center items-center  text-base  rounded cursor-pointer;
}
</style>
