import React, {useEffect} from "react";
import {Outlet} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getProductsByCategory} from "../../query/productQuery";
import NavigationProducts from "./navigation_products";
import {resetProduct} from "../../redux/reducers/productReducer";

export default function Products({category}){
    const dispatch = useDispatch()

    useEffect(() => {
        getProductsByCategory(dispatch, category)
    }, [dispatch, category]);

    return (
        <div>
            <NavigationProducts category={category}
                                onPlusClick={() => dispatch(resetProduct())} />
            <section>
                <Outlet />
            </section>
        </div>
    )
}