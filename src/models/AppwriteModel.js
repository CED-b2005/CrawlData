class AppwriteModel {
    collections;
    constructor(collections = "") {
        this.collections = ["id"]
        if (typeof(collections) == "string") {
            if (collections.trim() !== "") {
                collections = collections.split(",")
            }
        }
        if (collections != []) {
            collections.forEach(((collection) => {
                if (collection.trim() !== "") this.collections.push(collection.trim());
            }))
        }
    }

    payload(payloads = [], data = "") {
        if (payloads) {
            payloads.forEach((payload) => {
                if (this.collections.includes(payload.key.trim())) {
                    if (data != "") data += ",";
                    data += `"${payload.key.trim()}" : "${payload.value}"`
                }
            })
            return JSON.parse("{" + data + "}");
        } else return false
    }
}

module.exports = AppwriteModel