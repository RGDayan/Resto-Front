import {setProducts} from "../redux/reducers/productsReducer";
import {setProduct} from "../redux/reducers/productReducer";

export const getProducts = (dispatch) => {
    fetch(process.env.REACT_APP_URL_API_RESTO + "/products")
        .then(async (res) => {
            const results = await res.json()
            dispatch(setProducts(results))
        })
}

export const getProductsCategory = (dispatch, category) => {
    fetch(process.env.REACT_APP_URL_API_RESTO + "/products/" + category)
        .then(async (res) => {
            const results = await res.json()
            dispatch(setProducts(results))
        })
}

export const getProduct = (dispatch, category, id) => {
    fetch(process.env.REACT_APP_URL_API_RESTO + "/products/" + category + "/" + id)
        .then(async (res) => {
            const results = await res.json()
            dispatch(setProduct(results))
        })
}

export const deleteProduct = (dispatch, category, id) => {
    fetch(process.env.REACT_APP_URL_API_RESTO + "/products/" + category + "/" + id, {
        method: "DELETE"
    }).then(() => getProductsCategory(dispatch, category))
}