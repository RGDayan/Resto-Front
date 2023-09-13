import {createSlice} from "@reduxjs/toolkit";

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
    initialState: initialState,
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
                payload: {
                    name: e.target.name,
                    value: e.target.value
                }
            }),
            reducer: (draft, action) => {
                if (action.payload.value !== draft[action.payload.name]) {
                    draft[action.payload.name] = action.payload.value
                    console.log(draft[action.payload.name])
                }
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
        },
        setTime: (draft, action) => {
            console.log(draft[action.payload.propToChange])

            switch (action.payload.numeric){
                case "hour":
                    draft[action.payload.propToChange] = action.payload.value + ":" + draft[action.payload.propToChange].split(":")[1]
                    break
                case "minute":
                    draft[action.payload.propToChange] = draft[action.payload.propToChange].split(":")[0] + ":" + action.payload.value
                    break
                default:
                    break
            }

            console.log(draft[action.payload.propToChange], action.payload.propToChange)
        }

    }
})

export const {
    setCard,
    setCardPropriete,
    resetCard,
    setTime
} = actions
export default reducer