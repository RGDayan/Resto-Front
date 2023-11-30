import {createSlice} from "@reduxjs/toolkit";
import {preparePropertyAction} from "../../controllers/formatters/reduxFormatter";

const initialState = {
    id: 0,
    priceHT: null,
    priceTTC: null,
    numTable: "",
    customerCount: "",
    status: false,
    closingReason: "",
    createdAt: null,
    service: null,
    commandProducts: []
}

const {actions, reducer} = createSlice({
    name: "command",
    initialState,
    reducers: {
        resetCommand: (draft) => {
            draft.id = 0
            draft.priceHT = 0
            draft.priceTTC = 0
            draft.numTable = ""
            draft.customerCount = ""
            draft.status = false
            draft.closingReason = ""
            draft.createdAt = null
            draft.service = {}
            draft.commandProducts = []
        },
        setCommand: (draft, action) => {
            const payload = action.payload
            draft.id = payload.id
            draft.priceHT = payload.priceHT
            draft.priceTTC = payload.priceTTC
            draft.numTable = payload.numTable
            draft.customerCount = payload.customerCount
            draft.status = payload.status
            draft.closingReason = payload.closingReason
            draft.createdAt = payload.createdAt
            draft.service = payload.service
            draft.commandProducts = payload.commandProducts
        },
        setCommandProperty: {
            prepare: (e) => ({
                payload: preparePropertyAction(e)
            }),
            reducer: (draft, action) => {
                if (action.payload.value !== draft[action.payload.name])
                    draft[action.payload.name] = action.payload.value
            }
        },
        setServiceCommand: (draft, action) => {
            draft.service = action.payload
        },
    }
})

export const {
    setCommand,
    setCommandProperty,
    resetCommand,
    setServiceCommand
} = actions
export default reducer