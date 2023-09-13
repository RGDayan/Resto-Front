import React from "react";

export default function NumberSelect({name, defaultValue, values, onChange}){
    return (
        <div>
            <select name={name}
                    id={"select-" + name}
                    value={defaultValue}
                    className={"appearance-none outline-0"}
                    onChange={onChange}>
                {
                    values.map((h) => {
                        return (
                            <option key={name + "-" + h}
                                    value={h}>
                                {h}
                            </option>
                        )})
                }
            </select>
        </div>
    )
}