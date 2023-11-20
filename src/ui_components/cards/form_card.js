import React, {useState} from "react";
import Title from "../divers/labels/title";
import InputText from "../divers/inputs/input_text";
import {useDispatch, useSelector} from "react-redux";
import {selectCard} from "../../redux/selectors";
import {resetCard, setCardProperty} from "../../redux/reducers/cardReducer";
import {useQuery} from "react-query";
import InputTextSelect from "../divers/inputs/input_text_select";
import NavigationButton from "../divers/navigations/navigation_button";
import {useNavigate} from "react-router-dom";
import {getCards} from "../../query/cardQuery";
import Modal from "../divers/modals/modal";
import InputTime from "../divers/inputs/input_time";
import ContentWrapper from "../divers/wrappers/content_wrapper";

export default function FormCard({id, title, subTitle = "", method}){
    const card = useSelector(selectCard)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {data: types} = useQuery(
        "getCardTypes",
        async () => {
            return fetch(process.env.REACT_APP_URL_API_RESTO + "/cards/types")
                .then(async (res) => res.json())
        }
    )

    function submitCard() {
        if (card.title === ""
            || card.type === ""
            || card.openingTime === ""
            || card.closingTime === "")
            return

        fetch(process.env.REACT_APP_URL_API_RESTO + "/cards", {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...card,
                openingTime: card.openingTime.length === 8 ? card.openingTime: card.openingTime + ":00",
                closingTime: card.closingTime.length === 8 ? card.closingTime: card.closingTime + ":00",
            })
        }).then(async (res) => {
            const resultat = await res.json()
            getCards(dispatch)
            dispatch(resetCard())
            navigate("/cards/" + resultat.id + "/show")
        })
    }

    return (
        <ContentWrapper className={"space-y-3"}>
            <Title content={title}
                   subTitle={subTitle}/>
            <InputText name={"title"}
                       label={"Titre"}
                       value={card.title}
                       onChange={(e) => dispatch(setCardProperty(e))}
                       autoFocus={true}/>
            <InputTextSelect name={"type"}
                             label={"Type"}
                             value={card.type}
                             values={types}
                             onChange={(e) => dispatch(setCardProperty(e))}
                             className={"mb-3"}/>
            <InputTime name={"openingTime"}
                       label={"Heure d'ouverture prévue"}
                       value={card.openingTime}
                       onChange={(e) => {dispatch(setCardProperty(e))}}/>
            <InputTime name={"closingTime"}
                       label={"Heure de fermeture prévue"}
                       className={"mt-2"}
                       value={card.closingTime}
                       onChange={(e) => {dispatch(setCardProperty(e))}}/>

            <div className="flex justify-center w-full mt-3">
                <NavigationButton id={"submit-" + id + "-card"}
                                  content={"Valider"}
                                  className={"mt-3 w-fit p-3 bg-stone-100 rounded-md"}
                                  onClick={() => {
                                      if (method === "POST")
                                          submitCard()
                                      else if (method === "PUT")
                                          setIsModalOpen(true)
                                  }}/>
            </div>

            <Modal id={"update-card"}
                   title={"Modification d'une carte"}
                   content={"Souhaitez-vous valider la modification de la carte n°" + card.id + " : " + card.title}
                   isOpen={isModalOpen}
                   close={() => setIsModalOpen(false)}
                   onConfirmation={() => submitCard()}/>
        </ContentWrapper>
    )
}