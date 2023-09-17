import React, {useEffect} from "react";
import {Outlet} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getProducts} from "../../query/productQuery";
import NavigationProducts from "./navigation_products";
import {resetProduct} from "../../redux/reducers/productReducer";

export default function Products({category}){
    const dispatch = useDispatch()

    useEffect(() => {
        getProducts(dispatch, category)
    }, []);

    return (
        <div>
            <NavigationProducts id={category}
                                url={"/products/" + category + "/create"}
                                onPlusClick={() => dispatch(resetProduct())} />
            <section>
                <Outlet />
            </section>
        </div>
    )
}