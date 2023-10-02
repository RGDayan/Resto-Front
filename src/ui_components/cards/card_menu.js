import React from "react";
import NavigationButton from "../divers/navigations/navigation_button";
import DeleteCard from "./delete_card";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectCard} from "../../redux/selectors";

export default function CardMenu(){
    const card = useSelector(selectCard)
    const navigate = useNavigate();

    return (
        // CURRENT CARD MENU
        <div className={"flex w-fit p-1"}>
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
    )
}