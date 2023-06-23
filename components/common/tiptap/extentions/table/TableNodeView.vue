<script setup lang="ts">
import {
  Editor,
  Node,
  NodeViewWrapper,
  NodeView,
  NodeViewContent,
} from "@tiptap/vue-3";
import { Decoration } from "prosemirror-view";

import { Node as ProseMirrorNode } from "prosemirror-model";

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
</script>

<template>
  <node-view-wrapper as="table" class="">
    <!-- <node-view-content> </node-view-content> -->
    <tippy :interactive="true">
      <table class="test" v-bind="node.attrs"></table>
      <template #content>
        <div>wwwwwwwww</div>
      </template>
    </tippy>
  </node-view-wrapper>
</template>
