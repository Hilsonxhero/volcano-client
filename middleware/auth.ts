import { useAuthStore } from "@/modules/auth/store";

export default defineNuxtRouteMiddleware(async (to) => {
    const store = useAuthStore();

    if (process.server) {
        console.log("store", store.user);

        if (!store.isLoggedIn) {
            return '/auth?backUrl=' + encodeURIComponent(to.fullPath)
        }
    }

})
