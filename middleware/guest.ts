import { useAuthStore } from "@/modules/auth/store";

export default defineNuxtRouteMiddleware(async (to) => {
    const store = useAuthStore();

    if (store.isLoggedIn) {
        // return '/user/profile'
        return '/portal/dashboard'
    }
})
