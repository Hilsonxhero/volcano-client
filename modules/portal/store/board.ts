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
            const selected_list = board_lists.value.findIndex((item, i) => item.id == payload.id)
            const selected_card = board_lists.value[selected_list].cards.findIndex((card, j) => card.id == payload.row.id)
            board_lists.value[selected_list].cards[selected_card] = payload.row
        } catch (error) {
            return error;
        }
    };

    const addCard = async (payload) => {
        try {
            const selected_item = board_lists.value.findIndex((item, i) => item.id == payload.id)
            board_lists.value[selected_item].cards.push(payload.card)
        } catch (error) {
            return error;
        }
    };
    const addList = async (payload) => {
        try {
            board_lists.value.push(payload)
        } catch (error) {
            return error;
        }
    };
    const deleteList = async (payload) => {
        const selected_list_index = board_lists.value.findIndex((item, i) => item.id == payload.id)
        try {
            const data = await useApiService.remove(
                `application/portal/projects/board/${payload.board}/lists/${payload.id}`
            );
            board_lists.value.splice(selected_list_index, 1)
            return data
        } catch (error) {
            return error;
        }
    };
    return {
        boards,
        board_lists,
        fetchBoardLists,
        fetchBoards,
        updateBoardList,
        addCard,
        addList,
        deleteList
    };
});

