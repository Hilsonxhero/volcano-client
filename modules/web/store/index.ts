// @ts-nocheck
import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useWebStore = defineStore("web", () => {
    const variables = ref(null);


    const fetchVariables = async () => {
        try {
            const { data } = await useApiService.get(`application/setting/variables`);
            variables.value = data;
        } catch (error) {
            return error;
        }
    };

    return {
        variables,
        fetchVariables
    };
});
