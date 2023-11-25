import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCommand} from "../../redux/selectors";
import Title from "../divers/labels/title";
import HorizontalSeparator from "../divers/separators/horizontal_separator";
import NavigationButton from "../divers/navigations/navigation_button";
import {addCommandProduct, reduceCommandProduct} from "../../query/commandQuery";

export default function SummaryCommand(){
    const command = useSelector(selectCommand)
    const dispatch = useDispatch()

    return (
        <div className={"h-full min-w-64 p-2 pr-0 text-sm"}>
            <Title content={"Récapitulatif"} underline={false}/>
            <HorizontalSeparator verticalMargin={"mb-2"} horizontalMargin={"mx-2"}/>
            <div>
                <p>Table n° : {command.numTable}</p>
                <p>Couverts : {command.customerCount}</p>
                <p>Total : {command.amount} €</p>
            </div>
            <HorizontalSeparator horizontalMargin={"mx-2"}/>

            <div className={"space-y-2 h-7/8 overflow-y-visible overflow-x-hidden"}>
                <Title content={"Entrées"}/>
                {displayCategoryByProduct(command, "starter", dispatch)}
                <Title content={"Plats"}/>
                {displayCategoryByProduct(command, "dish", dispatch)}
                <Title content={"Desserts"}/>
                {displayCategoryByProduct(command, "dessert", dispatch)}
                <Title content={"Boissons"}/>
                {displayCategoryByProduct(command, "beverage", dispatch)}
            </div>

        </div>
    )
}

function displayCategoryByProduct(command, category, dispatch) {
    return (
        <>
            {
                command.commandProducts?.filter(x => x.product.productType === category).map((commandProduct) => {
                    return <div key={"product-" + commandProduct.product.id}
                                className={"flex justify-between"}>
                        <p className={"self-center"}>{commandProduct.product.label}</p>
                        <div className={"relative flex justify-between min-w-24"}>
                            <NavigationButton imgSrc={"minus_blue"}
                                              imgFormat={16}
                                              className={"m-1 rounded-full"}
                                              onClick={() => reduceCommandProduct(dispatch, command, commandProduct.product)}/>
                            <p className={"self-center absolute w-full text-center -z-20"}>{commandProduct.quantity}</p>
                            <NavigationButton imgSrc={"plus_blue"}
                                              imgFormat={16}
                                              className={"m-1 rounded-full"}
                                              onClick={() => addCommandProduct(dispatch, command, commandProduct.product)}/>
                        </div>
                    </div>
                })
            }
        </>
    )
}