import React, {useState} from "react";
import NavigationButton from "../divers/navigations/bouton_navigation";
import {useNavigate, useParams} from "react-router-dom";
import Modal from "../divers/modals/modal";
import GetImgByFormat from "../../controllers/assets/imgcontroller";
import {useDispatch, useSelector} from "react-redux";
import {selectProductProduct} from "../../redux/selectors";
import {deleteProduct} from "../../query/productQuery";

export default function NavigationProducts({id, url, onPlusClick}){
    const product = useSelector(selectProductProduct)
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { idProduct } = useParams()
    const navigate = useNavigate()

    function submitDelete(){
        deleteProduct(dispatch, id, idProduct)
        navigate("/products/" + id)
    }

    return (
        <nav className={"flex p-1 space-x-2"}>
            <NavigationButton id={"retour-button"}
                              imgSrc={"back_arrow_bright"}
                              imgFormat={16}
                              onClick={() => navigate("/products")}
                              className={"rounded-lg"}  />
            <NavigationButton id={"create-" + id + "-button"}
                              imgSrc={"plus_bright"}
                              imgFormat={16}
                              onClick={() => {
                                  onPlusClick()
                                  navigate(url)
                              }}
                              className={"rounded-lg"} />
            {
                idProduct ?
                    <>
                        <NavigationButton id={"update-" + id + "-button"}
                                          imgSrc={"pen"}
                                          imgFormat={16}
                                          onClick={() => navigate("/products/" + id + "/" + idProduct + "/update")}
                                          className={"rounded-lg"} />
                        <NavigationButton id={"delete-" + id + "-button"}
                                          imgSrc={"trash"}
                                          imgFormat={16}
                                          alt={"delete_ico"}
                                          className={"rounded-lg hover:bg-red-500 active:bg-red-700"}
                                          onClick={() => setIsModalOpen(true)}/>
                        <Modal id={"delete-" + id + "-" + idProduct}
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