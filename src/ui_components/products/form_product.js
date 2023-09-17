import React, {useEffect, useState} from "react";
import Title from "../divers/labels/title";
import {useDispatch, useSelector} from "react-redux";
import {selectProduct, selectProductProduct} from "../../redux/selectors";
import {resetProduct, setProductProductProperty, setProductProperty} from "../../redux/reducers/productReducer";
import {getProducts} from "../../query/productQuery";
import {useNavigate} from "react-router-dom";
import InputText from "../divers/inputs/input_text";
import InputNumber from "../divers/inputs/input_number";
import NavigationButton from "../divers/navigations/bouton_navigation";
import Modal from "../divers/modals/modal";
import InputCheckbox from "../divers/inputs/input_checkbox";
import InputTextSelect from "../divers/inputs/input_text_select";

export default function FormProduct({id, category, title, subTitle, method}){
    const product = useSelector(selectProduct)
    const productProduct = useSelector(selectProductProduct)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [typeBeverages, setTypeBeverages] = useState([]);

    useEffect(() => {
        if (category === "beverages")
            fetch(process.env.REACT_APP_URL_API_RESTO + "/products/beverages/types")
                .then(async (res) => setTypeBeverages(await res.json()))
    }, []);

    function submitProduct(){
        if (productProduct.label === "" ||
            productProduct.description === "" ||
            productProduct.price === "")
            return

        if (category === "starters" && product.isHot === null)
            return;
        if (category === "desserts" && product.isHot === null && product.isFlambe === null)
            return;
        if (category === "beverages"
            && (product.degree === null || product.degree === "")
            && product.type === "" )
            return;


        fetch(process.env.REACT_APP_URL_API_RESTO + "/products/" + category, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        }).then(async (res) => {
            const resultat = await res.json()
            getProducts(dispatch, category)
            dispatch(resetProduct())
            navigate("/products/" + category + "/" + resultat.id)
        })
    }

    return (
        <div id={"form-" + id}
             className={"flex flex-col w-1/2 space-y-3 px-3"} >
            <Title content={title}
                   subTitle={subTitle}
                   className={"w-fit"}/>

            <InputText label={"Nom du produit"}
                       name={"label"}
                       value={productProduct.label}
                       onChange={(e) => dispatch(setProductProductProperty(e))} />
            <InputText label={"Description"}
                       name={"description"}
                       value={productProduct.description}
                       onChange={(e) => dispatch(setProductProductProperty(e))} />
            <InputNumber label={"Prix"}
                         name={"price"}
                         value={productProduct.price}
                         onChange={(e) => dispatch(setProductProductProperty(e))} />

            {
                category === "starters" ?
                    <InputCheckbox label={"Entrée chaude"}
                                   name={"isHot"}
                                   value={product.isHot}
                                   onChange={(e) => dispatch(setProductProperty(e))} />
                : category === "desserts" ?
                    <>
                        <InputCheckbox label={"Dessert chaud"}
                                       name={"isHot"}
                                       value={product.isHot}
                                       onChange={(e) => dispatch(setProductProperty(e))} />
                        <InputCheckbox label={"Dessert flambé"}
                                       name={"isFlambe"}
                                       value={product.isFlambe}
                                       onChange={(e) => dispatch(setProductProperty(e))} />
                    </>
                : category === "beverages" ?
                    <>
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
                :""
            }

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
                   content={"Souhaitez-vous valider la modification du produit n°" + product.id + " : " + productProduct.label}
                   isOpen={isModalOpen}
                   close={() => setIsModalOpen(false)}
                   onConfirmation={() => submitProduct()}/>
        </div>
    )
}