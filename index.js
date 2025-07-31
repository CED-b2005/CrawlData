require('dotenv').config()
const express = require('express');
const app = express();
const axios = require("axios")

const supabase = require("./src/lib/supabase/supabase");
const fetchData = require("./src/lib/funcs/fetchData");
const createRouter = require("./src/routes/routes");
const groqAI = require("./src/lib/funcs/groqAI");


const PORT = process.env.PORT || 8800;

app.get("/", async(req, res) => {
    const ids = req.query.ids;
    res.send("Hello World! : " + ids);
})

app.use(express.json());
app.use("/user", createRouter(express, "user"));
app.use("/products", createRouter(express, "product"));

app.get("/speakers", async(req, res) => {
    const speakerModel = require("./src/models/speakerModel");
    const response = await speakerModel.get()
    res.send(response);
})

app.get("/ai", async(req, res) => {
    const message = req.query.message;
    const response = await groqAI(message)
    res.json(response)
})



app.get("/fetch", async(req, res) => {
    const response = await fetchData.get("https://api.dictionaryapi.dev/api/v2/entries/en/hello", {}, {})
    res.send(response)
})

app.post("/post", async(req, res) => {
    const response = await callGroq(post)
    const rpc = processing(response);
    supabase.rpc(rpc)
    res.send(response)
})

app.listen(8800, () => {
    console.log("project: " + process.env.PROJECT);
    console.log("port: http://localhost:" + 8800)
})

app.get("/test", async(req, res) => {
    const response = await callGroq(post)
    const data = processing(response)
    console.log(data)
    const a = await fetchData.post("https://hdtfamxisvbyxeiskzdf.supabase.co/functions/v1/super-task/API-chat", {
        query: data,
    }, {
        Authorization: "Bearer " + process.env.SUPABASE_SERVICE_ROLE,
        "Content-Type": "application/json"
    })

    res.send(a.data)
})

async function callGroq(prompt) {
    try {
        const response = await axios.post(
            process.env.GROQ_API_URL, {
                model: 'gemma2-9b-it', // Hoặc "mixtral-8x7b-32768", tùy bạn
                messages: [
                    { role: 'user', content: prompt }
                ],
                temperature: 0.7
            }, {
                headers: {
                    'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // console.log('✅ Phản hồi từ Groq:\n', response.data.choices[0].message.content);
        return response.data.choices[0].message.content;
    } catch (error) {
        // console.error('❌ Lỗi khi gọi API Groq:', error.response ? error.response.data : error.message);

    }
}