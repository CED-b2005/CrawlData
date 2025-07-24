const AppwriteModel = require("./AppwriteModel")
class WebModel extends AppwriteModel {
    constructor() {
        super(["name", "url"])
    }
}

module.exports = WebModel