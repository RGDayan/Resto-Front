import React from "react";
import LabelInput from "../../labels/label_input";
import NumberSelect from "./number_select";

export default function InputTimePicker({name, label, defaultValue, onChange}){
    const hours = []
    for (let i = 0; i < 24; i++) {
        if (i < 10)
            hours.push("0" + i)
        else
            hours.push(i)
    }

    const minutes =[]
    for (let i = 0; i < 60; i++) {
        if (i < 10)
            minutes.push("0" + i)
        else
            minutes.push(i)
    }

    return (
        <div className={"relative flex flex-col w-fit min-w-64 rounded-lg border border-stone-300"}>
            <LabelInput label={label}
                        name={name}
                        className={"absolute -top-3 left-3 bg-white px-3"}/>
            <div className={"flex justify-center py-3 text-lg"}>
                <NumberSelect name={"hour"}
                              defaultValue={defaultValue.split(":")[0]}
                              values={hours}
                              onChange={onChange}/>

                <p className={"px-1"}>:</p>
                <NumberSelect name={"minute"}
                              defaultValue={defaultValue.split(":")[1]}
                              values={minutes}
                              onChange={onChange}/>

            </div>
        </div>
    )
}