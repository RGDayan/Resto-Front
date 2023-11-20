import {setService} from "../redux/reducers/serviceReducer";

export const getCurrentService = (dispatch) => {
    fetch(process.env.REACT_APP_URL_API_RESTO + "/services/current")
        .then(async (res) => {
            const resultat = await res.json()
            dispatch(setService(resultat))
        })
}

export const getLastService = (dispatch) => {
    fetch(process.env.REACT_APP_URL_API_RESTO + "/services/latest")
        .then(async (res) => {
            const resultat = await res.json()
            dispatch(setService(resultat))
        })
}

export const createService = (dispatch, service) => {
    fetch(process.env.REACT_APP_URL_API_RESTO + "/services", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...service,
            openedDate: service.openedDate.replace(" " , "T")
        })
    }).then(async () => {
        getCurrentService(dispatch)
    })
}

export const closeService = (dispatch, service) => {
    fetch(process.env.REACT_APP_URL_API_RESTO + "/services/" + service.id, {
        method: "DELETE"
    }).then(async () => {
        getCurrentService(dispatch)
    })
}