const db = require("../lib/appwrite/database");
const { ID } = require('appwrite')

class AppwriteController {
    collectionName

    constructor(collectionName) {
        this.collectionName = collectionName;
    }

    create(payload, permissions, id) {
        db[this.collectionName].create(payload, permissions, id = ID.unique());
    }

    update(id, payload, permissions) {
        db[this.collectionName].update(id, payload, permissions);
    }

    delete(id) {
        db[this.collectionName].delete(id);
    }

    list(queries = []) {
        db[this.collectionName].list(queries);
    }

    get(id) {
        db[this.collectionName].get(id);
    }
}

module.exports = AppwriteController