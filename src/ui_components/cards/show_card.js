import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCard} from "../../redux/selectors";
import {getCard} from "../../query/cardQuery";
import {useParams} from "react-router-dom";

export default function ShowCard(){
    const card = useSelector(selectCard)
    const dispatch = useDispatch()
    const { cardId } = useParams();

    useEffect(() => {
        getCard(dispatch, cardId)
    }, [dispatch, cardId]);

    return (
        <>
            <p>{card.id}</p>
            <p>{card.title}</p>
            <p>{card.type}</p>
            <p>{card.openingTime}</p>
            <p>{card.closingTime}</p>
        </>
    )
}