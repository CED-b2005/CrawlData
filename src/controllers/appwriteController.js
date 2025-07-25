const db = require("../lib/appwrite/database");
const { databases } = require("../lib/appwrite/database")
class AppwriteController {
    collectionName

    constructor(collectionName) {
        this.collectionName = collectionName;
    }

    create(payload, permissions, id) {
        return db[this.collectionName].create(payload, permissions, id);
    }

    update(id, payload, permissions) {
        return db[this.collectionName].update(id, payload, permissions);
    }

    delete(id) {
        return db[this.collectionName].delete(id);
    }

    list(queries = []) {
        return db[this.collectionName].list(queries);
    }

    get(id) {
        return db[this.collectionName].get(id);
    }
}

module.exports = AppwriteController