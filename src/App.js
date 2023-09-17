import './App.css';
import React from "react";
import Settings from "./ui_components/settings/settings";
import {Outlet, Route, Routes} from "react-router-dom";
import Service from "./ui_components/services/service";
import Cards from "./ui_components/cards/cards";
import HorizontalSeparator from "./ui_components/divers/separators/horizontal_separator";
import FormCard from "./ui_components/cards/form_card";
import ShowCard from "./ui_components/cards/show_card";
import CategorieProducts from "./ui_components/products/categorie_products";
import Products from "./ui_components/products/products";
import ListProducts from "./ui_components/products/list_products";
import FormProduct from "./ui_components/products/form_product";
import ShowProduct from "./ui_components/products/show_product";

function App() {
    return (
        <div className={"flex flex-col h-full overflow-y-hidden"}>
            <Settings />
            <HorizontalSeparator verticalMargin={""}/>
            <Routes >
                <Route path={"/"} element={<Service />}/>
                <Route path={"/service"} element={<Service />}/>
                <Route path={"/open-service"} element={"ouverture du service"}/>

                {/*STARTERS ROUTES*/}
                <Route path={"/products"} element={<CategorieProducts />}/>
                <Route path={"/products/starters"} element={<Products category={"starters"}/>}>
                    <Route path={"/products/starters"} element={<ListProducts category={"starters"} />}/>
                    <Route path={"/products/starters/create"}
                           element={<FormProduct id={"create-starter"}
                                                 category={"starters"}
                                                 title={"Ajoutez une nouvelle entrée"}
                                                 subTitle={"Les entrées seront affichées dans la catégorie des produits correspondants"}
                                                 method={"POST"} />}/>
                    <Route path={"/products/starters/:idProduct"} element={<ShowProduct category={"starters"}/>}/>
                    <Route path={"/products/starters/:idProduct/update"}
                           element={<FormProduct id={"update-starter"}
                                                 category={"starters"}
                                                 title={"Modifiez une entrée"}
                                                 method={"PUT"}/>}/>
                </Route>

                {/*DISHES ROUTES*/}
                <Route path={"/products"} element={<CategorieProducts />}/>
                <Route path={"/products/dishes"} element={<Products category={"dishes"}/>}>
                    <Route path={"/products/dishes"} element={<ListProducts category={"dishes"} />}/>
                    <Route path={"/products/dishes/create"}
                           element={<FormProduct id={"create-dish"}
                                                 category={"dishes"}
                                                 title={"Ajoutez un nouveau plat"}
                                                 subTitle={"Les plats seront affichées dans la catégorie des produits correspondants"}
                                                 method={"POST"} />}/>
                    <Route path={"/products/dishes/:idProduct"} element={<ShowProduct category={"dishes"}/>}/>
                    <Route path={"/products/dishes/:idProduct/update"}
                           element={<FormProduct id={"update-dish"}
                                                 category={"dishes"}
                                                 title={"Modifiez un plat"}
                                                 method={"PUT"}/>}/>
                </Route>

                {/*DESSERTS ROUTES*/}
                <Route path={"/products"} element={<CategorieProducts />}/>
                <Route path={"/products/desserts"} element={<Products category={"desserts"}/>}>
                    <Route path={"/products/desserts"} element={<ListProducts category={"desserts"} />}/>
                    <Route path={"/products/desserts/create"}
                           element={<FormProduct id={"create-dessert"}
                                                 category={"desserts"}
                                                 title={"Ajoutez un nouveau dessert"}
                                                 subTitle={"Les desserts seront affichées dans la catégorie des produits correspondants"}
                                                 method={"POST"} />}/>
                    <Route path={"/products/desserts/:idProduct"} element={<ShowProduct category={"desserts"}/>}/>
                    <Route path={"/products/desserts/:idProduct/update"}
                           element={<FormProduct id={"update-dessert"}
                                                 category={"desserts"}
                                                 title={"Modifiez un dessert"}
                                                 method={"PUT"}/>}/>
                </Route>

                {/*BEVERAGES ROUTES*/}
                <Route path={"/products"} element={<CategorieProducts />}/>
                <Route path={"/products/beverages"} element={<Products category={"beverages"}/>}>
                    <Route path={"/products/beverages"} element={<ListProducts category={"beverages"} />}/>
                    <Route path={"/products/beverages/create"}
                           element={<FormProduct id={"create-beverage"}
                                                 category={"beverages"}
                                                 title={"Ajoutez une nouvelle boisson"}
                                                 subTitle={"Les boissons seront affichées dans la catégorie des produits correspondants"}
                                                 method={"POST"} />}/>
                    <Route path={"/products/beverages/:idProduct"} element={<ShowProduct category={"beverages"}/>}/>
                    <Route path={"/products/beverages/:idProduct/update"}
                           element={<FormProduct id={"update-beverage"}
                                                 category={"beverages"}
                                                 title={"Modifiez une boisson"}
                                                 method={"PUT"}/>}/>
                </Route>

                {/*CARD ROUTES*/}
                <Route path={"/cards"} element={<Cards />}>
                    <Route path={"/cards/create"}
                           element={<FormCard id={"create-card"}
                                              title={"Créez une nouvelle carte"}
                                              subTitle={"Les cartes sont la représentation des produits servis pas service"}
                                              method={"POST"}/>} />
                    <Route path={"/cards/:cardId"} element={<ShowCard />} />
                    <Route path={"/cards/:cardId/update"}
                           element={<FormCard id={"update-card"}
                                              title={"Modifier une carte"}
                                              method={"PUT"}/>} />
                </Route>

            </Routes>
            <Outlet/>
        </div>
    );
}

export default App;