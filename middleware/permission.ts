import { useAuthStore } from "@/modules/auth/store";
import { storeToRefs } from "pinia";

export default defineNuxtRouteMiddleware((to) => {
    const store = useAuthStore();
    const { user } = storeToRefs(store);

    // const have_access = user.value.role.permission_names.some((permission) =>
    //     permissions.includes(permission)
    // );
})
