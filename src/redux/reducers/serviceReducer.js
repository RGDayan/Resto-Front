import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    id: 0,
    date_ouverture: null,
    date_fermeture: null,
    chiffre_affaires: 0,
    nb_commandes: 0,
    status: null
}

const {actions, reducer} = createSlice({
    name: "service",
    initialState,
    reducers: {
        setService: (draft, action) => {
            draft.id = action.payload.id
            draft.date_ouverture = action.payload.date_ouverture
            draft.date_fermeture = action.payload.date_fermeture
            draft.chiffre_affaires = action.payload.chiffre_affaires
            draft.nb_commandes = action.payload.nb_commandes
            draft.status = action.payload.status
        }
    }
})

export const { setService } = actions;
export default reducer;