const AppwriteModel = require("./AppwriteModel");

class SpeakerModel extends AppwriteModel {
    constructor() {
        super("name, img, position")
    }
}

module.exports = SpeakerModel