import React from "react";
import NavigationButton from "../divers/navigations/navigation_button";
import {useDispatch} from "react-redux";
import {showMenu} from "../../redux/reducers/navigationReducer";
import NavigationSettings from "./navigation_settings";
import {useNavigate} from "react-router-dom";

export default function Settings(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return(
        <div className={"z-50"}>
            <div className={"flex"}>
                <NavigationButton imgSrc={"home"}
                                  imgFormat={16}
                                  className={"w-fit h-fit p-2 rounded-md m-1"}
                                  onClick={() => navigate("/")}/>
                <NavigationButton imgSrc={"dishes"}
                                  imgFormat={16}
                                  className={"w-fit h-fit p-2 rounded-md m-1"}
                                  onClick={() => navigate("/service")}/>
                <NavigationButton imgSrc={"settings"}
                                  imgFormat={16}
                                  className={"w-fit h-fit p-2 rounded-md m-1"}
                                  onClick={() => dispatch(showMenu())}/>
            </div>
            <NavigationSettings />
        </div>
    )
}