import { buttonProps } from './VButton'

import type { ExtractPropTypes } from 'vue'
import type buttonGroup from './button-group.vue'

export const buttonGroupProps = {
  size: buttonProps.size,
  type: buttonProps.type,
} as const
export type ButtonGroupProps = ExtractPropTypes<typeof buttonGroupProps>

export type ButtonGroupInstance = InstanceType<typeof buttonGroup>
