require('dotenv').config()
const express = require('express');
const app = express();
const axios = require("axios")

const supabase = require("./src/lib/supabase/supabase");
const fetchData = require("./src/lib/funcs/fetchData");
const createRouter = require("./src/routes/routes");
const groqAI = require("./src/lib/funcs/groqAI");
const { processOutput, model } = require("./src/lib/funcs/logic")


const PORT = process.env.PORT || 8800;

app.get("/", async(req, res) => {
    const ids = req.query.ids;
    res.send("Hello World! : " + ids);
})

app.use(express.json());
app.use("/user", createRouter(express, "user"));
app.use("/products", createRouter(express, "product"));

app.get("/events", async(req, res) => {
    const surfdanangPython = require("./src/lib/web/surfdanang/surfdanangPython");
    surfdanangPython.events(req, res);
})

app.get("/api/event", async(req, res) => {
    const eventModel = model("event");
    const data = await eventModel.list()
    res.json(data)

})

app.get("/api/speaker", async(req, res) => {
    const speakerModel = model("speaker");
    const data = await speakerModel.get();
    res.json(data)
})

app.get("/api/speaker/show", async(req, res) => {
    const where = req.query.where ? req.query.where : ""
    const value = req.query.value ? req.query.value : ""
    const speakerModel = model("speaker");
    console.log(where, value)
    const data = await speakerModel.show_speaker(where, value)
    res.json(data)
})

app.get("/startup", async(req, res) => {
    const surfdanangPython = require("./src/lib/web/surfdanang/surfdanangPython");
    surfdanangPython.startups(req, res);
})

app.get("/api/startup", async(req, res) => {
    const startupModel = model("startup");
    const data = await startupModel.get();
    res.json(data)
})

app.get("/api/speaker/show", async(req, res) => {
    const where = req.query.where ? req.query.where : ""
    const value = req.query.value ? req.query.value : ""
    const startupModel = model("startup");
    const data = await startupModel.show_startup(where, value)
    res.json(data)
})



app.get("/ai", async(req, res) => {
    // const message = req.query.message;
    const { message } = req.query
    const response = await groqAI(message)
    const output = processOutput(response);
    // res.json(JSON.parse(output.replaceAll("json", "")))
    res.send(response)
})


app.listen(8800, () => {
    console.log("project: " + process.env.PROJECT);
    console.log("port: http://localhost:" + 8800)
})