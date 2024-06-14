// @ts-nocheck

import { defineStore } from "pinia";

export const useBoardStore = defineStore("board", () => {
    const board = ref({});
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

    const fetchBoard = async (payload) => {
        try {
            const { data } = await useApiService.get(`application/portal/projects/${payload.project}/boards/${payload.id}`);
            board.value = data;
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

    const moveCard = async (payload) => {

        try {

            let selected_list = board_lists.value.findIndex((item, i) => item.id == payload.id)
            board_lists.value[selected_list].cards.unshift(payload.card)
            let selected_list_index = board_lists.value.findIndex((item, i) => item.id == payload.card?.board_list_id)
            let removed_card_index = board_lists.value[selected_list_index].cards.findIndex((card, k) => card.id == payload.card?.id)
            board_lists.value[selected_list_index].cards.splice(removed_card_index, 1)

        } catch (error) {
            return error;
        }

    }

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
        const selected_list_index = board_lists.value.findIndex((item, i) => item.id == payload.list)
        try {
            const data = await useApiService.remove(
                `application/portal/projects/board/${payload.board}/lists/${payload.list}`
            );
            board_lists.value.splice(selected_list_index, 1)
            return data
        } catch (error) {
            return error;
        }
    };

    const deleteCard = async (payload) => {
        const selected_list_index = board_lists.value.findIndex((item, i) => item.id == payload.list)
        const selected_card_index = board_lists.value[selected_list_index].cards.findIndex((card_item, i) => card_item.id == payload.card)
        try {
            const data = await useApiService.remove(
                `application/portal/projects/board/list/${payload.list}/cards/${payload.card}`
            );
            board_lists.value[selected_list_index].cards.splice(selected_card_index, 1)
            return data
        } catch (error) {
            return error;
        }
    };

    const updateBoardMembers = async (payload) => {
        try {
            board.value.members = payload
        } catch (error) {
            return error;
        }
    };

    const updateBoard = async (payload) => {
        try {
            board.value = payload
            return board.value
        } catch (error) {
            return error;
        }
    };

    const updateList = async (payload) => {
        try {
            const selected_list = board_lists.value.findIndex((item, i) => item.id == payload.id)
            board_lists.value[selected_list] = payload
            return true
        } catch (error) {
            return error;
        }
    };


    return {
        boards,
        board_lists,
        moveCard,
        fetchBoardLists,
        fetchBoards,
        updateBoardList,
        addCard,
        addList,
        deleteList,
        deleteCard,
        fetchBoard,
        board,
        updateBoardMembers,
        updateBoard,
        updateList
    };
});

