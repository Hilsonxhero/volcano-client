import { computed, inject, ref, unref } from 'vue'
import { formContextKey, formItemContextKey } from '@/core/tokens'
import { buildProp } from '@/utils'
import { componentSizes } from '@/core/constants'
import { useProp } from './useProp'
import type { ComponentSize } from '@/core/constants'
import type { MaybeRef } from '@vueuse/core'

export const useSizeProp = buildProp({
    type: String,
    values: componentSizes,
    required: false,
} as const)

export const useSize = (
    fallback?: MaybeRef<ComponentSize | undefined>,
    ignore: Partial<Record<'prop' | 'form' | 'formItem' | 'global', boolean>> = {}
) => {
    const emptyRef = ref(undefined)

    const size = ignore.prop ? emptyRef : useProp<ComponentSize>('size')
    const globalConfig = ignore.global ? emptyRef : useGlobalConfig('size')
    const form = ignore.form
        ? { size: undefined }
        : inject(formContextKey, undefined)
    const formItem = ignore.formItem
        ? { size: undefined }
        : inject(formItemContextKey, undefined)

    return computed(
        (): ComponentSize =>
            size.value ||
            unref(fallback) ||
            formItem?.size ||
            form?.size ||
            globalConfig.value ||
            ''
    )
}

export const useDisabled = (fallback?: MaybeRef<boolean | undefined>) => {
    const disabled = useProp<boolean>('disabled')
    const form = inject(formContextKey, undefined)
    return computed(
        () => disabled.value || unref(fallback) || form?.disabled || false
    )
}
