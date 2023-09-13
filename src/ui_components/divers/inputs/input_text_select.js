import React from "react";
import LabelInput from "../labels/label_input";

export default function InputTextSelect({label, name, value, values, onChange, className = ""}){
    return (
        <div className={"flex flex-col mt-2 " + className}>
            <LabelInput libelle={label} name={name} />
            <input name={name}
                   type={"text"}
                   value={value}
                   className={"pl-1 bg-stone-200 outline-none"}
                   onChange={onChange}/>
            {
                values?
                    <div>
                        <p className={"text-xs text-stone-300 "}>Ou sélectionnez un type existant</p>
                        <select name={name} value={value} onChange={onChange} className={"bg-stone-200"}>
                            {
                                values.map((val) => {
                                    return <option key={"option-" + name + "-" + val} value={val}>{val}</option>
                                })
                            }
                        </select>
                    </div>
                    : <></>
            }
        </div>
    )

}