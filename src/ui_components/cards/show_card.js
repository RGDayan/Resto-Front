import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCard} from "../../redux/selectors";
import {getCard, getCards} from "../../query/cardQuery";
import {useNavigate, useParams} from "react-router-dom";
import Title from "../divers/labels/title";
import LabelInput from "../divers/labels/label_input";
import HorizontalSeparator from "../divers/separators/horizontal_separator";
import NavigationButton from "../divers/navigations/bouton_navigation";
import Modal from "../divers/modals/modal";
import GetImgByFormat from "../../controllers/assets/imgcontroller";

export default function ShowCard(){
    const card = useSelector(selectCard)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { cardId } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getCard(dispatch, cardId)
    }, [dispatch, cardId]);

    function submit(){

        fetch(process.env.REACT_APP_URL_API_RESTO + "/cards/" + card.id,
            {method: "DELETE"})
            .then(() => {
                setIsModalOpen(false)
                getCards(dispatch)
                navigate("/cards")
            })
    }

    return (
        <div className={"w-full"}>
            {/*CURRENT CARD MENU*/}
            <div className={"flex w-fit p-1"}>
                <NavigationButton id={"update-card-button"}
                                  imgSrc={"pen"}
                                  imgFormat={16}
                                  alt={"update_ico"}
                                  className={"rounded-lg"}/>
                <NavigationButton id={"delete-card-button"}
                                  imgSrc={"trash"}
                                  imgFormat={16}
                                  alt={"delete_ico"}
                                  className={"rounded-lg hover:bg-red-500 active:bg-red-700"}
                                  onclick={() => setIsModalOpen(true)}/>
            </div>

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


            <Modal isOpen={isModalOpen}
                   onConfirmation={() => submit()}
                   id={"delete-card-" + card.id}
                   title={"Suppression de carte"}
                   content={"Souhaitez-vous réellement supprimer la carte n°" + card.id + " : \"" + card.title + "\""}
                   imgSrc={GetImgByFormat("error", 32)}
                   imgAlt={"error_ico"}/>
        </div>
    )
}