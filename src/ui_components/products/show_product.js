import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectProduct} from "../../redux/selectors";
import {getProduct} from "../../query/productQuery";
import Title from "../divers/labels/title";
import LabelInput from "../divers/labels/label_input";
import ContentWrapper from "../divers/wrappers/content_wrapper";

export default function ShowProduct({category}){
    const product = useSelector(selectProduct)
    const dispatch = useDispatch()
    const { idProduct } = useParams()

    useEffect(() => {
        getProduct(dispatch, category, idProduct)
    }, [dispatch, idProduct, category])

    let productFields;

    switch (category){
        case "starter":
            productFields = <div>
                    <LabelInput name={"isHot"} label={"Entrée chaude"} />
                    <p>{product.isHot? "Oui": "Non"}</p>
                </div>
            break;
        case "dessert":
            productFields = <>
                <div>
                    <LabelInput name={"isHot"} label={"Dessert chaud"} />
                    <p>{product.isHot? "Oui": "Non"}</p>
                </div>
                <div>
                    <LabelInput name={"isFlambe"} label={"Dessert flambé"} />
                    <p>{product.isFlambe? "Oui": "Non"}</p>
                </div>
            </>
            break;
        case "beverage":
            productFields = <>
                <div>
                    <LabelInput name={"degree"} label={"Degré d'alcool"} />
                    <p>{product.degree}</p>
                </div>
                <div>
                    <LabelInput name={"type"} label={"Type de boisson"} />
                    <p>{product.type}</p>
                </div>
            </>
            break;
        default:
            productFields = <></>
            break;
    }

    return (
        <ContentWrapper>
            <Title content={"Produit n°" + product.id + " : " + product.label} />

            <div className={"space-y-3"}>
                <div>
                    <LabelInput name={"description"} label={"Description"} />
                    <p>{product.description}</p>
                </div>
                { productFields }

                <div className="flex w-full space-x-3">
                    <div>
                        <LabelInput name={"priceHT"} label={"Prix HT"} />
                        <p>{product.priceHT} €</p>
                    </div>
                    <div>
                        <LabelInput name={"ratingTVA"} label={"Taux de TVA"} />
                        <p>{product.ratingTVA.rating} %</p>
                    </div>
                    <div>
                        <LabelInput name={"partTVA"} label={"Part de TVA"} />
                        <p>{product.partTVA} €</p>
                    </div>
                    <div>
                        <LabelInput name={"priceTTC"} label={"Prix TTC"} />
                        <p>{product.priceTTC} €</p>
                    </div>
                </div>

            </div>
        </ContentWrapper>
    )
}