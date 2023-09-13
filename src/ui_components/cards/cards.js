import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCards} from "../../redux/selectors";
import VerticalSeparator from "../divers/separators/vertical_separator";
import NavigationButton from "../divers/navigations/bouton_navigation";
import LabelErreur from "../divers/label_erreur";
import HorizontalSeparator from "../divers/separators/horizontal_separator";
import {Outlet, useNavigate} from "react-router-dom";
import {resetCard} from "../../redux/reducers/cardReducer";

export default function Cards(){
    const cards = useSelector(selectCards);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="flex">
            <nav className={"bg-white w-fit h-screen text-left min-w-32 max-w-48"}>
                <NavigationButton id={"create-card-button"}
                                  content={"Créer une carte"}
                                  imgSrc={"plus_bright"}
                                  imgFormat={"16"}
                                  className={"p-2"}
                                  onclick={() => {
                                      dispatch(resetCard())
                                      navigate("/cards/create-card")
                                  }}/>
                <HorizontalSeparator verticalMargin={cards.error?.status === 404? "mb-3": ""}/>
                {
                    cards.error?.status === 404 ?
                        <LabelErreur error={cards.error.message}
                                     errorClassName={"text-center"} />:
                        cards.data?.map((card) => {
                            return <NavigationButton key={"card-" + card.id}
                                                     id={"card-" + card.id}
                                                     content={card.title} />
                        })
                }
            </nav>
            <VerticalSeparator verticalMargin={""}/>
            <section className={"flex flex-col p-3"}>
                <Outlet />
            </section>
        </div>
    )

}