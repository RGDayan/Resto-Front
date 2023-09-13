import React from "react";
import HorizontalSeparator from "../separators/horizontal_separator";

export default function Title({content, subTitle}){
    return (
        <div>
            <h1 className={"text-lg font-semibold"}>{content}</h1>
            <HorizontalSeparator verticalMargin={""} horizontalMargin={"-mr-6"}/>
            <p className={"text-xs text-stone-400"}>{subTitle}</p>
        </div>
    )
}