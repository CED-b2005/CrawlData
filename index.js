const express = require('express');
require('dotenv').config()

const createRouter = require("./src/routes/routes");
const fetchData = require("./src/lib/funcs/fetchData");


const app = express();

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


// const loop = setInterval(()=> {
app.listen(8800, () => {
        console.log("project: " + process.env.PROJECT);
        console.log("port: http://localhost:" + 8800)
    })
    // }, 10000)