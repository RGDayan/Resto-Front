import {createSlice} from "@reduxjs/toolkit";
import {preparePropertyAction} from "../../controllers/formatters/reduxFormatter";

const initialState = {
    id: null,
    title: "",
    type: "",
    openingTime: "11:00",
    closingTime: "15:00",
    services: null,
    products: null
}

const {actions, reducer} = createSlice({
    name: "card",
    initialState,
    reducers: {
        setCard: (draft, action) => {
            const payload = action.payload
            draft.id = payload.id
            draft.title = payload.title
            draft.type = payload.type
            draft.openingTime = payload.openingTime
            draft.closingTime = payload.closingTime
            draft.services = payload.services
            draft.products = payload.products
        },
        setCardPropriete: {
            prepare: (e) => ({
                payload: preparePropertyAction(e)
            }),
            reducer: (draft, action) => {
                if (action.payload.value !== draft[action.payload.name])
                    draft[action.payload.name] = action.payload.value
            }
        },
        resetCard: (draft) => {
            draft.id = null
            draft.title = ""
            draft.type = ""
            draft.openingTime = "11:00"
            draft.closingTime = "15:00"
            draft.services = null
            draft.products = null
        }
    }
})

export const {
    setCard,
    setCardPropriete,
    resetCard
} = actions
export default reducer