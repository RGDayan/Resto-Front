import './App.css';
import React from "react";
import Settings from "./ui_components/settings/settings";
import {Outlet, Route, Routes} from "react-router-dom";
import Service from "./ui_components/services/service";
import Cards from "./ui_components/cards/cards";
import HorizontalSeparator from "./ui_components/divers/separators/horizontal_separator";
import FormCard from "./ui_components/cards/form_card";
import ShowCard from "./ui_components/cards/show_card";
import Products from "./ui_components/products/products";
import Starters from "./ui_components/products/starters/starters";
import ListProducts from "./ui_components/products/list_products";

function App() {
    return (
        <div className={"flex flex-col h-full overflow-y-hidden"}>
            <Settings />
            <HorizontalSeparator verticalMargin={""}/>
            <Routes >
                <Route path={"/"} element={<Service />}/>
                <Route path={"/service"} element={<Service />}/>
                <Route path={"/open-service"} element={"ouverture du service"}/>

                {/*PRODUCTS ROUTES*/}
                <Route path={"/products"} element={<Products />}/>
                <Route path={"/products/starters"} element={<Starters />}>
                    <Route path={"/products/starters"} element={<ListProducts />}/>
                </Route>
                <Route path={"/products"} element={<Products />}/>
                <Route path={"/products"} element={<Products />}/>
                <Route path={"/products"} element={<Products />}/>


                {/*CARD ROUTES*/}
                <Route path={"/cards"} element={<Cards />}>
                    <Route path={"/cards/create"} element={<FormCard id={"create-card"}
                                                                     title={"Créez une nouvelle carte"}
                                                                     subTitle={"Les cartes sont la représentation des produits servis pas service"}
                                                                     method={"POST"}/>} />
                    <Route path={"/cards/:cardId"} element={<ShowCard />} />
                    <Route path={"/cards/:cardId/update"} element={<FormCard id={"update-card"}
                                                                             title={"Modifier une carte"}
                                                                             method={"PUT"}/>} />
                </Route>

            </Routes>
            <Outlet/>
        </div>
    );
}

export default App;