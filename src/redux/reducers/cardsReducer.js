import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    data: null,
    error: null
}

const {actions, reducer} = createSlice({
    name: "cards",
    initialState,
    reducers: {
        setCards: (draft, action) => {
            if (action.payload?.error) {
                draft.error = action.payload
                draft.data = null
            } else {
                draft.error = null
                draft.data = action.payload
            }
        },
    }
})

export const {
    setCards
} = actions;
export default reducer;