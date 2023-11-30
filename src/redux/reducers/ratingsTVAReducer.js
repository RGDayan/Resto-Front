import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    data: null,
    error: null,
}

const {actions, reducer} = createSlice({
    name: "ratingsTVA",
    initialState,
    reducers: {
        setRatings : (draft, action) => {
            if (action.payload?.error) {
                draft.error = action.payload
                draft.data = null
            } else {
                draft.error = null
                draft.data = action.payload
            }
        }
    }
})

export const {
    setRatings
} = actions

export default reducer