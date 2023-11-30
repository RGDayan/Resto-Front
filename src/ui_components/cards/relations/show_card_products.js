import React from "react";
import {useSelector} from "react-redux";
import {selectCardProducts} from "../../../redux/selectors";
import Title from "../../divers/labels/title";
import ContentWrapper from "../../divers/wrappers/content_wrapper";

export default function ShowCardProducts({isTitleVisible = true}){
    const products = useSelector(selectCardProducts)

    return (
        <ContentWrapper className={"w-full"}>
            {
                isTitleVisible &&
                <Title content={"Produits de cette carte"}
                       subTitle={"Ces produits seront affichés lors des services correspondants à cette carte"}
                       className={"w-64"}/>
            }

            <table className={"w-full mr-2 mt-3"}>
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Label</td>
                        <td>Prix HT</td>
                        <td>Taux TVA</td>
                        <td>Part TVA</td>
                        <td>Prix TTC</td>
                    </tr>
                </thead>
                <tbody className={"overflow-y-auto"}>
                    {
                        products?.map((product) => {
                            return <tr key={"card-product-" + product.id}>
                                <td>{product.id}</td>
                                <td>{product.label}</td>
                                <td>{product.priceHT} €</td>
                                <td>{product.ratingTVA.rating} %</td>
                                <td>{product.partTVA} €</td>
                                <td className={"font-bold"}>{product.priceTTC} €</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>

        </ContentWrapper>
    )
}