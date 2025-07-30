require('dotenv').config()
const express = require('express');
const app = express();
const axios = require("axios")

const createRouter = require("./src/routes/routes");
const fetchData = require("./src/lib/funcs/fetchData");
const supabase = require("./src/lib/supabase/supabase");

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
    console.log("ai question?");
    callGroq(req.query.message, res)
})



app.get("/fetch", async(req, res) => {
    const response = await fetchData.get("https://api.dictionaryapi.dev/api/v2/entries/en/hello", {}, {})
    res.send(response)
})
const processing = (response = "") => {
    response = response.replaceAll("```", "段").split("段")
    console.log(response);
    if (response.length >= 3) return response[1].replace(";", "")
    else false
}

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

var post = `
# time now: ${new Date()}
#với database như sau:
    -events(id, name, title, date ? , info, description) -
    -event_details(id, event_id, timeline, info, description) -
    -speakers(id, name, img, position, info, description) -
    -startups(id, name, project, logo, project_img, info, description) -
    -investment_funds(id, name, logo, info, description) -
    -speaker_event(speaker_id, event_id, note) -
    -investment_fund_event(investment_fund_id, event_id, note) -
    -startup_event(start_up_id, event_id, note)

hãy chuyển văn bản vản nhập vào thành lệnh truy vấn database Supabase !!!:

văn bản nhập vào: 'truy vấn các speaker tham gia các sự kiện tháng 7'
`