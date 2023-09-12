import './App.css';
import React from "react";
import Settings from "./ui_components/settings/settings";
import {Outlet, Route, Routes} from "react-router-dom";
import Service from "./ui_components/services/service";

function App() {
    return (
        <div className={"flex flex-col overflow-y-hidden"}>
            <Settings />
            <Routes >
                <Route path={"/"} element={<Service />}/>
                <Route path={"/service"} element={<Service />}/>
                <Route path={"/open-service"} element={"ouverture du service"}/>
                <Route path={"/cards"} element={"cartes"}/>
                <Route path={"/products"} element={"produits"}/>
            </Routes>
            <Outlet/>
        </div>
    );
}

export default App;