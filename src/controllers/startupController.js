const db = require("../lib/appwrite/database");
const AppwriteController = require("./appwriteController");

class webController extends AppwriteController {
    constructor() {
        super("startups");
    };

    insertData(startupList = []) {
        startupList.forEach((startup) => {
            this.create({
                "project_img": startup.product_img,
                "project_description": startup.description,
                "logo": startup.company_logo,
                "project": startup.project_name
            })
        })
    }
};

module.exports = webController;