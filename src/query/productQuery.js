import {setProducts} from "../redux/reducers/productsReducer";
import {resetProduct, setProduct} from "../redux/reducers/productReducer";

export const getProducts = (dispatch) => {
    fetch(process.env.REACT_APP_URL_API_RESTO + "/products")
        .then(async (res) => {
            const results = await res.json()
            dispatch(setProducts(results))
        })
}

export const getProductsByCategory = (dispatch, category) => {
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

export const createProduct= (dispatch, category, method, product, navigate) => {
    fetch(process.env.REACT_APP_URL_API_RESTO + "/products/" + category, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    }).then(async (res) => {
        const resultat = await res.json()
        getProductsByCategory(dispatch, category)
        dispatch(resetProduct())
        navigate("/products/" + category + "/" + resultat.id)
    })
}

export const deleteProduct = (dispatch, category, id) => {
    fetch(process.env.REACT_APP_URL_API_RESTO + "/products/" + category + "/" + id, {
        method: "DELETE"
    }).then(() => getProductsByCategory(dispatch, category))
}