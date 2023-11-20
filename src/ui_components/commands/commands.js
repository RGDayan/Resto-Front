import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {selectServiceCommands} from "../../redux/selectors";
import {getCurrentService} from "../../query/serviceQuery";
import NavigationButton from "../divers/navigations/navigation_button";
import LabelErreur from "../divers/label_erreur";
import {resetCommand} from "../../redux/reducers/commandReducer";

export default function Commands(){
    const commands = useSelector(selectServiceCommands)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        getCurrentService(dispatch)
    }, [dispatch]);

    return (
        <div className={"relative flex flex-wrap w-full h-full overflow-y-auto px-20 py-10"}>
            <NavigationButton id={"create-command-button"}
                              imgSrc={"plus_blue"}
                              imgFormat={"32"}
                              className={"absolute top-0 left-0 m-2 rounded-full "}
                              onClick={() => {
                                  dispatch(resetCommand())
                                  navigate("/service/commands/create")
                              }}/>

            {
                commands !== null && commands.length !== 0 ?
                    commands?.map((command) => {
                        return <NavigationButton key={"command-" + command.id}
                                                 id={"command-" + command.id}
                                                 content={"Table n°" + command.numTable}
                                                 className={"flex-col p-2 h-fit w-48 rounded-md mr-2"}
                                                 contentClassName={"font-semibold"}
                                                 onClick={() => navigate("/service/commands/" + command.id)}>
                            <p>{command.customerCount} clients</p>
                            {/*    TODO : Gérer l'affichage de l'état des commandes */}
                            <p>Entrée non commandée</p>
                        </NavigationButton>
                    })
                    : <LabelErreur error={"INFO : Aucune commande n'a été passée"}
                                   errorClassName={"text-center"}
                                   className={"mx-2"}/>
            }
        </div>
    )
}