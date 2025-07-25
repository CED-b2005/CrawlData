const db = require("../lib/appwrite/database");
const AppwriteController = require("./appwriteController");

class eventController extends AppwriteController {
    constructor() {
        super("events");
    };

    insertData(eventList = []) {
        eventList.forEach((event) => {
            const name = event.time;
            const date = event.day
            event.details.forEach((detail) => {
                this.create({
                    "name": name,
                    "date": date,
                    "timeline": detail.timeLine,
                    "title": detail.title,
                })
            })
        })
    }

};

module.exports = eventController;