import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCommand} from "../../redux/selectors";
import Title from "../divers/labels/title";
import HorizontalSeparator from "../divers/separators/horizontal_separator";
import NavigationButton from "../divers/navigations/navigation_button";
import {addCommandProduct, askCommandProduct, closeCommand, reduceCommandProduct} from "../../query/commandQuery";
import GetImgByFormat from "../../controllers/assets/imgcontroller";
import Modal from "../divers/modals/modal";
import {useNavigate} from "react-router-dom";

export default function SummaryCommand(){
    const command = useSelector(selectCommand)
    const navigate = useNavigate()
    const [displayBill, setDisplayBill] = useState(false);
    const dispatch = useDispatch()

    return (
        <div className={"flex flex-col h-full min-w-64 p-2 pr-0 mr-2 justify-between"}>
            <Title content={"Récapitulatif"} underline={false}/>

            <HorizontalSeparator verticalMargin={"mb-2"} horizontalMargin={"mx-2"}/>

            <div>
                <p>Table n°{command.numTable}</p>
                <p>{command.customerCount} Couverts </p>
                <p>Total TTC : {command.priceTTC} €</p>
            </div>

            <div className={"space-y-2 h-5/6 overflow-y-visible overflow-x-hidden"}>
                {displayTitleByCategory(command, "Entrées", "starter", dispatch)}
                {displayCategoryByProduct(command, "starter", dispatch)}
                {displayTitleByCategory(command, "Plats", "dish", dispatch)}
                {displayCategoryByProduct(command, "dish", dispatch)}
                {displayTitleByCategory(command, "Desserts", "dessert", dispatch)}
                {displayCategoryByProduct(command, "dessert", dispatch)}
                {displayTitleByCategory(command, "Boissons", "beverage", dispatch)}
                {displayCategoryByProduct(command, "beverage",  dispatch)}
            </div>

            <HorizontalSeparator horizontalMargin={"mx-2"} verticalMargin={"my-2"} />

            <div className={"flex justify-between px-5"}>
                <NavigationButton id={"generate-bill-button"}
                                  className={"min-w-24 rounded-md"}
                                  imgSrc={"visualize_bright"}
                                  imgFormat={16}
                                  content={"Facturer"}
                                  onClick={() => setDisplayBill(true)} />
                <NavigationButton id={"pay-bill-button"}
                                  className={"min-w-24 rounded-md bg-cyan-500 text-white"}
                                  contentClassName={"justify-center"}
                                  content={"Payer"}
                                  onClick={() => {
                                      closeCommand(dispatch, command)
                                      navigate("/service")
                                  }} />
            </div>

            <Modal  id={"display-bill-modal"}
                    imgSrc={GetImgByFormat("visualize_bright", 32)}
                    title={"Facture de la commande n°" + command.id}
                    isOpen={displayBill}
                    close={() => setDisplayBill(false)}>
                <table className={"w-full"}>
                    <thead>
                        <tr>
                            <td>Produits</td>
                            <td>Quantités</td>
                            <td>Montants</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            command.commandProducts?.map((commandProduct) => {
                                return <tr key={"commandProduit-facture-" + commandProduct.product.id}>
                                    <td>{commandProduct.product.label}</td>
                                    <td className={"text-center"}>{commandProduct.quantity}</td>
                                    <td className={"border-l-2 border-darkgray-300 text-right"}>{commandProduct.priceTTC} €</td>
                                </tr>
                            })
                        }
                        <tr className={"border-t-2 border-darkgray-300"}>
                            <td></td>
                            <td className={"text-right"}>Total TTC</td>
                            <td className={"text-right font-bold"}>{command.priceTTC} €</td>
                        </tr>

                        <tr className={"border-t-2 border-darkgray-100"}>
                            <td></td>
                            <td className={"text-right"}>Total HT</td>
                            <td className={"text-right"}>{command.priceHT} €</td>
                        </tr>

                        <tr className={"border-t-2 border-darkgray-100"}>
                            <td></td>
                            <td className={"text-right"}>TVA 5.5%</td>
                            <td className={"text-right"}>{command.commandProducts?.filter(x => x.product.ratingTVA.rating === 5.5)
                                .reduce((a,b) => a + b.partTVA, 0)} €</td>
                        </tr>
                        <tr className={"border-t-2 border-darkgray-100"}>
                            <td></td>
                            <td className={"text-right"}>TVA 10%</td>
                            <td className={"text-right"}>{command.commandProducts?.filter(x => x.product.ratingTVA.rating === 10)
                                .reduce((a,b) => a + b.partTVA, 0)} €</td>
                        </tr>
                        <tr className={"border-t-2 border-darkgray-100"}>
                            <td></td>
                            <td className={"text-right"}>TVA 20%</td>
                            <td className={"text-right"}>{command.commandProducts?.filter(x => x.product.ratingTVA.rating === 20)
                                .reduce((a,b) => a + b.partTVA, 0)} €</td>
                        </tr>
                    </tbody>
                </table>
            </Modal>
        </div>
    )
}

function displayTitleByCategory(command, title, category, dispatch) {
    return command.commandProducts?.filter(obj => obj.product.productType === category).length >= 1 ?
        <div className={"relative"}>
            <Title content={title} />
            {
                command.commandProducts?.find(obj => obj.status === "ordered" && obj.product.productType === category) !== undefined &&
                <NavigationButton id={"ask-following-products-button"}
                                  className={"absolute right-0 -top-1 rounded-md"}
                                  contentClassName={"justify-center"}
                                  content={"Faire suivre"}
                                  onClick={() => askCommandProduct(dispatch, command, category)}/>
            }
        </div>
        : null

}

function displayCategoryByProduct(command, category, dispatch) {
    return command.commandProducts?.filter(x => x.product.productType === category).map((commandProduct) => {
        return <div key={"product-" + commandProduct.product.id}
                 className={"flex justify-between"}>
            <p className={"self-center"}>{commandProduct.product.label}</p>
            <div className={"relative flex justify-between min-w-24"}>
                <NavigationButton imgSrc={"minus_blue"}
                                  imgFormat={16}
                                  className={"m-1 rounded-full"}
                                  onClick={() => reduceCommandProduct(dispatch, command, commandProduct.product)}/>
                <p className={"self-center absolute w-full text-center -z-20"}>{commandProduct.quantity}</p>
                <NavigationButton imgSrc={"plus_blue"}
                                  imgFormat={16}
                                  className={"m-1 rounded-full"}
                                  onClick={() => addCommandProduct(dispatch, command, commandProduct.product)}/>
            </div>
        </div>
    })
}