const { Query } = require("appwrite");
const db = require("../lib/appwrite/database");
const AppwriteController = require("./appwriteController");

class speakerController extends AppwriteController {
    constructor() {
        super("speakers");
    };

    insertData(speakerList = []) {
        speakerList.forEach(speaker => {
            this.create({
                name: speaker.name,
                img: speaker.img,
                position: speaker.position
            })
        });
    }
};

module.exports = speakerController;