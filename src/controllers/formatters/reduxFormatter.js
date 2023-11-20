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


function formatCurrency(value, nbDecimals) {
    if (value[0] === "-")
        value = value.substring(1)
    while (value[0] === "0" && value[1] !== ".")
        value = value.substring(1)

    let decimals = value.split(".")[1]
    if (decimals !== "" && decimals !== undefined)
        if (decimals.length > nbDecimals)
            value = value.split(".")[0] + "." + decimals.substring(1, nbDecimals + 1)

    return value
}