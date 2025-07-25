const AppwriteModel = require("./AppwriteModel")

class StartupModel extends AppwriteModel {
    constructor() {
        super("project_name, logo, description, website")
    }
}

module.exports = StartupModel