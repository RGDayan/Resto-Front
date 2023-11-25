import {createSlice} from "@reduxjs/toolkit";
import {preparePropertyAction} from "../../controllers/formatters/reduxFormatter";

const initialState = {
    id: null,
    label: "",
    description: "",
    price: "",
    isHot: false,
    isFlambe: false,
    degree: "",
    type: "",
    cards: null,
    commands: null
}

const {actions, reducer} = createSlice({
    name: "product",
    initialState,
    reducers: {
        resetProduct: (draft) => {
            draft.id = null
            draft.label = ""
            draft.description = ""
            draft.price = ""
            draft.isHot = false
            draft.isFlambe = false
            draft.degree = ""
            draft.type = ""
            draft.cards = null
            draft.commands = null
        },
        setProduct: (draft, action) => {
            const payload = action.payload
            draft.id = payload.id
            draft.label = payload.label
            draft.description = payload.description
            draft.price = payload.price
            draft.isHot = payload.isHot
            draft.isFlambe = payload.isFlambe
            draft.degree = payload.degree
            draft.type = payload.type
            draft.cards = payload.cards
            draft.commands = payload.commands
        },
        setProductProperty: {
            prepare: (e) => ({
                payload: preparePropertyAction(e)
            }),
            reducer: (draft, action) => {
                draft[action.payload.name] = action.payload.value
            }
        },
    }
})

export const {
    resetProduct,
    setProduct,
    setProductProperty,
} = actions
export default reducer