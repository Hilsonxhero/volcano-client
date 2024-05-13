import { useAuthStore } from "@/modules/auth/store";

export default defineNuxtRouteMiddleware(async (to) => {
    const store = useAuthStore();
    await store.init()
    if (store.isLoggedIn) {
        // return '/user/profile'
        return '/portal/dashboard'
    }
})
