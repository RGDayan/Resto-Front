import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectProduct, selectProductProduct} from "../../redux/selectors";
import {getProduct} from "../../query/productQuery";
import Title from "../divers/labels/title";
import LabelInput from "../divers/labels/label_input";

export default function ShowProduct({category}){
    const product = useSelector(selectProduct)
    const productProduct = useSelector(selectProductProduct)
    const dispatch = useDispatch()
    const { idProduct } = useParams()

    useEffect(() => {
        getProduct(dispatch, category, idProduct)
    }, [dispatch, idProduct])

    return (
        <div className={"p-3 w-1/2"}>
            <Title content={"Produit n°" + product.id + " : " + productProduct.label} />

            <div className={"space-y-3"}>
                <div>
                    <LabelInput name={"description"} label={"Description"} />
                    <p>{productProduct.description}</p>
                </div>
                <div>
                    <LabelInput name={"price"} label={"Prix"} />
                    <p>{productProduct.price}</p>
                </div>

                {
                    category === "starters" ?
                        <div>
                            <LabelInput name={"isHot"} label={"Entrée chaude"} />
                            <p>{product.isHot? "Oui": "Non"}</p>
                        </div>
                    :  category === "desserts" ?
                        <>
                            <div>
                                <LabelInput name={"isHot"} label={"Dessert chaud"} />
                                <p>{product.isHot? "Oui": "Non"}</p>
                            </div>
                            <div>
                                <LabelInput name={"isFlambe"} label={"Dessert flambé"} />
                                <p>{product.isFlambe? "Oui": "Non"}</p>
                            </div>
                        </>
                    : category === "beverages" ?
                        <>
                            <div>
                                <LabelInput name={"degree"} label={"Degré d'alcool"} />
                                <p>{product.degree}</p>
                            </div>
                            <div>
                                <LabelInput name={"type"} label={"Type de boisson"} />
                                <p>{product.type}</p>
                            </div>
                        </>
                        :""
                }
            </div>
        </div>
    )
}