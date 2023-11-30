import {createSlice} from "@reduxjs/toolkit";
import {preparePropertyAction} from "../../controllers/formatters/reduxFormatter";

const initialState = {
    id: null,
    label: "",
    description: "",
    priceHT: "",
    ratingTVA: null,
    partTVA: "",
    priceTTC: "",
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
            draft.priceHT = ""
            draft.ratingTVA = {
                id: null,
                rating: null,
            }
            draft.partTVA = ""
            draft.priceTTC = ""
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
            draft.priceHT = payload.priceHT
            draft.ratingTVA = payload.ratingTVA
            draft.partTVA = payload.partTVA
            draft.priceTTC = payload.priceTTC
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
        setProductRatingTVA: (draft, action) => {
            const target = action.payload.nativeEvent.target
            draft.ratingTVA = {
                id: action.payload.target.value,
                rating : target[target.selectedIndex].text.replace(" %", "")
            }
        },
        setProductRatingTVARaw: (draft, action) => {
            draft.ratingTVA = action.payload
        }
    }
})

export const {
    resetProduct,
    setProduct,
    setProductProperty,
    setProductRatingTVA,
    setProductRatingTVARaw,
} = actions
export default reducer