
const addResizeListener = (element: HTMLElement | null, fn: any): void => {
    if (element) {
        element.addEventListener("resize", fn);
    } else {
        window.addEventListener("resize", fn);
    }
};


const removeResizeListener = (element: HTMLElement | null, fn: any): void => {
    if (element) {
        element.removeEventListener("resize", fn);
    } else {
        window.removeEventListener("resize", fn);
    }
};

const setElementHieght = (target: HTMLElement, element: Window | null, height: number): void => {
    if (element) {
        target.style.height = `${element?.innerHeight - height}px`;
    } else {
        target.style.height = `${window.innerHeight - height}px`;
    }
};



export default { addResizeListener, removeResizeListener, setElementHieght };

