// @ts-nocheck
import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
    const user = ref(null);
    const isLoggedIn = ref(false);
    const checked = ref(false);
    const errors = ref(null);
    const loggedIn = computed(() => isLoggedIn.value);

    const personalInfo = async () => {
        try {
            const { data } = await useApiService.get(`application/user/init`);
            user.value = data?.user;
        } catch (error) {
            return error;
        }
    };


    const init = async () => {
        if (!checked.value)
            try {
                const { data } = await useApiService.get(`application/user/init`);
                user.value = data?.user;
                isLoggedIn.value = data?.is_logged_in;
                checked.value = true;

                return data
            } catch (error) {
                return error;
            }
    };

    const login = async (form) => {
        try {
            checked.value = false;
            const { data } = await useApiService.post(`application/auth/otp/login`, form);
            isLoggedIn.value = true;
            return data;
        } catch (error) {
            return error;
        }

    };

    const authenticate = async (form) => {
        try {
            const { data } = await useApiService.post(`application/auth/otp/authenticate`, form);
            return data;
        } catch (error) {
            return error;
        }
    };

    const logout = async () => {
        try {
            checked.value = false;
            const { data } = await useApiService.post(`application/auth/logout`);
            user.value = null;
            isLoggedIn.value = false;
        } catch (error) {
            return error;
        }
    };

    return {
        user,
        isLoggedIn,
        personalInfo,
        checked,
        errors,
        init,
        login,
        authenticate,
        logout,
        loggedIn
    };
});
