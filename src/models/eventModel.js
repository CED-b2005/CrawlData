const AppwriteModel = require("./AppwriteModel")
class EventModel extends AppwriteModel {
    constructor() {
        super("name, day, description")
    }
}

module.exports = EventModel