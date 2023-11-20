import {createSlice} from "@reduxjs/toolkit";
import {preparePropertyAction} from "../../controllers/formatters/reduxFormatter";

const initialState = {
    id: 0,
    amount: null,
    numTable: "",
    customerCount: "",
    status: false,
    createdAt: null,
    service: null,
    products: []
}

const {actions, reducer} = createSlice({
    name: "command",
    initialState,
    reducers: {
        resetCommand: (draft) => {
            draft.id = 0
            draft.amount = 0
            draft.numTable = ""
            draft.customerCount = ""
            draft.status = false
            draft.createdAt = null
            draft.service = null
            draft.products = []
        },
        setCommand: (draft, action) => {
            const payload = action.payload
            draft.id = payload.id
            draft.amount = payload.amount
            draft.numTable = payload.numTable
            draft.customerCount = payload.customerCount
            draft.status = payload.status
            draft.createdAt = payload.createdAt
            draft.service = payload.service
            draft.products = payload.products
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