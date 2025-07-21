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

app.use("/crawl, ", createRouter(express, "crawl"))
app.use("/user", createRouter(express, "user"));
app.use("/products", createRouter(express, "product"));

app.get("/fetch", async(req, res) => {
    fetchData.get(
        (responseData) => {
            res.json(responseData);
        },
        "https://api.dictionaryapi.dev/api/v2/entries/en/hello", {}, {})
})

app.get("/surfdanang/speakers", async(req, res) => {
    const testCrawler = require("./src/lib/web/testCrawler");
    testCrawler("surfdanang", res);
})

app.get("/davas/speakers/", async(req, res) => {
    const testCrawler = require("./src/lib/web/testCrawler");
    testCrawler("davas", res);
})

app.get("/crawl4AI", async(req, res) => {
    const crawl4AI = require("./src/lib/web/crawl4AI")
    const url = req.query.url
    const type = req.query.type
        // res.send("url:" + url + ". type: " + type)
    crawl4AI(url, type, res);
})

// const loop = setInterval(()=> {
app.listen(8800, () => {
        console.log("project: " + process.env.PROJECT);
        console.log("port: http://localhost:" + 8800)
    })
    // }, 10000)