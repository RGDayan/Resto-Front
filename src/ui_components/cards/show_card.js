import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCard} from "../../redux/selectors";
import {getCard} from "../../query/cardQuery";
import {useParams} from "react-router-dom";
import Title from "../divers/labels/title";
import LabelInput from "../divers/labels/label_input";
import ShowCardProducts from "./relations/show_card_products";
import ContentWrapper from "../divers/wrappers/content_wrapper";

export default function ShowCard(){
    const card = useSelector(selectCard)
    const dispatch = useDispatch()
    const { cardId } = useParams();

    useEffect(() => {
        getCard(dispatch, cardId)
    }, [dispatch, cardId]);

    return (
        <ContentWrapper>

            <div>
                <Title content={"Carte n°" + card.id + " : " + card.title}/>
                <div className="p-3 space-y-3">
                    <div>
                        <LabelInput name={"type"} label={"Type"} />
                        <p>{card.type}</p>
                    </div>
                    <div>
                        <LabelInput name={"openingTime"} label={"Heure d'ouverture"} />
                        <p>{card?.openingTime?.substring(0, 5)}</p>
                    </div>
                    <div>
                        <LabelInput name={"closingTime"} label={"Heure de fermeture"} />
                        <p>{card?.closingTime?.substring(0, 5)}</p>
                    </div>
                </div>
            </div>

            <ShowCardProducts />
        </ContentWrapper>
    )
}