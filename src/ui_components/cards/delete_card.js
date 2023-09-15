import React, {useState} from "react";
import NavigationButton from "../divers/navigations/bouton_navigation";
import Modal from "../divers/modals/modal";
import GetImgByFormat from "../../controllers/assets/imgcontroller";
import {deleteCard} from "../../query/cardQuery";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectCard} from "../../redux/selectors";

export default function DeleteCard(){
    const [isModalOpen, setIsModalOpen] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const card = useSelector(selectCard)

    function submitDelete(){
        deleteCard(dispatch, card.id)
        navigate("/cards")
    }

    return (
        <>
            <NavigationButton id={"delete-card-button"}
                              imgSrc={"trash"}
                              imgFormat={16}
                              alt={"delete_ico"}
                              className={"rounded-lg hover:bg-red-500 active:bg-red-700"}
                              onClick={() => setIsModalOpen(true)}/>
            <Modal id={"delete-card-" + card.id}
                   title={"Suppression d'une carte"}
                   content={"Souhaitez-vous réellement supprimer la carte n°" + card.id + " : \"" + card.title + "\""}
                   imgSrc={GetImgByFormat("error", 32)}
                   imgAlt={"error_ico"}
                   isOpen={isModalOpen}
                   close={() => setIsModalOpen(false)}
                   onConfirmation={() => submitDelete()}/>
        </>
    )
}