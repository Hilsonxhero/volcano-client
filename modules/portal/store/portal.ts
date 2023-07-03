// @ts-nocheck

import { defineStore } from "pinia";

export const usePortalStore = defineStore("portal", () => {
    const project = ref({});
    const fetchProject = async (payload) => {
        try {
            const { data } = await useApiService.get(`portal/projects/${payload}/show`);
            project.value = data;
            return data
        } catch (error) {
            return error;
        }
    };

    return {
        project,
        fetchProject
    };
});

