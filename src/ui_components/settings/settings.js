import React from "react";
import NavigationButton from "../divers/navigations/bouton_navigation";
import {useDispatch} from "react-redux";
import {showMenu} from "../../redux/reducers/navigation";
import NavigationSettings from "./navigation_settings";
import {useNavigate} from "react-router-dom";

export default function Settings(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return(
        <div>
            <div className={"flex"}>
                <NavigationButton imgSrc={"home"}
                                  imgFormat={16}
                                  className={"w-fit h-fit p-2 rounded-md m-1"}
                                  onclick={() => navigate("/service")}/>
                <NavigationButton imgSrc={"settings"}
                                  imgFormat={16}
                                  className={"w-fit h-fit p-2 rounded-md m-1"}
                                  onclick={() => dispatch(showMenu())}/>
            </div>
            <NavigationSettings />
        </div>
    )
}