import { isRef, watch } from 'vue'
import type { Ref } from 'vue'


export const useRestoreActive = (
    toggle: Ref<boolean>,
    initialFocus?: Ref<HTMLElement>
) => {
    let previousActive: HTMLElement
    watch(
        () => toggle.value,
        (val) => {
            if (val) {
                previousActive = document.activeElement as HTMLElement
                if (isRef(initialFocus)) {
                    initialFocus.value.focus?.()
                }
            } else {
                if (process.env.NODE_ENV === 'test') {
                    previousActive.focus.call(previousActive)
                } else {
                    previousActive.focus()
                }
            }
        }
    )
}
