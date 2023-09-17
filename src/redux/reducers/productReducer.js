import {createSlice} from "@reduxjs/toolkit";
import {preparePropertyAction} from "../../controllers/formatters/reduxFormatter";

const initialState = {
    id: null,
    isHot: false,
    isFlambe: false,
    degree: "",
    type: "",
    product: {
        id: null,
        label: "",
        description: "",
        price: "",
        cards: null,
        commands: null
    }
}

const {actions, reducer} = createSlice({
    name: "product",
    initialState,
    reducers: {
        resetProduct: (draft) => {
            draft.id = null
            draft.isHot = false
            draft.cooking = ""
            draft.isFlambe = false
            draft.degree = ""
            draft.type = ""
            draft.product.id = null
            draft.product.label = ""
            draft.product.description = ""
            draft.product.price = ""
            draft.product.cards = null
            draft.product.commands = null
        },
        setProduct: (draft, action) => {
            const payload = action.payload
            draft.id = payload.id
            draft.isHot = payload.isHot
            draft.cooking = payload.cooking
            draft.isFlambe = payload.isFlambe
            draft.degree = payload.degree
            draft.type = payload.type
            draft.product.id = payload.product.id
            draft.product.label = payload.product.label
            draft.product.description = payload.product.description
            draft.product.price = payload.product.price
            draft.product.cards = payload.product.cards
            draft.product.commands = payload.product.commands
        },
        setProductProductProperty: {
            prepare: (e) => ({
                payload: preparePropertyAction(e, 2)
            }),
            reducer: (draft, action) => {
                if (action.payload.value === ""
                    && action.payload.name === "price"
                    && !draft.product.price.includes("."))
                    draft.product.price = draft.product.price + ".00"
                else if (action.payload.value !== draft.product[action.payload.name])
                    draft.product[action.payload.name] = action.payload.value
            }
        },
        setProductProperty: {
            prepare: (e) => ({
                payload: preparePropertyAction(e, 1)
            }),
            reducer: (draft, action) => {
                if (action.payload.value !== draft[action.payload.name])
                    draft[action.payload.name] = action.payload.value
                if (action.payload.value === ""
                    && action.payload.name === "degree"
                    && !draft.product.price.includes("."))
                    draft.product.price = draft.product.price + ".0"
            }
        },
    }
})

export const {
    resetProduct,
    setProduct,
    setProductProductProperty,
    setProductProperty,
} = actions
export default reducer