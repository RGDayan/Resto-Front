import React from "react";
import LabelInput from "../labels/label_input";

export default function InputText({name, label, value, className, onChange}){

    return (
        <div className={"flex flex-col"}>
            <LabelInput label={label} name={name} />
            <input name={name}
                   type={"text"}
                   value={value}
                   className={"pl-1 bg-stone-200 outline-none " + className}
                   onChange={onChange}/>
        </div>
    )
}