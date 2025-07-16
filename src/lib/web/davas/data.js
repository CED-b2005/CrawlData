const {exec} = require("child_process");
const path = require("path");

const url = "https://davas.vc"

const davasData = (res) => {
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
            const speakers = JSON.parse(
                stdout
                    .replaceAll(`'name'`, `"name"`)
                    .replaceAll(`'position'`, `"position"`)
                    .replaceAll(`: '`, `: "`)
                    .replaceAll(`'avatar'`, `"avatar"`)
                    .replaceAll(`'alt_name'`, `"alt_name"`)
                    .replaceAll(`',`, `",`)
                    .replaceAll(`'}`, `"}`)
                    .replaceAll("//", "")
            );
            console.log(speakers.length)
            res.send(speakers)
        } catch {
            console.log("error");
            console.log(stdout);
        }
    });
}

module.exports = davasData;
