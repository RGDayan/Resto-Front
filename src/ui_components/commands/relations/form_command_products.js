import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectCommand, selectProducts, selectServiceCard} from "../../../redux/selectors";
import LabelErreur from "../../divers/label_erreur";
import ContentWrapper from "../../divers/wrappers/content_wrapper";
import {getCardProductsByCategorie} from "../../../query/cardQuery";
import NavigationButton from "../../divers/navigations/navigation_button";
import InputToggle from "../../divers/inputs/input_toggle";
import {addCommandProduct} from "../../../query/commandQuery";

export default function FormCommandProducts(){
    const command = useSelector(selectCommand)
    const products = useSelector(selectProducts)
    const card = useSelector(selectServiceCard)
    const dispatch = useDispatch()
    const { category } = useParams()
    const [displayDescription, setDisplayDescription] = useState(false);

    useEffect(() => {
        getCardProductsByCategorie(dispatch, card.id,  category)
    }, [dispatch, category]);

    return (
        <ContentWrapper className={"w-full h-full pt-5"} >
            <InputToggle checked={false}
                         label={"Afficher les descriptions"}
                         className={"absolute top-0 right-0 m-2"}
                         labelClassName={"text-xs"}
                         onChange={() => setDisplayDescription((prev) => !prev)}/>
            {
                products.error?.status === 404 ?
                    <LabelErreur error={products.error?.message}
                                 className={"w-full text-center"}
                                 errorClassName={"font-semibold"}/>
                    : products.data?.map((product) => {
                        return <NavigationButton key={"product-" + product.id}
                                                 id={"product-" + product.id}
                                                 content={product.label}
                                                 className={"flex-col p-2 h-fit w-48 rounded-md bg-stone-100"}
                                                 contentClassName={"font-semibold text-lg"}
                                                 onClick={() => addCommandProduct(dispatch, command, product)}>
                            {
                                !displayDescription &&
                                <p className={"text-sm"}>{product.description}</p>
                            }
                            <p>{product.price} €</p>
                        </NavigationButton>
                    })
            }
        </ContentWrapper>
    )
}