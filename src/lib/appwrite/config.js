const { Account, Databases, Functions, Storage, Client } = require('appwrite')
require("dotenv").config();

const client = new Client()

client
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setDevKey(process.env.APPWRITE_DEV_KEY);

const databases = new Databases(client);
const storage = new Storage(client);
const account = new Account(client);
const functions = new Functions(client);

module.exports = { client, account, databases, functions, storage }