import { useAuthStore } from "@/modules/auth/store";


export default defineNuxtPlugin({
    name: 'my-plugin',
    enforce: 'default', // or 'post'
    async setup(nuxtApp) {
        const store = useAuthStore();
        await store.init()

    },
    hooks: {
        'vue:setup'() {
            const nuxtApp = useNuxtApp()
        }
    },

})



