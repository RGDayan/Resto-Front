import React from "react";
import {useOutletContext} from "react-router-dom";
import NavigationButton from "../divers/navigations/bouton_navigation";

export default function ListProducts(){
    const {products} = useOutletContext()

    return (
        <div className={"flex flex-wrap w-full h-full p-6"}>
            {
                products?.map((product) => {
                    return <NavigationButton key={product.id}
                                             id={"show-product-" + product.id}
                                             content={product.label}/>
                })
            }
        </div>
    )
}