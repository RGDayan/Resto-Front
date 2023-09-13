import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isMenuVisible : false
}

const {actions, reducer} = createSlice({
    name: "navigation",
    initialState,
    reducers: {
        showMenu: (draft) => {
            draft.isMenuVisible = true
        },
        hideMenu: (draft) => {
            draft.isMenuVisible = false
        }
    }
})

export const {
    showMenu,
    hideMenu
} = actions;
export default reducer;