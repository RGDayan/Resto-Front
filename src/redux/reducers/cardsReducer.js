import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    data: null,
    error: null
}

const {actions, reducer} = createSlice({
    name: "cards",
    initialState,
    reducers: {
        setCards: (draft, actions) => {
            if (actions.payload?.error) {
                draft.error = actions.payload
                draft.data = null
            } else {
                draft.error = null
                draft.data = actions.payload
            }
        }
    }
})

export const { setCards } = actions;
export default reducer;