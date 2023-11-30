import React, {useEffect, useState} from "react";
import Title from "../divers/labels/title";
import {useDispatch, useSelector} from "react-redux";
import {selectProduct, selectRatingsTVA} from "../../redux/selectors";
import {setProductProperty, setProductRatingTVA, setProductRatingTVARaw} from "../../redux/reducers/productReducer";
import {createProduct} from "../../query/productQuery";
import {useNavigate} from "react-router-dom";
import InputText from "../divers/inputs/input_text";
import InputNumber from "../divers/inputs/input_number";
import NavigationButton from "../divers/navigations/navigation_button";
import Modal from "../divers/modals/modal";
import InputCheckbox from "../divers/inputs/input_checkbox";
import InputTextSelect from "../divers/inputs/input_text_select";
import ContentWrapper from "../divers/wrappers/content_wrapper";
import LabelInput from "../divers/labels/label_input";
import {getRatingsTVA} from "../../query/ratingsTVAQuery";

export default function FormProduct({id, category, title, subTitle, method}){
    const product = useSelector(selectProduct)
    const ratingsTVA = useSelector(selectRatingsTVA)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [typeBeverages, setTypeBeverages] = useState([]);

    useEffect(() => {
        if (category === "beverage")
            fetch(process.env.REACT_APP_URL_API_RESTO + "/products/beverage/types")
                .then(async (res) => setTypeBeverages(await res.json()))
        getRatingsTVA(dispatch)
        if (product.ratingTVA.rating == null)
            dispatch(setProductRatingTVARaw(ratingsTVA.data[0]))
    }, [category, dispatch]);

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
            product.priceHT === "" ||
            product.ratingTVA.id === null)
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
        <ContentWrapper id={id} className={"flex w-full"} >
            <ContentWrapper id={id} className={"flex flex-col space-y-3 w-1/2"} >
                <Title content={title}
                       subTitle={subTitle}
                       className={"w-4/5"}/>

                <InputText label={"Nom du produit"}
                           name={"label"}
                           value={product.label}
                           onChange={(e) => dispatch(setProductProperty(e))}
                           autoFocus={true} />
                <InputText label={"Description"}
                           name={"description"}
                           value={product.description}
                           onChange={(e) => dispatch(setProductProperty(e))} />
                <InputNumber label={"Prix HT"}
                             name={"priceHT"}
                             value={product.priceHT}
                             onChange={(e) => dispatch(setProductProperty(e))} />
                <div className={"flex flex-col"}>
                    <LabelInput label={"Taux de TVA applicable"} name={"ratingTVA"} />
                    <select name="ratingTVA" id="ratingTVA-select"
                            defaultValue={product.ratingTVA?.id}
                            onChange={(e) => dispatch(setProductRatingTVA(e))}>
                        {
                            ratingsTVA.data?.map((rating) => {
                                return <option key={"rating-" + rating.id} value={rating.id}>{rating.rating} %</option>
                            })
                        }
                    </select>
                </div>

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
            <ContentWrapper id={id} className={"flex flex-col space-y-3 w-1/2 pr-3"} >
                <Title content={"Règles des taux de TVA applicables"} className={"text-right"} separatorMargin={""}/>
                <div className={"space-y-3"}>
                    <p>La vente de produits alimentaires et de boissons, dans le commerce, la restauration, les cafés, bars, sur place ou à emporter, etc., est soumise à différents taux de TVA (taxe sur la valeur ajoutée). Il existe un taux réduit de 5,5 %, un taux intermédiaire de 10 % et le taux plein (ou normal) à 20 %.</p>
                    <p>Pour déterminer le taux de TVA applicable à un produit alimentaire ou à une boisson, il faut déterminer s'il est vendu pour une consommation immédiate ou s'il peut être conservé. </p>
                    <p>Il existe 3 taux de TVA pour les produits de l'alimentation</p>

                    <ul className={"list-disc"}>
                        <li>5,5 % sur un produit conditionné dans un contenant permettant sa conservation, donc pour une consommation qui peut être différée. Le contenant doit être hermétique, avec une date limite de conservation.</li>
                        <li>10 % sur un produit vendu pour une consommation immédiate</li>
                        <li>20 % : seulement sur les boissons alcoolisées, quel que soit le type de consommation, immédiate ou différée.</li>
                    </ul>

                    <p>Pour plus d'informations,
                        consultez <a href="https://entreprendre.service-public.fr/vosdroits/F22399"
                                     className={"text-blue-600"}>
                            le site du service public concernant les taux de TVA
                        </a> applicables à la vente alimentaire.
                    </p>
                </div>
            </ContentWrapper>
        </ContentWrapper>
    )
}