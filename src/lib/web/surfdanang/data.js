const {exec} = require("child_process");
const path = require("path");

const url = "https://surfdanang.zone";
const parentElement = "#guest-list .box-guest".replaceAll(" ", "/");
const properties = "h3@name@text; img@avatar@src; p@position@text".replaceAll(" ", "/");
const nextPage = ".page-btn.btn-next.show".replaceAll(" ", "/");

const surfdanangData = (res) => {
    exec(`python ./src/lib/python/crawler.py ${url} ${parentElement} ${properties} ${nextPage}`, (error, stdout, stderr) => {
        if (error || stderr) {
            console.error({error: `exec error: ${error}`, stderr: `stderr: ${stderr}`});
            return;
        }

        try {
            const speakers = JSON.parse(stdout.replaceAll("'{", "{").replaceAll(", }'", "}"))
            console.log("successful" + speakers.length);
            res.send(speakers)
        } catch {
            console.log("error");
            res.send(stdout.replaceAll("'{", "{").replaceAll(", }'", "}"));
        }
    });
}

module.exports = surfdanangData;