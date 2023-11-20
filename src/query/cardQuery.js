import {setCards} from "../redux/reducers/cardsReducer";
import {setCard} from "../redux/reducers/cardReducer";
import {setProducts} from "../redux/reducers/productsReducer";

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

export const getCardProductsByCategorie = (dispatch, id, category) => {
    fetch(process.env.REACT_APP_URL_API_RESTO + "/cards/" + id + "/products/" + category)
        .then(async (res) => {
            const resultat = await res.json()
            dispatch(setProducts(resultat))
        })
}

export const updateCardProduct = (dispatch, id, product, method) => {
    fetch(process.env.REACT_APP_URL_API_RESTO + "/cards/" + id + "/product/" + product.id, {
        method: method
    }).then(async (res) => {
        const resultat = await res.json()
        dispatch(setCard(resultat))
    })
}

export const deleteCard = (dispatch, id) => {
    fetch(process.env.REACT_APP_URL_API_RESTO + "/cards/" + id,
        {method: "DELETE"})
        .then(() => {
            getCards(dispatch)
        })
}