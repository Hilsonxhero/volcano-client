// @ts-nocheck

import { defineStore } from "pinia";

export const useBoardStore = defineStore("board", () => {
    const boards = ref({});
    const board_lists = ref([]);

    const fetchBoards = async (payload) => {
        try {
            const { data } = await useApiService.get(`application/portal/projects/${payload}/show`);
            boards.value = data;
            return data
        } catch (error) {
            return error;
        }
    };

    const fetchBoardLists = async (payload) => {
        try {
            const { data } = await useApiService.get(`application/portal/projects/board/${payload}/lists`);
            board_lists.value = data;
            return data
        } catch (error) {
            return error;
        }
    };

    const updateBoardList = async (payload) => {
        try {
            const selected_item = board_lists.value.findIndex((item, i) => item.id == payload.id)
            board_lists.value[selected_item].cards.push(payload.card)
        } catch (error) {
            return error;
        }
    };


    return {
        boards,
        board_lists,
        fetchBoardLists,
        fetchBoards,
        updateBoardList
    };
});

