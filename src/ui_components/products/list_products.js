import React from "react";
import NavigationButton from "../divers/navigations/navigation_button";
import {useSelector} from "react-redux";
import {selectProducts} from "../../redux/selectors";
import LabelErreur from "../divers/label_erreur";
import GetImgByFormat from "../../controllers/assets/imgcontroller";
import {useNavigate} from "react-router-dom";

export default function ListProducts({category}){
    const products = useSelector(selectProducts)
    const navigate = useNavigate()

    return (
        <div className={"flex flex-wrap justify-evenly w-full h-full p-6"}>
            {
                products.error?.status === 404?
                    <LabelErreur error={products.error?.message}
                                 solution={"Veuillez créer un produit de cette catégorie"}
                                 className={"w-full text-center mt-3"}
                                 errorClassName={"font-bold text-xl"}
                                 solutionClassName={"text-green-500 font-semibold text-lg"}
                                 imgSrc={GetImgByFormat("error", 64)}
                                 imgAlt={"error_ico"} />
                    : products.data?.map((product) => {
                        return <NavigationButton key={product.id}
                                                 id={"show-product-" + product.id}
                                                 content={product.label}
                                                 className={"min-w-48 mb-3 p-3 shadow-lg shadow-stone-200 active:shadow-inner"}
                                                 contentClassName={"justify-center"}
                                                 onClick={() => navigate("/products/" + category + "/" + product.id)}
                        />
                    })
            }
        </div>
    )
}