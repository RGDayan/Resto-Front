import React from "react";
import HorizontalSeparator from "../separators/horizontal_separator";

export default function Title({content, subTitle="", className, underline = true}){
    return (
        <div className={className}>
            <h1 className={"text-lg font-semibold"}>{content}</h1>
            {
                underline?
                    <HorizontalSeparator verticalMargin={""} horizontalMargin={"-mr-6"}/>
                    :<></>
            }
            {
                subTitle === ""?
                    <></>
                    :<p className={"text-xs text-stone-400"}>{subTitle}</p>
            }
        </div>
    )
}