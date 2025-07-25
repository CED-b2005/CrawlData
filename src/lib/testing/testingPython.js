const { exec } = require("child_process");

const testingPython = (req, res) => {
    const py = req.query.py
    const url = req.query.url;
    const input = req.query.input

    exec(`python ./src/lib/python/${py}.py ${url + " " + input}`, (error, stdout, stderr) => {
        if (error || stderr) {
            console.error({ error: `exec error: ${error}`, stderr: `stderr: ${stderr}` });
            return;
        }
        try {
            res.send(JSON.parse(stdout))
        } catch (error) {
            res.send(stdout)
        }
    });
}

module.exports = testingPython;