import React from "react";

export default function HorizontalSeparator({horizontalMargin = "mx-5", verticalMargin = "my-2"}){
    return(
        <div className={horizontalMargin + " " + verticalMargin + " border-t border-stone-200 "}/>
    )
}