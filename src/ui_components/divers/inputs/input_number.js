import React from "react";
import LabelInput from "../labels/label_input";

export default function InputNumber({name, label, value, onChange, className = "", readOnly = false, autoFocus = false}){

    return (
        <div className={"flex flex-col"}>
            <LabelInput label={label} name={name} />
            <input name={name}
                   type={"number"}
                   value={value}
                   className={"pl-1 bg-stone-200 outline-none " + className}
                   onChange={onChange}
                   readOnly={readOnly}
                   autoFocus={autoFocus}/>
        </div>
    )
}