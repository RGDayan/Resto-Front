import {setCards} from "../redux/reducers/cardsReducer";
import {setCard} from "../redux/reducers/cardReducer";

export const getCards = (dispatch) => {
    fetch(process.env.REACT_APP_URL_API_RESTO + "/cards")
        .then(async (res) => {
            const resultat = await res.json()
            dispatch(setCards(resultat))
        })
}

export const getCard = (dispatch, id) => {
    fetch(process.env.REACT_APP_URL_API_RESTO + "/cards/" + id)
        .then(async (res) => {
            const resultat = await res.json()
            dispatch(setCard(resultat))
        })
}