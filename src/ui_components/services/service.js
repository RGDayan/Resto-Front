import React from "react";
import {useQuery} from "react-query";
import LabelErreur from "../divers/label_erreur";
import GetImgByFormat from "../../controllers/assets/imgcontroller";
import {useDispatch} from "react-redux";
import {setCards} from "../../redux/reducers/cardsReducer";

export default function Service(){
    const dispatch = useDispatch();

    const {data: resultatCards} = useQuery(
        "getCards",
        async () => {
            return fetch(process.env.REACT_APP_URL_API_RESTO + "/cards")
                .then(async (res) => {
                    const resultat = await res.json()
                    dispatch(setCards(resultat))
                    return resultat
                })
        }
    )

    return (
        <div>
            {
                resultatCards?.status === 404 ?
                    <LabelErreur error={resultatCards?.message}
                                 solution={"Veuillez créer une carte afin de pouvoir ouvrir un service"}
                                 className={"w-full text-center"}
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