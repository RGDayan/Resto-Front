import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectProduct} from "../../redux/selectors";
import {getProduct} from "../../query/productQuery";
import Title from "../divers/labels/title";
import LabelInput from "../divers/labels/label_input";

export default function ShowProduct({category}){
    const product = useSelector(selectProduct)
    const dispatch = useDispatch()
    const { idProduct } = useParams()

    useEffect(() => {
        getProduct(dispatch, category, idProduct)
    }, [dispatch, idProduct, category])

    return (
        <div className={"p-3 w-1/2"}>
            <Title content={"Produit n°" + product.id + " : " + product.label} />

            <div className={"space-y-3"}>
                <div>
                    <LabelInput name={"description"} label={"Description"} />
                    <p>{product.description}</p>
                </div>
                <div>
                    <LabelInput name={"price"} label={"Prix"} />
                    <p>{product.price}</p>
                </div>

                {
                    category === "starter" ?
                        <div>
                            <LabelInput name={"isHot"} label={"Entrée chaude"} />
                            <p>{product.isHot? "Oui": "Non"}</p>
                        </div>
                    :  category === "dessert" ?
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
                    : category === "beverage" ?
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