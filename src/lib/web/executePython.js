const { exec } = require("child_process");
const executePython = (req, res, pythonFile, action) => {
    exec(`python ./src/lib/web/${pythonFile}.py`, (error, stdout, stderr) => {
        if (error || stderr) {
            console.error({ error: `exec error: ${error}`, stderr: `stderr: ${stderr}` });
            return;
        }
        action(req, res, stdout);
    });
}

module.exports = executePython;