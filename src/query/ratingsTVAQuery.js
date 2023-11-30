import {setRatings} from "../redux/reducers/ratingsTVAReducer";

export const getRatingsTVA = (dispatch) => {
    fetch(process.env.REACT_APP_URL_API_RESTO + "/ratingsTVA")
        .then(async (res) => {
            const resultat = await res.json()
            dispatch(setRatings(resultat))
        })
}