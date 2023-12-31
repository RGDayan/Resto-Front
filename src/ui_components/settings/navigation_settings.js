import React from "react";
import NavigationButton from "../divers/navigations/navigation_button";
import {hideMenu} from "../../redux/reducers/navigationReducer";
import {useDispatch, useSelector} from "react-redux";
import {selectMenuVisibility, selectService} from "../../redux/selectors";
import HorizontalSeparator from "../divers/separators/horizontal_separator";
import {useNavigate} from "react-router-dom";
import {closeService} from "../../query/serviceQuery";

export default function NavigationSettings(){
    const service = useSelector(selectService)
    const isMenuVisible = useSelector(selectMenuVisibility)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let menuWidth = isMenuVisible? "w-full": "w-0"
    let navButtonClassName = "w-full text-center font-semibold p-2"

    return (
        <div className={"flex absolute top-0 h-screen overflow-y-hidden transition-all ease-out duration-300 " + menuWidth}>
            <nav className={"bg-white w-fit h-full text-left min-w-48"}>
                <NavigationButton className={navButtonClassName + " p-3"}
                                  onClick={() => dispatch(hideMenu())}
                                  content={"✕ Fermer"}/>
                <HorizontalSeparator verticalMargin={""}/>
                <NavigationButton className={navButtonClassName}
                                  onClick={() => {
                                      navigate("/service/create")
                                      dispatch(hideMenu())
                                  }}
                                  content={"Ouvrir un service"}/>
                <NavigationButton className={navButtonClassName}
                                  onClick={() => {
                                      closeService(dispatch, service)
                                      dispatch(hideMenu())
                                      navigate("/service")
                                  }}
                                  content={"Fermer un service"}/>
                <NavigationButton className={navButtonClassName}
                                  onClick={() => {
                                      navigate("/products")
                                      dispatch(hideMenu())
                                  }}
                                  content={"Produits"}/>
                <NavigationButton className={navButtonClassName}
                                  onClick={() => {
                                      navigate("/cards")
                                      dispatch(hideMenu())
                                  }}
                                  content={"Cartes"}/>
            </nav>
            <div className={"w-full h-screen bg-stone-500 bg-opacity-50"}
                 onClick={(() => dispatch(hideMenu()))}/>
        </div>
    )
}