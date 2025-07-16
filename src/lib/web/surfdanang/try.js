const {exec} = require("child_process");
const path = require("path");

const url = "https://surfdanang.zone";
const parentElement = "#guest-list .box-guest".replaceAll(" ", "/");
const properties = "h3@name@text; img@avatar@src; p@position@text".replaceAll(" ", "/");
const nextPage = ".page-btn.btn-next.show".replaceAll(" ", "/");

const surfdanangData = (res) => {
    exec(`python ./src/lib/python/testing.py ${url} ${parentElement} ${properties} ${nextPage}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log("successful");

        try {
            const speakers = JSON.parse(stdout.replaceAll(`'`, `"`).replace('/\r/\n', "").replaceAll("/\\", "")) || [];
            console.log(speakers.length);
            res.send(speakers);
        } catch (e) {
            console.log("error");
            console.error(e);
            console.log(stdout);
            res.send(
                stdout
            )
        }
    })
}
module.exports = surfdanangData;