import React from "react";
import LabelInput from "../labels/label_input";

export default function InputCheckbox({name, label, value, type = "checkbox", className, onChange}){

    return (
        <div className={"flex space-x-3"}>
            <LabelInput label={label} name={name} className={"self-center"} />
            <input name={name}
                   type={type}
                   checked={value}
                   className={"pl-1 bg-stone-200 outline-none " + className}
                   onChange={onChange}/>
        </div>
    )
}