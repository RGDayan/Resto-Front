import React, {useEffect} from "react";
import LabelErreur from "../divers/label_erreur";
import GetImgByFormat from "../../controllers/assets/imgcontroller";
import {useDispatch, useSelector} from "react-redux";
import {selectCards, selectProducts, selectService} from "../../redux/selectors";
import {getCurrentService} from "../../query/serviceQuery";
import NavigationButton from "../divers/navigations/navigation_button";
import HorizontalSeparator from "../divers/separators/horizontal_separator";
import {getCards} from "../../query/cardQuery";
import {getProducts} from "../../query/productQuery";
import Commands from "../commands/commands";

export default function Service(){
    const cards = useSelector(selectCards)
    const products = useSelector(selectProducts)
    const service = useSelector(selectService)
    const dispatch = useDispatch();

    useEffect(() => {
        getCurrentService(dispatch)
        getCards(dispatch)
        getProducts(dispatch)
    }, [dispatch]);

    let content;
    if (cards.error?.status === 404)
        content = <LabelErreur error={cards.error.message}
                               solution={"Veuillez créer une carte avant d'ouvrir un service"}
                               className={"w-full text-center mt-3"}
                               errorClassName={"font-bold text-xl"}
                               solutionClassName={"text-green-500 font-semibold text-lg"}
                               imgSrc={GetImgByFormat("error", 64)}
                               imgAlt={"error_ico"}/>
    else if (products.error?.status === 404)
        content = <LabelErreur error={products.error.message}
                               solution={"Vous pourrez ouvrir un service mais aucun produits ne sera proposé"}
                               className={"w-full text-center mt-3"}
                               errorClassName={"font-bold text-xl"}
                               solutionClassName={"text-green-500 font-semibold text-lg"}
                               imgSrc={GetImgByFormat("error", 64)}
                               imgAlt={"error_ico"}/>
    else if (service.message !== undefined)
        content = <LabelErreur error={service.message}
                               solution={"Veuillez ouvrir un service sur une carte pour pouvoir commander"}
                               className={"w-full text-center mt-3"}
                               errorClassName={"font-bold text-xl"}
                               solutionClassName={"text-green-500 font-semibold text-lg"}
                               imgSrc={GetImgByFormat("error", 64)}
                               imgAlt={"error_ico"}/>
    else if (service.status === true && new Date(service.plannedClosedDate) < new Date())
        content = <div content={"flex justify-center w-full"}>
            <LabelErreur error={"ATTENTION : le service actuellement ouvert a dépassé sa date de fermeture planifiée : " + service.plannedClosedDate}
                         className={"w-full flex justify-center"}
                         errorClassName={"font-semibold text-sm"}
                         imgPosition={"w-fit mr-3"}
                         imgSrc={GetImgByFormat("error", 16)}
                         imgAlt={"error_ico"}/>
            <HorizontalSeparator horizontalMargin={"mr-3"} verticalMargin={""}/>
            <Commands />
        </div>
    else if (service.status === true && service.card.products?.length === 0)
        content = <>
            <LabelErreur error={"ATTENTION : la carte du service actuellement ouvert ne contient aucun produits"}
                         className={"w-full flex justify-center"}
                         errorClassName={"font-semibold text-sm"}
                         imgPosition={"w-fit mr-3"}
                         imgSrc={GetImgByFormat("error", 16)}
                         imgAlt={"error_ico"}/>
            <HorizontalSeparator horizontalMargin={"mr-3"} verticalMargin={""}/>
            <Commands />
        </>
    else
        content = <Commands />

    return (
        <div className={"w-full h-full"}>
            {content}
            <NavigationButton imgSrc={"refresh"}
                              imgFormat={16}
                              className={"absolute top-0 right-0 z-50 w-fit h-fit p-2 rounded-md m-1"}
                              onClick={() => {
                                  getCurrentService(dispatch)
                              }}/>
        </div>
    );
}