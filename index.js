require('dotenv').config()
const express = require('express');
const cors = require("cors")
const app = express();

const PORT = process.env.PORT || 8800;

// require libraries
const router = require("./src/routes/router");

app.use(cors());
app.use(express());
app.use(express.json());

app.use("/api/crawler", router(express, "crawler"));
app.use("/api/event", router(express, "event"));
app.use("/api/investor", router(express, "investor"));
app.use("/api/speaker", router(express, "speaker"));
app.use("/api/startup", router(express, "startup"));
app.use("/api/news", router(express, "news"));

app.get("/", async(req, res) => {
    res.send("Hello World! : ");
})

// app.get("/chatbot", async(req, res) => {

//     const { message } = req.query
//     const response = await chatbot(checkPrompt(message), aiModels.gemma2_9b_it);
//     const data = formatData(response, "[", "]").replace("[", "").replace("]").split(",");
//     let info = ""
//     for (let i = 0; i < data.length; i++) {
//         if (!data) continue;
//         const result = await semanticSearch(data[i])
//         info += JSON.stringify(result)
//     }

//     const latsAnswer = await gemini(lastQuestion(info, message))
//     return res.json({ response: latsAnswer })
// })



// ------------- testing functions -------------

const event = {
    "event": {
        "name": "SURF ĐÀ NẴNG 2025",
        "title": "Ngày hội Khởi nghiệp đổi mới sáng tạothành phố Đà Nẵng",
        "description": "\nSURF 2025 – Ngày hội Khởi nghiệp Đổi mới Sáng tạo Đà Nẵng là sự kiện thường niên quy tụ cộng đồng khởi nghiệp, kết nối chuyên gia, nhà đầu tư và các nguồn lực trong và ngoài nước. Sự kiện góp phần thúc đẩy hệ sinh thái khởi nghiệp, đưa Đà Nẵng trở thành trung tâm đổi mới sáng tạo của miền Trung, Tây Nguyên và vươn ra quốc tế.",
        "start_date": "2025-07-29",
        "end_date": "2025-07-30",
        "detail": [{
                "date": "2025-07-29",
                "timeline": "08h00 - 11h30",
                "title": "Tổ chức Vòng chung kết Cuộc thi Khởi nghiệp đổi mới sáng tạo",
                "place": "Địa điểm: Hội trường Phố Hội, Tầng 3, Nhà khách Quốc Hội tại Đà Nẵng, số 192 Võ Nguyên Giáp, phường An Hải, thành phố Đà Nẵng."
            },
            {
                "date": "2025-07-29",
                "timeline": "08h00 (29/7/2025) - 17h00 (30/7/2025)",
                "title": "Triển lãm trực tiếp khởi nghiệp đổi mới sáng tạo (02 ngày)",
                "place": "Địa điểm: Tầng 2 & Tầng 3, Nhà khách Quốc Hội tại Đà Nẵng, số 192 Võ Nguyên Giáp, phường An Hải, thành phố Đà Nẵng."
            },
            {
                "date": "2025-07-30",
                "timeline": "08h00 - 11h30",
                "title": "Phiên khai mạc",
                "place": "Địa điểm: Hội trường Nguyệt Quế, Tầng 3, Nhà khách Quốc Hội tại Đà Nẵng, số 192 Võ Nguyên Giáp, phường An Hải, thành phố Đà Nẵng. "
            },
            {
                "date": "2025-07-30",
                "timeline": "13h30 - 16h30",
                "title": "Diễn đàn Kết nối đầu tư đổi mới sáng tạo quốc tế “Blockchain và tài sản số: Đổi mới sáng tạo trong chuyển đổi số đô thị và phát triển kinh tế số tại Đà Nẵng”",
                "place": "Địa điểm: Hội trường Nguyệt Quế, Tầng 3, Nhà khách Quốc Hội tại Đà Nẵng, số 192 Võ Nguyên Giáp, phường An Hải, thành phố Đà Nẵng.Tọa đàm: Cơ hội đầu tư khởi nghiệp đổi mới sáng tạo Fintech tại Đà Nẵng "
            },
            {
                "date": "2025-07-30",
                "timeline": "16h30 - 17h30",
                "title": "Bế mạc",
                "place": "Địa điểm: Hội trường Nguyệt Quế, Tầng 3, Nhà khách Quốc Hội tại Đà Nẵng, số 192 Võ Nguyên Giáp, phường An Hải, thành phố Đà Nẵng."
            }
        ]
    }
}

//
app.get("/test", async(req, res) => {
    // const { createAssistant, uploadFile, deleteUploadFile, chatResponse } = require("./src/lib/pinecone/assistant.pinecone");
    // const { message } = req.query;
    // const response = await chatResponse(message);
    // res.json(response)

    const EventModel = require("./src/models/event.model");
    const eventModel = new EventModel();

    const data = await eventModel.show();
    return res.send(data);

})

// ---------------------------------------------

app.listen(8800, () => {
    console.log("project: " + process.env.PROJECT);
    console.log("port: http://localhost:" + 8800)
})