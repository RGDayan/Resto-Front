import React from "react";
import LabelInput from "../labels/label_input";

export default function InputText({name, label, value, type = "text", className, onChange, autoFocus = false}){

    return (
        <div className={"flex flex-col"}>
            <LabelInput label={label} name={name} />
            <input name={name}
                   type={type}
                   value={value}
                   className={"pl-1 bg-stone-200 outline-none " + className}
                   onChange={onChange}
                   autoFocus={autoFocus}/>
        </div>
    )
}