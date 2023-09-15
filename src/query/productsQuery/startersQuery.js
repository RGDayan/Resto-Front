import {setProducts} from "../../redux/reducers/productsReducer";

export const getStarters = (dispatch) => {
    fetch(process.env.REACT_APP_URL_API_RESTO + "/products/starters")
        .then(async (res) => {
            dispatch(setProducts(await res.json()))
        })
}