import React from "react";
import {useSelector} from "react-redux";
import {selectService} from "../../redux/selectors";
import ContentWrapper from "../divers/wrappers/content_wrapper";
import LabelInput from "../divers/labels/label_input";

export default function ShowService(){
    const service = useSelector(selectService)

    let totalAmount = 0
    let totalCustomers = 0
    let averageTicket
    if (service.commands !== null && service.status.toString().substring(0, 1) !== "4") {
        if (service.commands?.length === 1) {
            totalAmount = service.commands[0].amount
            totalCustomers = service.commands[0].customerCount
        }
        else if (service.commands?.length !== 0) {
            totalAmount = service.commands?.reduce((a, b) => aggregateArray(a, b, "amount"))
            totalCustomers = service.commands?.reduce((a, b) => aggregateArray(a, b, "customerCount"))
        }
        if (totalCustomers !== 0)
            averageTicket = Math.floor(totalAmount / totalCustomers * 100) / 100
    }

    function aggregateArray(a, b, property) {
        if (b === null)
            if (a === null)
                return 0
            else
                return a
        else
            return a[property] + b[property]
    }

    return (
        <ContentWrapper className={"w-full"}>
            <div>
                <LabelInput name={"openedDate"} label={"Heure d'ouverture"} />
                <p>{new Date(service.openedDate).toLocaleString()}</p>
            </div>
            {
                service.closedDate &&
                <div>
                    <LabelInput name={"closedDate"} label={"Heure de fermeture"}/>
                    <p>{new Date(service.closedDate).toLocaleString()}</p>
                </div>
            }
            <div>
                <LabelInput name={"status"} label={"Statut"} />
                <p>{service.status ? "Ouvert" : "Fermé"}</p>
            </div>
            <div>
                <LabelInput name={"nbCommands"} label={"Nombre de commandes"} />
                <p>{service.commands?.length}</p>
            </div>
            <div>
                <LabelInput name={"totalAmount"} label={"CA Total"} />
                <p>{totalAmount} €</p>
            </div>
            {
                totalCustomers !== 0 &&
                <div>
                    <LabelInput name={"totalClients"} label={"Nombre de clients"}/>
                    <p>{totalCustomers}</p>
                </div>
            }
            {
                service.commands?.length !== 0 && totalCustomers !== 0 &&
                <div>
                    <LabelInput name={"averageTicket"} label={"Ticket moyen"}/>
                    <p>{averageTicket + " €"}</p>
                </div>
            }
        </ContentWrapper>
    )
}