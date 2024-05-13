import { useAuthStore } from "@/modules/auth/store";

export default defineNuxtRouteMiddleware(async (to) => {
    const store = useAuthStore();
    await store.init()
    console.log("store", store.isLoggedIn);

    if (!store.loggedIn) {
        return '/auth?backUrl=' + encodeURIComponent(to.fullPath)
    }
})
