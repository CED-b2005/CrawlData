require('dotenv').config()
const express = require('express');
const app = express();
const { Query } = require('appwrite');


const createRouter = require("./src/routes/routes");
const fetchData = require("./src/lib/funcs/fetchData");
const controller = require("./src/lib/funcs/controller");
const encodeHexUTF8 = require("./src/lib/funcs/hexUTF8");

const PORT = process.env.PORT || 8800;

app.get("/", async(req, res) => {
    const ids = req.query.ids;
    res.send("Hello World! : " + ids);
})

app.use("/user", createRouter(express, "user"));
app.use("/products", createRouter(express, "product"));

app.get("/fetch", async(req, res) => {
    fetchData.get(
        (responseData) => {
            res.json(responseData);
        },
        "https://api.dictionaryapi.dev/api/v2/entries/en/hello", {}, {})
})

app.get("/crawl4AI", async(req, res) => {
    const crawl4AI = require("./src/lib/web/crawl4AI")
    const url = req.query.url
    const type = req.query.type
        // res.send("url:" + url + ". type: " + type)
    crawl4AI(url, type, res);
})

app.get("/testing", async(req, res) => {
    const testingDev = require("./src/lib/testing/testingPython")
    testingDev(req, res);
})

app.get("/surfdanang", async(req, res) => {
    const surfdanangPython = require("./src/lib/web/surfdanang/surfdanangPython");
    if (req.query.execute == "startups") surfdanangPython.startups(req, res)
    else if (req.query.execute == "events") surfdanangPython.events(req, res)
    else if (req.query.execute == "speakers") surfdanangPython.speakers(req, res)
})

app.get("/api/surfdanang", async(req, res) => {
    if (req.query.execute == "startups") {
        const eventController = controller("startup");
        eventController.list().then((result) => {
            res.json(result.documents)
        })

    } else if (req.query.execute == "events") {
        const eventController = controller("event");
        eventController.list([Query.search("date", "29 t")]).then((results) => {
            res.json(results.documents)
        })
    } else if (req.query.execute == "speakers") {
        const speakerController = controller("speaker");
        speakerController.list().then((results) => {
            res.json(results.documents)
        })
    }
})

app.listen(8800, () => {
    console.log("project: " + process.env.PROJECT);
    console.log("port: http://localhost:" + 8800)
})

app.get("/ai", async(req, res) => {
    callGroq(req.query.message, res)
})

app.get("/askyourdatabase", async(req, res) => {
    try {
        callAskYourDatabase(req.query.message, res)
    } catch {
        const sessionId = await createChatbotSession(req.query.message, res);
    }
})
const axios = require('axios');

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

async function callGroq(prompt, res) {
    try {
        const response = await axios.post(
            GROQ_API_URL, {
                model: 'llama3-70b-8192', // Hoặc "mixtral-8x7b-32768", tùy bạn
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

        console.log('✅ Phản hồi từ Groq:\n', response.data.choices[0].message.content);
        res.send(response.data.choices[0].message.content);
    } catch (error) {
        console.error('❌ Lỗi khi gọi API Groq:', error.response ? error.response.data : error.message);
    }
}

// async function callAskYourDatabase(prompt, res) {
//     const url = await fetch("https://www.askyourdatabase.com/api/chatbot/v2/session", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": process.env.ASK_YOUR_DATABASE_API_KEY,
//         },
//         body: JSON.stringify({
//             "chatbotid": process.env.ASK_YOUR_DATABASE_CHATBOX_ID,
//             "query": prompt,
//             "name": "Sheldon",
//             "email": "test@gmail.com"
//         }),
//     }).then((result) => res.send(result));

//     return res.json({ url });
// }


async function sendQuestion(sessionId, message, res) {
    try {
        const response = await axios.post(
            'https://www.askyourdatabase.com/chatbot/c49524d8570ed9ab9b207cea3edf4167', {
                chatbotid: process.env.ASK_YOUR_DATABASE_CHATBOX_ID,
                sessionid: sessionId,
                message: message,
                name: 'Sheldon',
                email: 'test@gmail.com',
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.ASK_YOUR_DATABASE_API_KEY}`,
                },
            }
        );

        const reply = response.data ? response.data : response.message;
        console.log('Trả lời từ chatbot:', reply);
        res.send(response.data)
        return reply;

    } catch (error) {
        res.end()
        console.error('Lỗi gửi câu hỏi:', error.response ? error.response.data : error.message);
    }
}

// Ví dụ sử dụng

async function createChatbotSession(message, res) {
    try {
        const response = await axios.post(
            'https://www.askyourdatabase.com/api/chatbot/v2/session', {
                chatbotid: process.env.ASK_YOUR_DATABASE_CHATBOX_ID,
                name: 'Sheldon',
                email: 'test@gmail.com',
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.ASK_YOUR_DATABASE_API_KEY}`, // ⚠️ Đổi thành API Key thật của bạn
                },
            }
        );

        const url = response.data;
        console.log('URL phiên trò chuyện:', url.url);
        sendQuestion(url.url, message, res)
        return url;

    } catch (error) {
        console.error('Lỗi:', error.response ? error.response.data : error.message);
    }
}

// Gọi hàm thử
// );