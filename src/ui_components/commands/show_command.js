import React, {useEffect} from "react";
import {Outlet, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getCommand} from "../../query/commandQuery";
import NavigationCommand from "./navigation_command";
import VerticalSeparator from "../divers/separators/vertical_separator";
import SummaryCommand from "./summary_command";
import ContentWrapper from "../divers/wrappers/content_wrapper";

export default function ShowCommand(){
    const dispatch = useDispatch()
    const { idCommand } = useParams()

    useEffect(() => {
        getCommand(dispatch, idCommand)
    }, [dispatch, idCommand]);

    return (
        <div className={"flex w-full h-full"}>
            <ContentWrapper className={"relative w-full"}>
                <NavigationCommand />
                <Outlet />
            </ContentWrapper>
            <VerticalSeparator verticalMargin={""}/>
            <SummaryCommand />
        </div>
    )
}