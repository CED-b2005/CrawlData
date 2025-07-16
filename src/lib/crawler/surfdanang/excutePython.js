const {exec} = require("child_process");
const path = require("path");
const { json } = require("stream/consumers");



const execPython = (res) => {
    exec(`python ${path.dirname(__filename)}/crawler.py`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }

        console.log("successful");

        const speackers = JSON.parse(stdout.replaceAll(`'`, `"`).replace('/\r/\n', "").replaceAll("\\", ""));

        speackers.forEach(speacker => {
            if (speacker.name == "Bà Ellie Nguyễn") {
                res.send(speacker);
            }
        });

    })
}

module.exports = execPython;

