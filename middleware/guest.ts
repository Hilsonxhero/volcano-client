import { useAuthStore } from "@/modules/auth/store";

export default defineNuxtRouteMiddleware((to) => {
    const store = useAuthStore();
    if (store.isLoggedIn) {
        // return '/user/profile'
        return '/'
    }
})
