const db = require("../lib/appwrite/database");
const AppwriteController = require("./appwriteController");

class webController extends AppwriteController {
    constructor() {
        super("webs");
    };
};

module.exports = webController;