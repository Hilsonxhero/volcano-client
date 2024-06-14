/* @unocss-include */

interface ResizableMediaAction {
  tooltip: string,
  icon: string

  action?: (updateAttributes: (o: Record<string, any>) => any) => void
  isActive?: (attrs: Record<string, any>) => boolean
  delete?: (d: () => void) => void
}

export const resizableMediaActions: ResizableMediaAction[] = [
  {
    tooltip: 'Align right',
    action: (updateAttributes) => updateAttributes({
      dataAlign: 'right',
      dataFloat: null,
    }),
    icon: "textalign-right",
    isActive: (attrs) => attrs.dataAlign === 'right'
  },
  {
    tooltip: 'Align center',
    action: (updateAttributes) => updateAttributes({
      dataAlign: 'center',
      dataFloat: null,
    }),
    icon: "textalign-center",
    isActive: (attrs) => attrs.dataAlign === 'center'
  },

  {
    tooltip: 'Align left',
    action: (updateAttributes) => updateAttributes({
      dataAlign: 'left',
      dataFloat: null,
    }),
    icon: "textalign-left",
    isActive: (attrs) => attrs.dataAlign === 'left'
  },
  {
    tooltip: 'Float right',
    action: (updateAttributes) => updateAttributes({
      dataAlign: null,
      dataFloat: 'right',
    }),
    icon: "textalign-justifyright",
    isActive: (attrs) => attrs.dataFloat === 'right'
  },
  {
    tooltip: 'Float left',
    action: (updateAttributes) => updateAttributes({
      dataAlign: null,
      dataFloat: 'left',
    }),
    icon: "textalign-justifyleft",
    isActive: (attrs) => attrs.dataFloat === 'left'
  },

  {
    tooltip: 'Delete',
    icon: "trash-outline",
    delete: (deleteNode) => deleteNode()
  }
]
