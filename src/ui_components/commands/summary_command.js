import React from "react";
import {useSelector} from "react-redux";
import {selectCommand} from "../../redux/selectors";
import Title from "../divers/labels/title";
import HorizontalSeparator from "../divers/separators/horizontal_separator";

export default function SummaryCommand(){
    const command = useSelector(selectCommand)

    return (
        <div className={"min-w-52 p-2 text-sm"}>
            <Title content={"Récapitulatif"} underline={false}/>
            <HorizontalSeparator verticalMargin={"mb-2"} horizontalMargin={"mx-2"}/>
            <p>Table n° : {command.numTable}</p>
            <p>Couverts : {command.customerCount}</p>
            <HorizontalSeparator horizontalMargin={"mx-2"}/>

            {
                command.products?.map((product) => {
                    return <p key={"product-" + product.id}>{product.label}</p>
                })
            }
        </div>
    )
}