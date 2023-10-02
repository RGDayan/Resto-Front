import React, {useState} from "react";
import NavigationButton from "../divers/navigations/navigation_button";
import {useNavigate, useParams} from "react-router-dom";
import Modal from "../divers/modals/modal";
import GetImgByFormat from "../../controllers/assets/imgcontroller";
import {useDispatch, useSelector} from "react-redux";
import {deleteProduct} from "../../query/productQuery";
import {selectProduct} from "../../redux/selectors";

export default function NavigationProducts({category, onPlusClick}){
    const product = useSelector(selectProduct)
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { idProduct } = useParams()
    const navigate = useNavigate()

    function submitDelete(){
        deleteProduct(dispatch, category, idProduct)
        navigate("/products/" + category)
    }

    return (
        <nav className={"flex p-1 space-x-2"}>
            <NavigationButton id={"retour-button"}
                              imgSrc={"back_arrow_bright"}
                              imgFormat={16}
                              onClick={() => navigate("/products" + (idProduct === undefined? "": "/" + category))}
                              className={"rounded-lg"}  />
            <NavigationButton id={"create-" + category + "-button"}
                              imgSrc={"plus_bright"}
                              imgFormat={16}
                              onClick={() => {
                                  onPlusClick()
                                  navigate("/products/" + category + "/create")
                              }}
                              className={"rounded-lg"} />
            {
                idProduct ?
                    <>
                        <NavigationButton id={"update-" + category + "-button"}
                                          imgSrc={"pen"}
                                          imgFormat={16}
                                          onClick={() => navigate("/products/" + category + "/" + idProduct + "/update")}
                                          className={"rounded-lg"} />
                        <NavigationButton id={"delete-" + category + "-button"}
                                          imgSrc={"trash"}
                                          imgFormat={16}
                                          alt={"delete_ico"}
                                          className={"rounded-lg hover:bg-red-500 active:bg-red-700"}
                                          onClick={() => setIsModalOpen(true)}/>
                        <Modal id={"delete-" + category + "-" + idProduct}
                               title={"Suppression d'un produit"}
                               content={"Souhaitez-vous réellement supprimer le produit n°" + idProduct + " : \"" + product.label + "\""}
                               imgSrc={GetImgByFormat("error", 32)}
                               imgAlt={"error_ico"}
                               isOpen={isModalOpen}
                               close={() => setIsModalOpen(false)}
                               onConfirmation={() => submitDelete()}/>
                    </>
                    : ""
            }
        </nav>
    )
}