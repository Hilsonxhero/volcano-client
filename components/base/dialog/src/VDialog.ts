import { buildProps, definePropType, isBoolean } from '@/utils'
import { UPDATE_MODEL_EVENT } from '@/core/constants'
import { dialogContentProps } from './VDialogContent'

import type { ExtractPropTypes } from 'vue'

type DoneFn = (cancel?: boolean) => void
export type DialogBeforeCloseFn = (done: DoneFn) => void

export const dialogProps = buildProps({
  ...dialogContentProps,
  appendToBody: {
    type: Boolean,
    default: true,
  },
  beforeClose: {
    type: definePropType<DialogBeforeCloseFn>(Function),
  },
  destroyOnClose: {
    type: Boolean,
    default: true,
  },
  closeOnClickModal: {
    type: Boolean,
    default: false,
  },
  closeOnPressEscape: {
    type: Boolean,
    default: false,
  },
  lockScroll: {
    type: Boolean,
    default: true,
  },
  modal: {
    type: Boolean,
    default: true,
  },
  openDelay: {
    type: Number,
    default: 0,
  },
  closeDelay: {
    type: Number,
    default: 0,
  },
  top: {
    type: String,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  modalClass: String,
  width: {
    type: [String, Number],
  },
  zIndex: {
    type: Number,
  },
  trapFocus: {
    type: Boolean,
    default: false,
  },
} as const)

export type DialogProps = ExtractPropTypes<typeof dialogProps>

export const dialogEmits = {
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  [UPDATE_MODEL_EVENT]: (value: boolean) => isBoolean(value),
  openAutoFocus: () => true,
  closeAutoFocus: () => true,
}
export type DialogEmits = typeof dialogEmits
