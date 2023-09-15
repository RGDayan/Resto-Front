import React, {useEffect} from "react";
import NavigationButton from "../../divers/navigations/bouton_navigation";
import {Outlet, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getStarters} from "../../../query/productsQuery/startersQuery";
import {selectProducts} from "../../../redux/selectors";

export default function Starters(){
    const products = useSelector(selectProducts)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        getStarters(dispatch)
    }, []);

    return (
        <div>
            <nav className={"flex p-1 space-x-2"}>
                <NavigationButton id={"retour-button"}
                                  imgSrc={"back_arrow_bright"}
                                  imgFormat={16}
                                  onClick={() => navigate("/products")}
                                  className={"rounded-lg"}  />
                <NavigationButton id={"retour-button"}
                                  imgSrc={"plus_bright"}
                                  imgFormat={16}
                                  onClick={() => navigate("/products/starters/create")}
                                  className={"rounded-lg"} />
            </nav>

            <section>
                <Outlet context={products} />
            </section>
        </div>
    )
}