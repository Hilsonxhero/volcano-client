import { useAuthStore } from "@/modules/auth/store";

export default defineNuxtPlugin((nuxtApp) => {
    if (process.server) {
        const store = useAuthStore();
        return store.init()
    }


})


