import React from "react";
import {useSelector} from "react-redux";
import {selectCardProducts} from "../../../redux/selectors";
import Title from "../../divers/labels/title";

export default function ShowCardProducts(){
    const products = useSelector(selectCardProducts)

    return (
        <div className={"w-1/2 p-3"}>
            <Title content={"Produits de cette carte"}
                   subTitle={"Ces produits seront affichés lors des services correspondants à cette carte"}
                   className={"w-64"}
            />

            <table className={"w-full mr-2 mt-3"}>
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Label</td>
                        <td>Prix</td>
                    </tr>
                </thead>
                <tbody className={"overflow-y-auto"}>
                    {
                        products?.map((product) => {
                            return <tr key={"product-" + product.id}>
                                <td>{product.id}</td>
                                <td>{product.label}</td>
                                <td>{product.price}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>

        </div>
    )
}