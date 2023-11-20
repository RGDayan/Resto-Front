import React, {useEffect} from "react";
import Title from "../../divers/labels/title";
import {useDispatch, useSelector} from "react-redux";
import {selectCard, selectCardProducts, selectProducts} from "../../../redux/selectors";
import {getProductsByCategory} from "../../../query/productQuery";
import GetImgByFormat from "../../../controllers/assets/imgcontroller";
import {updateCardProduct} from "../../../query/cardQuery";

export default function StepCardProducts({title, category}){
    const card = useSelector(selectCard)
    const products = useSelector(selectProducts)
    const cardProducts = useSelector(selectCardProducts)
    const dispatch = useDispatch()

    useEffect(() => {
        getProductsByCategory(dispatch, category)
    }, [dispatch, category]);

    return(
        <>
            <Title content={"Modification des " + title}
                   subTitle={"Ajoutez ou retirer des " + title + " de cette carte"}
                   className={"w-1/2"}/>

            <div className={"flex w-full justify-around mt-3"}>
                <div>
                    <h3 className={"text-xl font-semibold"}>{title[0].toUpperCase() + title.slice(1)} sur la carte</h3>
                    <table className={"max-h-150"}>
                        <thead>
                        <tr>
                            <td>Id</td>
                            <td className={"min-w-32"}>Label</td>
                            <td>Price</td>
                            <td className={"min-w-8"}></td>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            cardProducts?.map((product) => {
                                return (
                                    <tr key={product.id}
                                        className={"hover:bg-stone-300"}
                                        onDoubleClick={() => updateCardProduct(dispatch, card.id, product, "DELETE")}>
                                        <td>{product.id}</td>
                                        <td>{product.label}</td>
                                        <td>{product.price}</td>
                                        <td onClick={() => updateCardProduct(dispatch, card.id, product, "DELETE")}>
                                            <img src={GetImgByFormat("trash", 16)} alt={""}/>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>

                <div>
                    <h3 className={"text-xl font-semibold"}>{title[0].toUpperCase() + title.slice(1)}</h3>
                    <table className={"max-h-150"}>
                        <thead>
                        <tr>
                            <td></td>
                            <td>Id</td>
                            <td className={"min-w-32"}>Label</td>
                            <td>Price</td>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            products.data?.map((product) => {
                                if (cardProducts?.some((x) => x.id === product.id))
                                    return null;

                                return (
                                    <tr key={product.id}
                                        onDoubleClick={() => updateCardProduct(dispatch, card.id, product, "PUT")}>
                                        <td onClick={() => updateCardProduct(dispatch, card.id, product, "PUT")}>
                                            <img src={GetImgByFormat("plus_bright", 16)} alt=""/>
                                        </td>
                                        <td>{product.id}</td>
                                        <td>{product.label}</td>
                                        <td>{product.price}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}