import React from "react";

export default function LabelInput({label, name, className = ""}){
    return (
        <label id={"label-" + name}
               className={"text-sm font-bold " + className}>
            {label}
        </label>
    )
}