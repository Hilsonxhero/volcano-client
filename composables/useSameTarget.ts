import { NOOP } from '@vue/shared'

export const useSameTarget = (handleClick?: (e: MouseEvent) => void) => {
    if (!handleClick) {
        return { onClick: NOOP, onMousedown: NOOP, onMouseup: NOOP }
    }

    let mousedownTarget = false
    let mouseupTarget = false

    const onClick = (e: MouseEvent) => {
        // if and only if
        if (mousedownTarget && mouseupTarget) {
            handleClick(e)
        }
        mousedownTarget = mouseupTarget = false
    }

    const onMousedown = (e: MouseEvent) => {
        // marking current mousedown target.
        mousedownTarget = e.target === e.currentTarget
    }
    const onMouseup = (e: MouseEvent) => {
        // marking current mouseup target.
        mouseupTarget = e.target === e.currentTarget
    }

    return { onClick, onMousedown, onMouseup }
}
