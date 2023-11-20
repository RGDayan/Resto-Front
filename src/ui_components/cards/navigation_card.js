import React from "react";
import HorizontalSeparator from "../divers/separators/horizontal_separator";
import {Outlet, useNavigate} from "react-router-dom";
import NavigationButton from "../divers/navigations/navigation_button";
import DeleteCard from "./delete_card";
import {useSelector} from "react-redux";
import {selectCard} from "../../redux/selectors";

export default function NavigationCard(){
    const card = useSelector(selectCard)
    const navigate = useNavigate();

    return (
        <>
            <div className={"flex w-full p-1"}>
                <NavigationButton id={"show-card-button"}
                                  imgSrc={"visualize_bright"}
                                  imgFormat={16}
                                  alt={"show_ico"}
                                  className={"rounded-lg"}
                                  onClick={() => navigate("/cards/" + card.id + "/show")}/>

                <NavigationButton id={"update-card-button"}
                                  imgSrc={"pen"}
                                  imgFormat={16}
                                  alt={"update_ico"}
                                  className={"rounded-lg"}
                                  onClick={() => navigate("/cards/" + card.id + "/update")}/>

                <NavigationButton id={"add-card-product-button"}
                                  imgSrc={"desserts"}
                                  imgFormat={16}
                                  alt={"add_product_ico"}
                                  className={"rounded-lg"}
                                  onClick={() => navigate("/cards/" + card.id + "/add-products")}/>
                <DeleteCard />
            </div>
            <HorizontalSeparator horizontalMargin={"mr-5"} verticalMargin={""}/>
            <Outlet />
        </>
    )
}