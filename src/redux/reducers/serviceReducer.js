import {createSlice} from "@reduxjs/toolkit";
import dateFormat from "dateformat";
import {preparePropertyAction} from "../../controllers/formatters/reduxFormatter";

const initialState = {
    id: 0,
    openedDate: dateFormat(new Date(Date.now()), "yyyy-mm-dd HH:MM"),
    closedDate: "",
    plannedClosedDate: "",
    status: true,
    card: null,
    commands: null,
    message: ""
}

const {actions, reducer} = createSlice({
    name: "service",
    initialState,
    reducers: {
        resetService: (draft) => {
            draft.id = 0
            draft.openedDate = dateFormat(new Date(Date.now()), "yyyy-mm-dd HH:MM")
            draft.plannedClosedDate = ""
            draft.closedDate = ""
            draft.status = true
            draft.card = null
            draft.commands = null
            draft.message = ""
        },
        setService: (draft, action) => {
            const payload = action.payload
            draft.id = payload.id
            draft.openedDate = payload.openedDate
            draft.closedDate = payload.closedDate
            draft.plannedClosedDate = payload.plannedClosedDate
            draft.status = payload.status
            draft.card = payload.card
            draft.commands = payload.commands?.sort((a, b) => (a.numTable > b.numTable) ? 1: -1)
            draft.message = payload.message
        },
        setServiceProperty: {
            prepare: (e) => ({
                payload: preparePropertyAction(e)
            }),
            reducer: (draft, action) => {
                if (action.payload.value !== draft[action.payload.name])
                    draft[action.payload.name] = action.payload.value
            }
        },
        addServiceCard: (draft, action) => {
            draft.card = action.payload
            let openingTime = draft.card.openingTime
            let closingTime = draft.card.closingTime

            draft.openedDate =  dateFormat(new Date(Date.now()), "yyyy-mm-dd") + "T" + openingTime

            if (openingTime > closingTime){
                let dateNow = new Date(Date.now())
                dateNow.setDate(dateNow.getDate() + 1)
                draft.plannedClosedDate = dateFormat(dateNow, "yyyy-mm-dd") + "T" + closingTime
            }else {
                draft.plannedClosedDate = dateFormat(new Date(Date.now()), "yyyy-mm-dd") + "T" + closingTime
            }
        }
    }
})

export const {
    resetService,
    setService,
    setServiceProperty,
    addServiceCard} = actions;
export default reducer;