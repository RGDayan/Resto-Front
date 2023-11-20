import React from "react";
import LabelInput from "../labels/label_input";

export default function InputTime({name, label, type = "time", value, className, onChange, autoFocus = false}){
    return (
        <div className={"flex flex-col relative min-w-64 p-3 border border-stone-200 rounded-lg  " + className}>
            <LabelInput label={label} name={name} className={"absolute -top-3 left-3 bg-white"}/>
            <input name={name}
                   type={type}
                   value={value}
                   className={"self-center w-fit pl-1 outline-none"}
                   onChange={onChange}
                   autoFocus={autoFocus}/>
        </div>
    )
}