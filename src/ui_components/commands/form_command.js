import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {selectCommand, selectService} from "../../redux/selectors";
import {resetCommand, setCommandProperty, setServiceCommand} from "../../redux/reducers/commandReducer";
import NavigationButton from "../divers/navigations/navigation_button";
import ContentWrapper from "../divers/wrappers/content_wrapper";
import Title from "../divers/labels/title";
import InputNumber from "../divers/inputs/input_number";
import {createCommand} from "../../query/commandQuery";

export default function FormCommand(){
    const command = useSelector(selectCommand)
    const service = useSelector(selectService)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(setServiceCommand(service))
    }, [dispatch, service]);

    function submitCommand(){
        if (command.customerCount === "" && command.numTable === "")
            return

        createCommand(dispatch, navigate, command)
    }

    return (
        <div className={"flex flex-col"}>
            <ContentWrapper className={"self-center space-y-3"}>
                <Title content={"Nouvelle Commande"}
                       subTitle={"Une nouvelle commande est attachée au service courant et contiendra les produits des clients"}/>
                <InputNumber label={"Numéro de table"}
                             name={"numTable"}
                             value={command.numTable}
                             onChange={(e) => dispatch(setCommandProperty(e))}
                             autoFocus={true}/>
                <InputNumber label={"Nombre de couverts"}
                             name={"customerCount"}
                             value={command.customerCount}
                             onChange={(e) => dispatch(setCommandProperty(e))} />
            </ContentWrapper>
            <div className={"flex justify-center space-x-4 mt-3"} >
                <NavigationButton content={"Annuler"}
                                  className={"rounded-md p-4 py-2 text-white bg-red-500"}
                                  onClick={() => {
                                      dispatch(resetCommand())
                                      navigate(-1)
                                  }}/>
                <NavigationButton content={"Valider"}
                                  className={"rounded-md p-4 py-2 bg-stone-100"}
                                  onClick={() => submitCommand()}/>
            </div>
        </div>
    )

}