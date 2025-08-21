require("dotenv").config();
const { Pinecone } = require('@pinecone-database/pinecone');
const { text } = require("express");
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API });

const vectorDB = {
    "startup": pinecone.index('startups', process.env.PINECONE_INDEX_STARTUPS).namespace("startups"),
    "person": pinecone.index('people', process.env.PINECONE_INDEX_PEOPLE).namespace("people"),
    "news": pinecone.index('news', process.env.PINECONE_INDEX_NEWS).namespace("news"),
    "other": pinecone.index('other', process.env.PINECONE_INDEX_OTHER).namespace("other"),
}

const record = (_id, data = "") => {
    return { "_id": _id, "text": data }
}

const upsertOne = async(index, record = {}) => {
    try {
        return await vectorDB[index].upsertRecords([record])
    } catch (error) {
        console.log("error when upsert: ", error)
        return false
    }
}

const upsertMany = async(index, records = [{}]) => {
    try {
        return await vectorDB[index].upsertRecords(records)
    } catch (error) {
        console.log("error when upsert: ", error)
        return false
    }
}

const semanticSearch = async(vectorDB, text = "", topK = 3) => {
    try {
        return await vectorDB.searchRecords({
            query: { topK: topK, inputs: { text: text }, },
            fields: ['text'],
        });

    } catch (error) {
        console.error("error when doing semantic search: ", error);
        return false;
    }
};

module.exports = { vectorDB, record, upsertOne, upsertMany, semanticSearch }