import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCards} from "../../redux/selectors";
import VerticalSeparator from "../divers/separators/vertical_separator";
import NavigationButton from "../divers/navigations/navigation_button";
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
            <nav className={"bg-white w-fit h-screen text-left min-w-48"}>
                {/*ACCESS TO CARDS CREATION*/}
                <NavigationButton id={"create-card-button"}
                                  content={"Créer une carte"}
                                  imgSrc={"plus_bright"}
                                  imgFormat={"16"}
                                  className={"p-2"}
                                  onClick={() => {
                                      dispatch(resetCard())
                                      navigate("/cards/create")
                                  }}/>

                <HorizontalSeparator verticalMargin={cards.error?.status === 404? "mb-3": ""}/>

                <div className={"h-full overflow-y-auto"}>
                    {/*CARDS INDEX*/}
                    {
                        cards.error?.status === 404 ?
                            <LabelErreur error={cards.error.message}
                                         errorClassName={"text-center"}
                                         className={"mx-2"}/>:
                            cards.data?.map((card) => {
                                return <NavigationButton key={"card-" + card.id}
                                                         id={"card-" + card.id}
                                                         content={card.title}
                                                         onClick={() => navigate("/cards/" + card.id)}
                                                         className={"px-2"}/>
                            })
                    }
                </div>

            </nav>

            <VerticalSeparator verticalMargin={""}/>

            {/*CURRENT DISPLAY FOR CARDS (CREATION FORM, SHOW CARD...etc.)*/}
            <section className={"flex flex-col w-full"}>
                <Outlet />
            </section>
        </div>
    )

}