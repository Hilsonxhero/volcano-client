// @ts-nocheck
import { plugin as VueTippy } from 'vue-tippy'
import 'tippy.js/dist/tippy.css' // optional for styling
import 'tippy.js/animations/shift-toward-subtle.css'
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueTippy, {
        arrow: true,
        directive: 'tippy', // => v-tippy
        component: 'tippy', // => <tippy/>
        componentSingleton: 'tippy-singleton', // => <tippy-singleton/>,
        defaultProps: {
            theme: 'light',
            placement: 'top',
            allowHTML: true,
            trigger: 'click',
            delay: 100,
            animation: 'shift-toward-subtle',
            appendTo: () => document.querySelector('body')
        }, // => Global default options * see all props
    })

})