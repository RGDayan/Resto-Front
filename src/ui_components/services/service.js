import React from "react";
import {useQuery} from "react-query";
import {useDispatch} from "react-redux";
import {setService} from "../../redux/reducers/service";

export default function Service(){
    const dispatch = useDispatch();

    const {data} = useQuery(
        "getCurrentService",
        async () => {
            return fetch("http://localhost:9000/service")
                .then(async (res) => {
                    const resultat = await res.json()
                    dispatch(setService(resultat))
                    console.log(resultat)
                    return resultat
                })
        }
    )

    return (
        <div>
            {data.error}
        </div>
    );
}