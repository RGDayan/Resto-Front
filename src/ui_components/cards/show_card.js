import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCard} from "../../redux/selectors";
import {getCard} from "../../query/cardQuery";
import {useParams} from "react-router-dom";
import Title from "../divers/labels/title";
import LabelInput from "../divers/labels/label_input";
import HorizontalSeparator from "../divers/separators/horizontal_separator";
import CardMenu from "./card_menu";

export default function ShowCard(){
    const card = useSelector(selectCard)
    const dispatch = useDispatch()
    const { cardId } = useParams();

    useEffect(() => {
        getCard(dispatch, cardId)
    }, [dispatch, cardId]);

    return (
        <div className={"w-full"}>
            <CardMenu />

            <HorizontalSeparator horizontalMargin={""} verticalMargin={""}/>

            <div className={"w-fit p-3"}>
                <Title content={"Carte n°" + card.id + " : " + card.title}/>
                <div className="p-3 space-y-3">
                    <div>
                        <LabelInput name={"type"} label={"Type"} className={"font-bold"}/>
                        <p>{card.type}</p>
                    </div>
                    <div>
                        <LabelInput name={"openingTime"} label={"Heure d'ouverture"} className={"font-bold"}/>
                        <p>{card?.openingTime.substring(0, 5)}</p>
                    </div>
                    <div>
                        <LabelInput name={"closingTime"} label={"Heure de fermeture"} className={"font-bold"}/>
                        <p>{card?.closingTime.substring(0, 5)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}