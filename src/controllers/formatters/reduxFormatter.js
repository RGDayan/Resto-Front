export function preparePropertyAction(e) {
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
            payload.value = formatCurrency(e.target.value)
            break;
        default:
            payload.value = e.target.value
            break;
    }

    return payload;
}


function formatCurrency(value) {
    value = value.replace('-', '')
    if (value[0] === 0 && value[1] !== 0)
        value = value.substring(1)

    return value
}