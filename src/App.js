import './App.css';
import React from "react";
import Settings from "./ui_components/settings/settings";
import {Outlet, Route, Routes} from "react-router-dom";
import Service from "./ui_components/services/service";
import Cards from "./ui_components/cards/cards";
import HorizontalSeparator from "./ui_components/divers/separators/horizontal_separator";
import CreateCard from "./ui_components/cards/create_card";

function App() {
    return (
        <div className={"flex flex-col overflow-y-hidden"}>
            <Settings />
            <HorizontalSeparator verticalMargin={""}/>
            <Routes >
                <Route path={"/"} element={<Service />}/>
                <Route path={"/service"} element={<Service />}/>
                <Route path={"/open-service"} element={"ouverture du service"}/>
                <Route path={"/cards"} element={<Cards />}>
                    <Route path={"/cards/create-card"} element={<CreateCard />} />
                </Route>
                <Route path={"/products"} element={"produits"}/>
            </Routes>
            <Outlet/>
        </div>
    );
}

export default App;