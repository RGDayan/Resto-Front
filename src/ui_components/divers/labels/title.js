import React from "react";
import HorizontalSeparator from "../separators/horizontal_separator";

export default function Title({content, subTitle="", className, underline = true, separatorMargin = "-mr-6"}){
    return (
        <div className={className}>
            <h1 className={"text-lg font-semibold"}>{content}</h1>
            {
                underline?
                    <HorizontalSeparator verticalMargin={""} horizontalMargin={separatorMargin}/>
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