import React, {useEffect, useState} from "react";
import Title from "../divers/labels/title";
import {useDispatch, useSelector} from "react-redux";
import {selectProduct} from "../../redux/selectors";
import {setProductProperty} from "../../redux/reducers/productReducer";
import {createProduct} from "../../query/productQuery";
import {useNavigate} from "react-router-dom";
import InputText from "../divers/inputs/input_text";
import InputNumber from "../divers/inputs/input_number";
import NavigationButton from "../divers/navigations/navigation_button";
import Modal from "../divers/modals/modal";
import InputCheckbox from "../divers/inputs/input_checkbox";
import InputTextSelect from "../divers/inputs/input_text_select";
import ContentWrapper from "../divers/wrappers/content_wrapper";

export default function FormProduct({id, category, title, subTitle, method}){
    const product = useSelector(selectProduct)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [typeBeverages, setTypeBeverages] = useState([]);

    useEffect(() => {
        if (category === "beverage")
            fetch(process.env.REACT_APP_URL_API_RESTO + "/products/beverage/types")
                .then(async (res) => setTypeBeverages(await res.json()))
    }, [category]);

    let productFields;
    switch (category) {
        case "starter":
            productFields = <InputCheckbox label={"Entrée chaude"}
                                           name={"isHot"}
                                           value={product.isHot}
                                           onChange={(e) => dispatch(setProductProperty(e))} />
            break;
        case "dessert":
            productFields = <>
                    <InputCheckbox label={"Dessert chaud"}
                                   name={"isHot"}
                                   value={product.isHot}
                                   onChange={(e) => dispatch(setProductProperty(e))} />
                    <InputCheckbox label={"Dessert flambé"}
                                   name={"isFlambe"}
                                   value={product.isFlambe}
                                   onChange={(e) => dispatch(setProductProperty(e))} />
                </>
            break;
        case "beverage":
            productFields = <>
                    <InputNumber label={"Degré d'alcool"}
                                 name={"degree"}
                                 value={product.degree}
                                 onChange={(e) => dispatch(setProductProperty(e))} />
                    <InputTextSelect label={"Type de boisson"}
                                     name={"type"}
                                     value={product.type}
                                     values={typeBeverages}
                                     onChange={(e) => dispatch(setProductProperty(e))} />
                </>
            break;
        default:
            productFields = <></>
            break;
    }

    function submitProduct(){
        if (product.label === "" ||
            product.description === "" ||
            product.price === "")
            return

        if (category === "starter" && product.isHot === null)
            return;
        if (category === "dessert" && product.isHot === null && product.isFlambe === null)
            return;
        if (category === "beverage"
            && (product.degree === null || product.degree === "")
            && product.type === "" )
            return;

        createProduct(dispatch, category, method, product, navigate)
    }

    return (
        <ContentWrapper id={id} className={"flex flex-col space-y-3"} >
            <Title content={title}
                   subTitle={subTitle}
                   className={"w-fit"}/>

            <InputText label={"Nom du produit"}
                       name={"label"}
                       value={product.label}
                       onChange={(e) => dispatch(setProductProperty(e))}
                       autoFocus={true} />
            <InputText label={"Description"}
                       name={"description"}
                       value={product.description}
                       onChange={(e) => dispatch(setProductProperty(e))} />
            <InputNumber label={"Prix"}
                         name={"price"}
                         value={product.price}
                         onChange={(e) => dispatch(setProductProperty(e))} />

            {productFields}

            <NavigationButton id={"submit-" + category + "-product"}
                              content={"Valider"}
                              className={"self-center w-fit p-3 px-6 bg-stone-200 rounded-lg"}
                              onClick={() => {
                                  if (method === "POST")
                                      submitProduct()
                                  else if (method === "PUT")
                                      setIsModalOpen(true)
                              }}/>

            <Modal id={"update-product"}
                   title={"Modification d'un produit"}
                   content={"Souhaitez-vous valider la modification du produit n°" + product.id + " : " + product.label}
                   isOpen={isModalOpen}
                   close={() => setIsModalOpen(false)}
                   onConfirmation={() => submitProduct()}/>
        </ContentWrapper>
    )
}