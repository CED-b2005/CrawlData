const speakerPayload = (id = 1) => {
    const payload = {
        "url": "get_list_guest",
        "page": `${id}`,
        "menu_id": "2",
        "lang": "vi"
    }
    return payload
}

const eventsPayload = (id = 0) => {
    const payload = {
        "url": "get_program",
        "id": `${id}`,
        "lang": "vi"
    }
    return payload
}

module.exports = { eventsPayload, speakerPayload }