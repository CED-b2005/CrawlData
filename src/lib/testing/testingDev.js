const { exec } = require("child_process");
const testingDev = (req, res) => {
    const py = req.query.py
    exec(`python ./src/lib/python/${py}.py`, (error, stdout, stderr) => {
        if (error || stderr) {
            console.error({ error: `exec error: ${error}`, stderr: `stderr: ${stderr}` });
            return;
        }
        try {
            res.send(JSON.parse(stdout.replace(/[\u0000-\u0019]+/g, '')))
        } catch (error) {
            res.send((stdout));
        }
    });
}

module.exports = testingDev;