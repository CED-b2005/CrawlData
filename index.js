require('dotenv').config()
const express = require('express');
const app = express();

const createRouter = require("./src/routes/routes");
const fetchData = require("./src/lib/funcs/fetchData");

const PORT = process.env.PORT || 8800;

app.get("/", async(req, res) => {
    const ids = req.query.ids;
    res.send("Hello World! : " + ids);
})

app.use("/user", createRouter(express, "user"));
app.use("/products", createRouter(express, "product"));

app.get("/fetch", async(req, res) => {
    const response = await fetchData.get("https://api.dictionaryapi.dev/api/v2/entries/en/hello", {}, {})
    res.send(response)
})

app.listen(8800, () => {
    console.log("project: " + process.env.PROJECT);
    console.log("port: http://localhost:" + 8800)
})