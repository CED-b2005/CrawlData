const { exec } = require("child_process");

const DataPythonInput = require("../funcs/dataPythonInput");
const { json } = require("stream/consumers");

const testingPython = (req, res) => {
    const py = req.query.py
    const url = req.query.url;

    var require = url + " "


    const speakers = new DataPythonInput()

    speakers.name = "speakers";
    speakers.parent = "#guest-list .box-guest";
    speakers.addInputData("h3", "name", "text");
    speakers.addInputData("img", "avatar", "src");
    speakers.addInputData("img", "alt", "alt");
    speakers.addInputData("p", "position", "text");
    speakers.nextPage = ".page-btn";

    require += speakers.string()

    const exam = new DataPythonInput();




    exec(`python ./src/lib/python/${py}.py ${require}`, (error, stdout, stderr) => {
        if (error || stderr) {
            console.error({ error: `exec error: ${error}`, stderr: `stderr: ${stderr}` });
            return;
        }
        // try {
        //     res.send(JSON.parse(stdout.replace("{'", "{").replace("]'", "]").replace("\\", "")));
        // } catch (e) {
        //     res.send((stdout.replace("{'", "{").replace("]'", "]")));
        // }

        res.send(stdout)
    });
}

module.exports = testingPython;