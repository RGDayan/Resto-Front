import React from "react";
import NavigationButton from "../divers/navigations/bouton_navigation";
import {hideMenu} from "../../redux/reducers/navigation";
import {useDispatch, useSelector} from "react-redux";
import {selectMenuVisibility} from "../../redux/selectors";
import HorizontalSeparator from "../divers/separators/horizontal_separator";
import {useNavigate} from "react-router-dom";

export default function NavigationSettings(){
    const isMenuVisible = useSelector(selectMenuVisibility);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let menuWidth = isMenuVisible? "w-full": "w-0"
    let navButtonClassName = "w-full text-center font-semibold p-2"
    return (
        <div className={"flex absolute top-0 h-screen overflow-y-hidden transition-all ease-out duration-300 " + menuWidth}>
            <nav className={"bg-white w-fit h-screen text-left min-w-48"}>
                <NavigationButton className={navButtonClassName + " p-3"}
                                  onclick={() => dispatch(hideMenu())}
                                  content={"✕ Fermer"}/>
                <HorizontalSeparator verticalMargin={""}/>
                <NavigationButton className={navButtonClassName}
                                  onclick={() => {
                                      navigate("/open-service")
                                      dispatch(hideMenu())
                                  }}
                                  content={"Ouvrir un service"}/>
                <NavigationButton className={navButtonClassName}
                                  onclick={() => {
                                      navigate("/cards")
                                      dispatch(hideMenu())
                                  }}
                                  content={"Cartes"}/>
                <NavigationButton className={navButtonClassName}
                                  onclick={() => {
                                      navigate("/products")
                                      dispatch(hideMenu())
                                  }}
                                  content={"Produits"}/>
            </nav>
            <div className={"w-full h-screen bg-stone-500 bg-opacity-50"}
                 onClick={(() => dispatch(hideMenu()))}/>
        </div>
    )
}