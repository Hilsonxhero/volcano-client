// @ts-nocheck

import { defineStore } from "pinia";

export const useSoftwareStore = defineStore("software", () => {
    const project = ref({});
    const fetchProject = async (payload) => {
        try {
            const { data } = await useApiService.get(`application/software/projects/${payload}/show`);
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

