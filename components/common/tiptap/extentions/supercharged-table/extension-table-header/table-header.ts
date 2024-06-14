import { mergeAttributes, Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";

import TableCellNodeView from "../extension-table-cell/TableCellNodeView.vue";

export interface TableHeaderOptions {
  HTMLAttributes: Record<string, any>;
}
export const TableHeader = Node.create<TableHeaderOptions>({
  name: "tableHeader",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  content: "block+",

  addAttributes() {
    return {
      colspan: {
        default: 1,
      },
      rowspan: {
        default: 1,
      },
      colwidth: {
        default: null,
        parseHTML: (element) => {
          const colwidth = element.getAttribute("colwidth");
          const value = colwidth ? [parseInt(colwidth, 10)] : null;

          return value;
        },
      },
    };
  },

  tableRole: "header_cell",

  isolating: true,

  parseHTML() {
    return [{ tag: "th" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "th",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addNodeView() {
    return VueNodeViewRenderer(TableCellNodeView, {
      // as: "th",
      // className: "relative",
    });
  },
});
