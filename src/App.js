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
import FormCardProducts from "./ui_components/cards/relations/form_card_products";
import NavigationCard from "./ui_components/cards/navigation_card";
import FormService from "./ui_components/services/form_service";
import Home from "./ui_components/home";
import FormCommand from "./ui_components/commands/form_command";
import ShowCommand from "./ui_components/commands/show_command";
import CategorieProductsCommand from "./ui_components/commands/relations/categorie_products_command";
import FormCommandProducts from "./ui_components/commands/relations/form_command_products";

function App() {
    return (
        <div className={"flex flex-col h-full overflow-y-hidden"}>
            <Settings />
            <HorizontalSeparator verticalMargin={""}/>
            <Routes >
                <Route path={"/"} element={<Home />}/>
                <Route path={"/service"} element={<Service />}/>
                <Route path={"/service/commands/create"} element={<FormCommand />} />
                <Route path={"/service/commands/:idCommand"} element={<ShowCommand />} >
                    <Route path={"/service/commands/:idCommand"} element={<CategorieProductsCommand />} />
                    <Route path={"/service/commands/:idCommand/:category"} element={<FormCommandProducts />}/>
                </Route>
                <Route path={"/service/create"} element={<FormService />}/>

                {/*STARTERS ROUTES*/}
                <Route path={"/products"} element={<CategorieProducts />}/>
                <Route path={"/products/starter"} element={<Products category={"starter"}/>}>
                    <Route path={"/products/starter"} element={<ListProducts category={"starter"} />}/>
                    <Route path={"/products/starter/create"}
                           element={<FormProduct id={"create-starter"}
                                                 category={"starter"}
                                                 title={"Ajoutez une nouvelle entrée"}
                                                 subTitle={"Les entrées seront affichées dans la catégorie des produits correspondants"}
                                                 method={"POST"} />}/>
                    <Route path={"/products/starter/:idProduct"} element={<ShowProduct category={"starter"}/>}/>
                    <Route path={"/products/starter/:idProduct/update"}
                           element={<FormProduct id={"update-starter"}
                                                 category={"starter"}
                                                 title={"Modifiez une entrée"}
                                                 method={"PUT"}/>}/>
                </Route>

                {/*DISHES ROUTES*/}
                <Route path={"/products/dish"} element={<Products category={"dish"}/>}>
                    <Route path={"/products/dish"} element={<ListProducts category={"dish"} />}/>
                    <Route path={"/products/dish/create"}
                           element={<FormProduct id={"create-dish"}
                                                 category={"dish"}
                                                 title={"Ajoutez un nouveau plat"}
                                                 subTitle={"Les plats seront affichées dans la catégorie des produits correspondants"}
                                                 method={"POST"} />}/>
                    <Route path={"/products/dish/:idProduct"} element={<ShowProduct category={"dish"}/>}/>
                    <Route path={"/products/dish/:idProduct/update"}
                           element={<FormProduct id={"update-dish"}
                                                 category={"dish"}
                                                 title={"Modifiez un plat"}
                                                 method={"PUT"}/>}/>
                </Route>

                {/*DESSERTS ROUTES*/}
                <Route path={"/products/dessert"} element={<Products category={"dessert"}/>}>
                    <Route path={"/products/dessert"} element={<ListProducts category={"dessert"} />}/>
                    <Route path={"/products/dessert/create"}
                           element={<FormProduct id={"create-dessert"}
                                                 category={"dessert"}
                                                 title={"Ajoutez un nouveau dessert"}
                                                 subTitle={"Les desserts seront affichées dans la catégorie des produits correspondants"}
                                                 method={"POST"} />}/>
                    <Route path={"/products/dessert/:idProduct"} element={<ShowProduct category={"dessert"}/>}/>
                    <Route path={"/products/dessert/:idProduct/update"}
                           element={<FormProduct id={"update-dessert"}
                                                 category={"dessert"}
                                                 title={"Modifiez un dessert"}
                                                 method={"PUT"}/>}/>
                </Route>

                {/*BEVERAGES ROUTES*/}
                <Route path={"/products/beverage"} element={<Products category={"beverage"}/>}>
                    <Route path={"/products/beverage"} element={<ListProducts category={"beverage"} />}/>
                    <Route path={"/products/beverage/create"}
                           element={<FormProduct id={"create-beverage"}
                                                 category={"beverage"}
                                                 title={"Ajoutez une nouvelle boisson"}
                                                 subTitle={"Les boissons seront affichées dans la catégorie des produits correspondants"}
                                                 method={"POST"} />}/>
                    <Route path={"/products/beverage/:idProduct"} element={<ShowProduct category={"beverage"}/>}/>
                    <Route path={"/products/beverage/:idProduct/update"}
                           element={<FormProduct id={"update-beverage"}
                                                 category={"beverage"}
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
                    <Route path={"/cards/:cardId"} element={<NavigationCard />}>
                        <Route path={"/cards/:cardId/show"} element={<ShowCard />} />
                        <Route path={"/cards/:cardId/update"}
                               element={<FormCard id={"update-card"}
                                                  title={"Modifier une carte"}
                                                  method={"PUT"}/>} />
                        <Route path={"/cards/:cardId/add-products"} element={<FormCardProducts />} />
                    </Route>
                </Route>

            </Routes>
            <Outlet/>
        </div>
    );
}

export default App;