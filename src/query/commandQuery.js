import {setCommand} from "../redux/reducers/commandReducer";

export const getCommand = (dispatch, id) => {
    fetch(process.env.REACT_APP_URL_API_RESTO + "/commands/" + id)
        .then(async (res) => {
            const resultat = await res.json()
            dispatch(setCommand(resultat))
        })
}
export const createCommand = (dispatch, navigate, command) => {
    fetch(process.env.REACT_APP_URL_API_RESTO + "/commands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ...command,
            service: {
                id: command.service.id
            }
        })
    }).then(async (res) => {
        const resultat = await res.json()
        dispatch(setCommand(resultat))
        navigate("/service/commands/" + resultat.id)
        getCommand(dispatch, resultat.id)
    })
}

export const addCommandProduct = (dispatch, command, product) => {
    fetch(process.env.REACT_APP_URL_API_RESTO + "/commands/" + command.id + "/products/" + product.id, {
        method: "POST"
    }).then(() => getCommand(dispatch, command.id))
}

export const reduceCommandProduct = (dispatch, command, product) => {
    fetch(process.env.REACT_APP_URL_API_RESTO + "/commands/" + command.id + "/products/" + product.id, {
        method: "PUT"
    }).then(() => getCommand(dispatch, command.id))
}