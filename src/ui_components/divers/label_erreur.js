import React from "react";

export default function LabelErreur({error, solution, className, errorClassName, solutionClassName, imgSrc, imgAlt, imgPosition = "w-full flex justify-center"}){
    return (
        <div className={"w-fit " + className}>
            {
                imgSrc ?
                    <div className={imgPosition}>
                        <img src={imgSrc} alt={imgAlt}/>
                    </div>
                    :<></>
            }
            <p className={"text-red-500 " + errorClassName}>{error}</p>
            <p className={solutionClassName}>{solution}</p>
        </div>
    )
}