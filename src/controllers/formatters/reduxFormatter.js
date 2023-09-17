export function preparePropertyAction(e, formatDecimals) {
    let payload = {}

    payload.name = e.target.name

    switch (e.target.type){
        case "text": case "time":
            payload.value = e.target.value
            break;
        case "checkbox":
            payload.value = e.target.checked
            break;
        case "number":
            payload.value = formatCurrency(e.target.value, formatDecimals)
            break;
        default:
            payload.value = e.target.value
            break;
    }

    return payload;
}


function formatCurrency(value, decimals) {
    if (value[0] === "-")
        value = value.substring(1)
    while (value[0] === "0")
        value = value.substring(1)

    if (value.split(".")[1] !== "" && value.split(".")[1] !== undefined)
        if (value.split(".")[1].length > decimals)
            value = value.split(".")[0] + "." + value.split(".")[1].substring(1, decimals + 1)

    return value
}