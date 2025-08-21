require('dotenv').config()
const express = require('express');
const cors = require("cors")
const app = express();

const PORT = process.env.PORT || 8800;

// require libraries
const gemini = require("./src/lib/gemini/gemini")
const chatbot = require("./src/lib/funcs/chatbot");
const { checkPrompt, lastQuestion, aiModels, formatData } = require("./src/lib/funcs/logic");
const { semanticSearch } = require("./src/lib/pinecone/pinecone");
const { speaker } = require('./src/lib/crawler/surfdanang/objects');

const router = require("./src/routes/router");

app.use(cors());
app.use(express());
app.use(express.json());

app.use("/api/event", router(express, "event"));
app.use("/api/speaker", router(express, "speaker"));
app.use("/api/startup", router(express, "startup"));
app.use("/api/news", router(express, "news"));
app.use("/api/project", router(express, "project"));

app.get("/", async(req, res) => {
    res.send("Hello World! : ");
})

app.get("/chatbot", async(req, res) => {
    const { message } = req.query
    const response = await chatbot(checkPrompt(message), aiModels.gemma2_9b_it);
    const data = formatData(response, "[", "]").replace("[", "").replace("]").split(",");
    let info = ""
    for (let i = 0; i < data.length; i++) {
        if (!data) continue;
        const result = await semanticSearch(data[i])
        info += JSON.stringify(result)
    }

    const latsAnswer = await gemini(lastQuestion(info, message))
    return res.json({ response: latsAnswer })
})

// ------------- testing functions -------------

app.use("/api/crawler", router(express, "crawler"));


app.get("/test", async(req, res) => {
    const {createAssistant, uploadFile, deleteUploadFile, chatResponse } = require("./src/lib/pinecone/assistant.pinecone");
    const {message} = req.query;
    const response = await chatResponse(message);
    res.json(response)

    
    
})

// ---------------------------------------------

app.listen(8800, () => {
    console.log("project: " + process.env.PROJECT);
    console.log("port: http://localhost:" + 8800)
})