import React from "react";

export default function ContentWrapper({id = "", children = "", className = ""}){
    return (
        <div id={id} className={"w-1/2 p-3 pl-5 " + className}>
            {children}
        </div>
    )
}