const executePython = require("../executePython")
const base = "surfdanang/python/"
const action = (req, res, stdout) => {
    try {
        console.log("\n--- successful ---\n");
        res.send(JSON.parse(stdout));
    } catch (error) {
        console.log("\n--- failed ---\n");
        res.send(stdout);
    }
}

const surfdanangPython = {
    startups: (req, res) => {
        executePython(req, res, base + "startups", action)
    },
    speakers: (req, res) => {
        executePython(req, res, base + "speakers", action)
    },
    events: (req, res) => {
        executePython(req, res, base + "events", action)
    }
}
module.exports = surfdanangPython;