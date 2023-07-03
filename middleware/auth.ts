import { useAuthStore } from "@/modules/auth/store";

export default defineNuxtRouteMiddleware((to) => {
    const store = useAuthStore();
    if (!store.loggedIn) {
        return '/auth?backUrl=' + encodeURIComponent(to.fullPath)
    }
})
