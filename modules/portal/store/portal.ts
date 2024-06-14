// @ts-nocheck

import { defineStore } from "pinia";

export const usePortalStore = defineStore("portal", () => {
    const project = ref({});
    const portal_project_id = ref(null);

    const fetchProject = async (payload) => {
        try {
            const { data } = await useApiService.get(`application/portal/projects/${payload}/show`);
            project.value = data;
            return data
        } catch (error) {
            return error;
        }
    };

    const setProjectId = async (payload) => {
        try {
            portal_project_id.value = payload;
            return payload
        } catch (error) {
            return error;
        }
    };

    return {
        project,
        portal_project_id,
        fetchProject,
        setProjectId
    };
});

