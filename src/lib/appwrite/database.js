const { ID } = require('appwrite')
const { Query } = require('appwrite')
const { databases } = require("./config");

require("dotenv").config()
const database_id = process.env.APPWRITE_DATABASE_ID;

const db = {}

const collections = [{
    id: process.env.APPWRITE_COLLECTION_EVENTS_ID,
    name: "events"
}, {
    id: process.env.APPWRITE_COLLECTION_WEBS_ID,
    name: "webs"
}, {
    id: process.env.APPWRITE_COLLECTION_WEB_EVENT_ID,
    name: "web_event"
}, {
    id: process.env.APPWRITE_COLLECTION_STARTUPS_ID,
    name: "startups"
}, {
    id: process.env.APPWRITE_COLLECTION_STARTUP_EVENT_ID,
    name: "startup_event"
}, {
    id: process.env.APPWRITE_COLLECTION_SPEAKERS_ID,
    name: "speakers"
}, {
    id: process.env.APPWRITE_COLLECTION_SPEAKER_EVENT_ID,
    name: "speaker_event"
}, {
    id: process.env.APPWRITE_COLLECTION_TIMELINE_ID,
    name: "time_line"
}]

collections.forEach((collection) => {
    db[collection.name] = {
        create: (payload, permissions, id = ID.unique()) =>
            databases.createDocument(
                database_id,
                collection.id,
                id,
                payload,
                permissions
            ),
        update: (id, payload, permissions) =>
            databases.updateDocument(
                database_id,
                collection.id,
                id,
                payload,
                permissions
            ),
        delete: (id) => databases.deleteDocument(database_id, collection.id, id),

        list: (queries = []) => databases.listDocuments(database_id, collection.id, queries),

        get: (id) => databases.getDocument(database_id, collection.id, id),
    }
})

module.exports = db;