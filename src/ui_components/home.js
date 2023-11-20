import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectService} from "../redux/selectors";
import GetImgByFormat from "../controllers/assets/imgcontroller";
import ContentWrapper from "./divers/wrappers/content_wrapper";
import Title from "./divers/labels/title";
import {getLastService} from "../query/serviceQuery";
import ShowService from "./services/show_service";

export default function Home(){
    const service = useSelector(selectService)
    const dispatch = useDispatch()

    useEffect(() => {
        getLastService(dispatch)
    }, [dispatch])

    return (
        <div>
            <ContentWrapper className={"w-full"}>
                <Title content={"Bienvenue dans la gestion des services"}
                       underline={false}/>
                <div>
                    Cette application vous permet de gérer des services en restauration.
                    <br/>
                    La première étape est de renseigner vos produits puis de  créer vos cartes sur lesquelles vous pourrez ajouter vos produits.
                    <br/>
                    Une fois ceci fait, vous pourrez enfin ouvrir un service et créer des commandes.
                    <br/>
                    Utilisez la navigation ci-dessus pour accéder aux paramètres de l'application et à la gestion d'un service.
                    <br/>
                    <div className="flex">
                        Le bouton <div className={'self-center px-1'}><img src={GetImgByFormat("dishes", 16)} alt={""} /></div>affichera le service en cours
                    </div>
                </div>
                {
                    service.status !== 404 &&
                    <ContentWrapper className={"flex w-full justify-evenly mt-3"}>
                        <div className={"w-1/3"}>
                            <Title content={"Commandes du " + (service.status === true ? "service courant" : "dernier service")} />

                            <table className={"w-full mt-3"}>
                                <thead>
                                <tr>
                                    <td>N°</td>
                                    <td>Table</td>
                                    <td>Nb clients</td>
                                    <td>€</td>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    service.commands?.map((command) => {
                                        return (
                                            <tr key={"command-" + command.id}>
                                                <td>{command.id}</td>
                                                <td>{command.numTable}</td>
                                                <td>{command.customerCount}</td>
                                                <td>{command.amount}</td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                        <div className={"w-1/3"}>
                            <Title content={"Récapitulatif du " + (service.status === true ? "service courant" : "dernier service")} />

                            <ShowService />
                        </div>
                    </ContentWrapper>
                }
            </ContentWrapper>

        </div>
    )
}