const { exec } = require("child_process");
const DataPythonInput = require("../funcs/dataPythonInput");
const testingPython = (req, res) => {
    const py = req.query.py
    const url = "https://surfdanang.zone";

    var require = url + " "

    for (let i = 1; i <= 3; i++) {
        const data = new DataPythonInput()

        data.name = "speakers" + i
        data.parent = "#guest-list .box-guest";
        data.addInputData("h3", "name", "text")
        data.addInputData("img", "avatar", "src")
        data.addInputData("img", "alt", "alt")
        data.addInputData("p", "position", "text")
        data.nextPage = ".page-btn.btn-next.show"

        require += data.string()
    }

    exec(`python ./src/lib/python/${py}.py ${require}`, (error, stdout, stderr) => {
        if (error || stderr) {
            console.error({ error: `exec error: ${error}`, stderr: `stderr: ${stderr}` });
            return;
        }
        try {
            res.send(JSON.parse(stdout.replace("{'", "{").replace("]'", "]")));
        } catch (e) {
            res.send((stdout.replace("{'", "{").replace("]'", "]")));
        }
    });
}

module.exports = testingPython;