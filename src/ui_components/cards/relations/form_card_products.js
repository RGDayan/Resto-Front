import React from "react";
import StepCardProducts from "./step_card_products";
import useMultiStepForm from "../../../react/use_multistep_form";
import NavigationButton from "../../divers/navigations/navigation_button";
import GetImgByFormat from "../../../controllers/assets/imgcontroller";
import {useSelector} from "react-redux";
import {selectCard} from "../../../redux/selectors";
import {useNavigate} from "react-router-dom";

export default function FormCardProducts(){
    const {step, isFirstStep, isLastStep, back, next} = useMultiStepForm([
        <StepCardProducts title={"entrées"} key={"entrée"} category={"starter"}/>,
        <StepCardProducts title={"plats"} key={"plat"} category={"dish"}/>,
        <StepCardProducts title={"desserts"} key={"dessert"} category={"dessert"}/>,
        <StepCardProducts title={"boissons"} key={"boisson"} category={"beverage"}/>,
    ])
    const navigate = useNavigate()
    const card = useSelector(selectCard);

    return (
        <div className={"p-3 w-full"}>
            {step}

            <div className={"flex justify-center mt-10"}>
                {
                    !isFirstStep &&
                    <NavigationButton id={"back-button"}
                                      content={"Précédent"}
                                      imgSrc={"back_arrow_bright"}
                                      imgFormat={16}
                                      className={"p-4 py-2 rounded-md"}
                                      onClick={(e) => back(e)}/>
                }
                <NavigationButton id={"next-button"}
                                  content={!isLastStep ? "Suivant" : "Valider"}
                                  className={"p-4 py-2 rounded-md"}
                                  onClick={(e) => {
                                      !isLastStep ?
                                          next(e)
                                          : navigate("/cards/" + card.id + "/show")
                                  }}>
                    <img src={GetImgByFormat("forward_arrow_bright", 16)} alt={""} className={"self-center pl-1"}/>
                </NavigationButton>
            </div>
        </div>
    )
}