const {exec} = require("child_process");
const path = require("path");

const url = "https://surfdanang.zone"

const surfdanangData = (res) => {
    exec(`python  ./src/lib/python/speakers-crawler.py ${url}`, (error, stdout, stderr) => {
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
            console.log(speakers.length)
            res.send(speakers)
        } catch {
            console.log("error");
            console.log(stdout)
            res.send({
                "message": "error",
            });
        }
    });
}

module.exports = surfdanangData;