const executePython = require("../executePython")
const controller = require("../../funcs/controller");


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

const collectSpeaker = (req, res, stdout) => {
    try {
        const speakerController = controller("speaker")
        speakerList = JSON.parse(stdout);
        speakerController.insertData(speakerList);
        console.log("\n--- successful ---\n");
        res.send(`
            <a href='\\api\\surfdanang\\?execute=specker'>
                \\api\\surfdanang\\?execute=specker
            </a>`)
    } catch (error) {
        console.log("\n--- failed ---\n");
        res.send("----- failed -----")
    }

}

const collectEvent = (req, res, stdout) => {
    try {
        const eventController = controller("event")
        const eventList = JSON.parse(stdout);
        l
        eventController.insertData(eventList)
        console.log("\n--- successful ---\n");
        res.send(`
            <a href='\\api\\surfdanang\\?execute=events'>
                \\api\\surfdanang\\?execute=events
            </a>`)
    } catch (error) {
        console.log("\n--- failed ---\n");
        res.send("----- failed -----")

    }

}

const collectStartup = (req, res, stdout) => {
    try {
        const startupController = controller("startup");
        const startupList = JSON.parse(stdout);
        startupController.insertData(startupList)
        console.log("\n--- successful ---\n");
        res.send(`
            <a href='\\api\\surfdanang\\?execute=startups'>
                \\api\\surfdanang\\?execute=startups
            </a>`)
    } catch (error) {
        console.log("\n--- failed ---\n");
        res.send("----- failed -----")
    }


}


const surfdanangPython = {
    startups: (req, res) => {
        executePython(req, res, base + "startups", collectStartup)
    },
    speakers: (req, res) => {
        executePython(req, res, base + "speakers", collectSpeaker)
    },
    events: (req, res) => {
        executePython(req, res, base + "events", collectEvent)
    }
}
module.exports = surfdanangPython;