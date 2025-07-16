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

app.get("/surf", async (req, res) => {
    const createCrawler = require("./src/lib/web/createCrawler");
    createCrawler("surfdanang", res);
})

app.get("/surf-try", async (req, res) => {
    const createTryCrawler = require("./src/lib/web/createTryCrawler");
    createTryCrawler("surfdanang", res);
})

// const loop = setInterval(()=> {
app.listen(8800, ()=> {
    console.log("project: " + process.env.PROJECT);
    console.log("port: http://localhost:" +  8800)
})
// }, 10000)