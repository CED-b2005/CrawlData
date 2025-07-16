const express = require('express');
require('dotenv').config()

const createRouter = require("./src/routes/routes");
const fetchData = require("./src/lib/funcs/fetchData");


const app = express ();

const PORT = process.env.PORT || 8800;

app.get("/", async (req, res) => {
    const ids = req.query.ids;
    res.send("Hello World! : " + ids);
})

app.use("/user", createRouter(express, "user"));
app.use("/products", createRouter(express, "product"));

app.get("/fetch", async (req, res) => {
    fetchData.get(
        (responseData)=> {
            res.json(responseData);
        },
        "https://api.dictionaryapi.dev/api/v2/entries/en/hello",
        {},{})
})

app.get("/davas", async (req, res) => {
    const davas = require("./src/lib/crawler/davas/davas");
    davas.speackers(res);
})

app.get("/suft", async (req, res) => {
    const result = require("./src/lib/crawler/surfdanang/excutePython");
    result(res);
})

app.get("/test", async (req, res ) => {
    const a = `[{"name": "a"}, {"name": "b"}]`
    res.send(JSON.parse(a));
})

// const loop = setInterval(()=> {
app.listen(8800, ()=> {
    console.log("project: " + process.env.PROJECT);
    console.log("port: http://localhost:" +  8800)
})
// }, 10000)