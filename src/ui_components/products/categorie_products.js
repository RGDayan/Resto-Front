import React from "react";
import NavigationButton from "../divers/navigations/navigation_button";
import {useNavigate} from "react-router-dom";

export default function CategorieProducts(){
    const navigate = useNavigate();

    const buttonClassName = "self-center p-10 w-64 border border-stone-200 shadow-lg shadow-stone-200 rounded-lg active:shadow-inner"
    const contentClassName = "justify-center w-full text-2xl font-bold "

    return (
        <div className={"flex flex-col justify-center h-full space-y-32"}>
            <div className={"flex justify-around"}>
                <NavigationButton id={"starters"}
                                  content={"Entrées"}
                                  className={buttonClassName}
                                  contentClassName={contentClassName}
                                  imgSrc={"starters"}
                                  imgFormat={32}
                                  alt={"starters_ico"}
                                  onClick={() => navigate("/products/starter")}/>
                <NavigationButton id={"dishes"}
                                  content={"Plats"}
                                  className={buttonClassName}
                                  contentClassName={contentClassName}
                                  imgSrc={"dishes"}
                                  imgFormat={32}
                                  alt={"dishes_ico"}
                                  onClick={() => navigate("/products/dish")}/>
            </div>
            <div className={"flex justify-around"}>
                <NavigationButton id={"desserts"}
                                  content={"Desserts"}
                                  onClick={() => navigate("/products/dessert")}
                                  className={buttonClassName}
                                  imgSrc={"desserts"}
                                  imgFormat={32}
                                  alt={"desserts_ico"}
                                  contentClassName={contentClassName} />
                <NavigationButton id={"beverages"}
                                  content={"Boissons"}
                                  onClick={() => navigate("/products/beverage")}
                                  className={buttonClassName}
                                  imgSrc={"beverages"}
                                  imgFormat={32}
                                  alt={"beverages_ico"}
                                  contentClassName={contentClassName}/>
            </div>
        </div>
    )
}