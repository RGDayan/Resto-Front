import React, {useEffect} from "react";
import LabelErreur from "../divers/label_erreur";
import GetImgByFormat from "../../controllers/assets/imgcontroller";
import {useDispatch, useSelector} from "react-redux";
import {selectCards} from "../../redux/selectors";
import {getCards} from "../../query/cardQuery";

export default function Service(){
    const cards = useSelector(selectCards)
    const dispatch = useDispatch();

    useEffect(() => {
        getCards(dispatch)
    }, [dispatch]);

    return (
        <div>
            {
                cards.error?.status === 404 ?
                    <LabelErreur error={cards.error?.message}
                                 solution={"Veuillez créer une carte afin de pouvoir ouvrir un service"}
                                 className={"w-full text-center mt-3"}
                                 errorClassName={"font-bold text-xl"}
                                 solutionClassName={"text-green-500 font-semibold text-lg"}
                                 imgSrc={GetImgByFormat("error", 64)}
                                 imgAlt={"error_ico"}
                    />
                    : "Cartes existantes"
            }
        </div>
    );
}