const speaker = (name = "", img = "", position = "", description = "") => {
    const speaker = {
        "name": name,
        "img": img,
        "position": position,
        "description": description
    }

    return speaker
}

const detail = (date = "", timeline = "", title = "", place = "") => {
    const event = {
        "date": date,
        "timeline": timeline,
        "title": title,
        "place": place
    }

    return event
}

const timeline = (name = "", start_day = "", end_day = "") => {
    const event_db = {
        "name": name,
        "start_day": start_day,
        "end_day": end_day
    }
    return event_db
}

const project = (title = "", name = "", img = "", link = "", description = "") => {
    const project = {
        "title": title,
        "name": name,
        "img": img,
        "link": link,
        "description": description
    }

    return project
}

module.exports = { speaker, detail, timeline, project }