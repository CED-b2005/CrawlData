require("dotenv").config();
const { Pinecone } = require('@pinecone-database/pinecone');

const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API });

const assistantName = 'assistant';

const assistant = pinecone.Assistant(assistantName);

const createAssistant = async (name = "assistant") => {
    try {
        const assistant = await pinecone.createAssistant({
            name,
            instructions: 'Use Vietnamese to awser.',
            region: 'us'
        });

        return assistant
    } catch (error) { return error }
}

const uploadFile = async (path) => {
    if (path) {
        const response = await assistant.uploadFile({ path })
        return response;
    };
}

const deleteFileUpload = async (fileId) => {
    if (fileId) {
        const file = await assistant.deleteFile(fileId)
        return file || true
    }
}

const chatResponse = async (message) => {
    if (message) {
        const response = await assistant.chat({
            messages: [{ role: 'user', content: message}]
        });
        return response
    }
}

module.exports = { createAssistant, uploadFile, deleteFileUpload , chatResponse}