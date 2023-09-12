import React from "react";
import GetImgByFormat from "../../../controllers/assets/imgcontroller";

export default function NavigationButton({id, onclick, content, imgSrc = "", imgFormat, alt, className, children}) {
    return (
        <div id={id}
            className={"flex justify-between p-1 " +
                "hover:bg-stone-100 active:bg-stone-300 transition duration-100 " +
                className}
            onClick={onclick}>
            <div className={"flex text-left"}>
                {
                    imgSrc !== ""?
                        <img src={GetImgByFormat(imgSrc, imgFormat)}
                             alt={alt}
                             className={"h-fit w-fit p-1"}/>
                        :""
                }
                {content}
            </div>
            {children}
        </div>
    )
}