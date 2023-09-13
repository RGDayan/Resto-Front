import React from "react";
import Title from "../divers/labels/title";
import InputText from "../divers/inputs/input_text";
import {useDispatch, useSelector} from "react-redux";
import {selectCard} from "../../redux/selectors";
import {setCard, setCardPropriete, setTime} from "../../redux/reducers/cardReducer";
import {useMutation, useQuery} from "react-query";
import InputTextSelect from "../divers/inputs/input_text_select";
import InputTimePicker from "../divers/inputs/time_picker/input_time_picker";
import NavigationButton from "../divers/navigations/bouton_navigation";

export default function CreateCard(){
    const card = useSelector(selectCard)
    const dispatch = useDispatch();

    const {data: types} = useQuery(
        "getCardTypes",
        async () => {
            return fetch(process.env.REACT_APP_URL_API_RESTO + "/cards/types")
                .then(async (res) => res.json())
        }
    )

    useMutation()

    async function postCard() {
        if (card.title === ""
            || card.type === ""
            || card.openingTime === ""
            || card.closingTime === "")
            return

        await fetch(process.env.REACT_APP_URL_API_RESTO + "/cards", {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(card)
        }).then(async (res) => {
            const resultat = await res.json()
            dispatch(setCard(resultat))
            return resultat
        })
    }

    return (
        <>
            <Title content={"Créez une nouvelle carte"}
                   subTitle={"Les cartes sont la représentation des produits servis pas service"}/>
            <form id={"form-create-card"}
                  className={"flex flex-col pt-3"} >
                <InputText name={"title"}
                           label={"Titre"}
                           value={card.title}
                           onChange={(e) => dispatch(setCardPropriete(e))}/>
                <InputTextSelect name={"type"}
                                 label={"Type"}
                                 value={card.type}
                                 values={types}
                                 onChange={(e) => dispatch(setCardPropriete(e))}
                                 className={"mb-3"}/>
                <InputTimePicker name={"openingTime"}
                                 label={"Heure d'ouverture prévue"}
                                 defaultValue={card.openingTime}
                                 onChange={(e) => {
                                     dispatch(setTime(
                                         {
                                             numeric: e.target.name,
                                             value: e.target.value,
                                             propToChange: "openingTime"
                                         }
                                     ))
                                 }}/>
                <div className="m-2"></div>
                <InputTimePicker name={"closingTime"}
                                 label={"Heure de fermeture prévue"}
                                 defaultValue={card.closingTime}
                                 onChange={(e) => {
                                     dispatch(setTime(
                                         {
                                             numeric: e.target.name,
                                             value: e.target.value,
                                             propToChange: "closingTime"
                                         }
                                     ))
                                 }}/>

                <NavigationButton id={"submit-create-card"}
                                  content={"Valider"}
                                  className={"mt-3 w-fit p-3 bg-stone-200 hover:bg-stone-300 active:bg-stone-500 rounded-lg"}
                                  onclick={() => postCard()}/>

            </form>
        </>
    )
}