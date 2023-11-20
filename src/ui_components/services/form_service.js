import React, {useEffect} from "react";
import Title from "../divers/labels/title";
import InputTime from "../divers/inputs/input_time";
import {useDispatch, useSelector} from "react-redux";
import {getCards} from "../../query/cardQuery";
import {selectCards, selectService, selectServiceCard} from "../../redux/selectors";
import LabelInput from "../divers/labels/label_input";
import {addServiceCard, resetService, setServiceProperty} from "../../redux/reducers/serviceReducer";
import NavigationButton from "../divers/navigations/navigation_button";
import {createService} from "../../query/serviceQuery";
import {useNavigate} from "react-router-dom";
import ContentWrapper from "../divers/wrappers/content_wrapper";

export default function FormService(){
    const cards = useSelector(selectCards)
    const service = useSelector(selectService)
    const currentCard = useSelector(selectServiceCard)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        getCards(dispatch)
        dispatch(resetService())
    }, [dispatch]);


    return (
        <ContentWrapper >
            <Title content={"Ouverture d'un service"}
                   subTitle={"L'ouverture manuelle d'un service nécessite la sélection d'une carte pour ce service"}/>
            <form id={"form-open-service"} className={"mt-3"}>
                <InputTime name={"openedDate"}
                           type={"datetime-local"}
                           label={"Date d'ouverture du service"}
                           value={service.openedDate || ""}
                           onChange={(e) => {dispatch(setServiceProperty(e))}}
                           autoFocus={true}/>

                <LabelInput name={"list-cards"}
                            label={"Choisissez une carte"}/>

                <table>
                    <thead>
                        <tr>
                            <td>Carte</td>
                            <td>Heure d'ouverture</td>
                            <td>Heure de fermeture</td>
                            <td>Type</td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        cards.data?.map((card) => {
                            return (
                                <tr key={"card-" + card.id}
                                    onClick={() => dispatch(addServiceCard(card))}
                                    className={currentCard?.id === card?.id ? "bg-stone-600 font-bold": ""}>
                                    <td>{card.title}</td>
                                    <td>{card.openingTime}</td>
                                    <td>{card.closingTime}</td>
                                    <td>{card.type}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>

                <div className="flex justify-center w-full mt-3">
                    <NavigationButton id={"create-service-button"}
                                      content={"Ouvrir le service"}
                                      className={"bg-stone-100 p-4 py-2 rounded-md"}
                                      onClick={() => {
                                          createService(dispatch, service)
                                          navigate("/service")
                                      }} />
                </div>
            </form>
        </ContentWrapper>
    )
}