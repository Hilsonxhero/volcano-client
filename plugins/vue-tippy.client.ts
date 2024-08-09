// @ts-nocheck
import { plugin as VueTippy } from 'vue-tippy'
import 'tippy.js/dist/tippy.css' // optional for styling
import 'tippy.js/themes/light.css'
import 'tippy.js/animations/shift-toward-subtle.css'
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueTippy, {
        arrow: false,
        directive: 'tippy',
        component: 'tippy',
        componentSingleton: 'tippy-singleton',
        defaultProps: {
            theme: 'light',
            allowHTML: true,
            trigger: 'click',
            delay: 50,
            animation: 'shift-toward-subtle',
            appendTo: () => document.querySelector('body')
        },
    })

})