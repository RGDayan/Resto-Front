import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCardProducts, selectProducts} from "../../../redux/selectors";
import {getProducts} from "../../../query/productQuery";
import Title from "../../divers/labels/title";
import GetImgByFormat from "../../../controllers/assets/imgcontroller";
import {addProduct} from "../../../redux/reducers/cardReducer";

export default function FormCardProducts(){
    const cardProducts = useSelector(selectCardProducts)
    const products = useSelector(selectProducts)
    const dispatch = useDispatch()

    useEffect(() => {
        getProducts(dispatch)
    }, [dispatch]);

    function submitAddProduct(product) {
        if (cardProducts.some((x) => x.id === product.id))
            return

        console.log(product)
    }

    return (
        <div className={"p-3 w-full"}>
            <Title content={"Modification des entrées"}
                   subTitle={"Ajoutez ou retirer des entrées de cette carte"}
                   className={"w-1/2"}/>

            <div className={"flex w-full justify-around mt-3"}>
                <div>
                    <h3 className={"text-xl font-semibold"}>Entrées sur la carte</h3>
                    <table>
                        <thead>
                        <tr>
                            <td>Id</td>
                            <td className={"min-w-32"}>Label</td>
                            <td>Price</td>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            cardProducts?.map((product) => {
                                return (
                                    <tr key={product.id}
                                        className={"hover:bg-stone-300"}>
                                        <td>{product.id}</td>
                                        <td>{product.label}</td>
                                        <td>{product.price}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>

                <div className={"flex"}>
                    <div>
                        <h3 className={"text-xl font-semibold"}>Entrées</h3>
                        <table>
                            <thead>
                            <tr>
                                <td></td>
                                <td>Id</td>
                                <td className={"min-w-32"}>Label</td>
                                <td>Price</td>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                products.data?.map((product) => {
                                    if (cardProducts.some((x) => x.id === product.id))
                                        return null;

                                    return (
                                        <tr key={product.id}
                                            onDoubleClick={() => dispatch(addProduct(product))}>
                                            <td onClick={() => dispatch(addProduct(product))}>
                                                <img src={GetImgByFormat("plus_bright", 16)} alt=""/>
                                            </td>
                                            <td>{product.id}</td>
                                            <td>{product.label}</td>
                                            <td>{product.price}</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}