const eventController = require("./sufdanang/event.controller");
const speakerController = require("./sufdanang/speaker.controller");
const projectController = require("./sufdanang/project.controller");
const otherController = require("./sufdanang/other.controller");

const sufdanangController = async() => {
    const event_id = await eventController();
    speakerController(event_id);
    projectController(event_id)
    otherController(event_id)

    return ("IN PROCESS SURFDANANG CONTROLLER");
}

module.exports = sufdanangController;