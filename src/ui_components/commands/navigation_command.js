import React from "react";
import NavigationButton from "../divers/navigations/navigation_button";
import {useNavigate} from "react-router-dom";
import {resetCommand} from "../../redux/reducers/commandReducer";
import {useDispatch} from "react-redux";

export default function NavigationCommand(){
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <div className="absolute top-0 left-0 flex p-0.5 space-x-2">
            <NavigationButton id={"back-button"}
                              className={"rounded-md"}
                              imgSrc={"back_arrow_bright"}
                              imgFormat={16}
                              onClick={() => navigate(-1)}/>
            <NavigationButton id={"create-button"}
                              className={"rounded-md"}
                              imgSrc={"plus_bright"}
                              imgFormat={16}
                              onClick={() => {
                                  dispatch(resetCommand())
                                  navigate("/service/commands/create")
                              }}/>
        </div>
    )
}