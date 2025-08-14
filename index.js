require('dotenv').config()
const express = require('express');
const cors = require("cors")
const app = express();
const axios = require("axios")

const PORT = process.env.PORT || 8800;

// require libraries
const supabase = require("./src/lib/supabase/supabase");
const gemini = require("./src/lib/gemini/gemini")
const chatbot = require("./src/lib/funcs/chatbot");
const { router, controller, model } = require("./src/lib/funcs/requires");
const { checkPrompt, lastQuestion, aiModels, formatData } = require("./src/lib/funcs/logic");
const { semanticSearch } = require("./src/lib/pinecone/pinecone");
const { speaker } = require('./src/lib/crawler/surfdanang/objects');

app.use(cors());
app.use(express());
app.use(express.json());

// app.use("/api/event", router(express, "event"));
// app.use("/api/speaker", router(express, "speaker"));
// app.use("/api/startup", router(express, "startup"));
// app.use("/api/news", router(express, "news"));
// app.use("/api/project", router(express, "project"));

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

app.get("/crawl", async(req, res) => {
    const crawlData = controller("surfdanang")
    const x = await crawlData();

    console.log(x);
    res.send(x);
})

// ------------- testing functions -------------

app.get("/ai", async(req, res) => {
    const { message } = req.query
    const ask = `
    phân tích câu yêu cầu nhập vào thành dạng: 
    câu hỏi liên quan tới người, chức vụ => person
    câu hỏi liên quan tới dự án, công ti, nhà tài trợ => startup
    câu hỏi liên quan tin tức => news
    câu hỏi liên quan sự kiện => event
    câu hỏi khác => other
    định dạng câu trả lời (tạo mảng nếu câu hỏi / yêu cầu nhiều hơn 1):
    ''' [{
        categories: [loại câu hỏi],
        question: 'câu hỏi'
    }]'''

    Yêu cầu: 
    `;
    const response = await chatbot(ask + message, aiModels.gemma2_9b_it);
    return res.send(response);
})


app.get("/test", async(req, res) => {
    // const sufdanangController = require("./src/controllers/surfdanang.controller");
    // const beta = await sufdanangController();

    const { startup_StartupWheel, startupDanang } = require("./src/controllers/other/startup.controller");
    const beta = await startupDanang();

    console.log(beta);

    return res.send(beta);
})

// ---------------------------------------------

app.listen(8800, () => {
    console.log("project: " + process.env.PROJECT);
    console.log("port: http://localhost:" + 8800)
})