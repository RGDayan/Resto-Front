import React from "react";
import GetImgByFormat from "../../../controllers/assets/imgcontroller";

export default function NavigationButton({id, onClick, content = "", imgSrc = "", imgFormat, alt = "", className, contentClassName, children}) {

    return (
        <div id={id}
            className={"flex justify-between p-1 " +
                "hover:bg-stone-200 active:bg-stone-300 transition-all duration-200 active:text-white " +
                className}
            onClick={onClick}>
            <div className={"flex w-full " + contentClassName}>
                {
                    imgSrc !== ""?
                        <img src={GetImgByFormat(imgSrc, imgFormat)}
                             alt={alt}
                             className={"h-fit w-fit p-1 self-center"}/>
                        :""
                }
                {content}
            </div>
            {children}
        </div>
    )
}