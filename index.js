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