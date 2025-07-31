const executePython = require("../executePython")
const groqAI = require("../../funcs/groqAI");
const { model, processOutput } = require("../../../lib/funcs/logic")

const base = "surfdanang/python/"

const collectSpeaker = async(req, res, stdout) => {
    try {
        const uploadImage = require("../../cloudinary/cloudinary");
        const speakerModel = model("speaker");
        let speakerList = JSON.parse(stdout);
        for (let index = 0; index < speakerList.length; index++) {
            speakerList[index].img = await uploadImage(speakerList[index].img)
            speakerModel.push([speakerList[index]])
            console.log("--- add new speaker into supabase ---")
        }
        res.send(speakerList)
        console.log("\n--- successful ---\n");

    } catch (error) {
        console.log("\n--- failed ---\n");
        res.send("----- failed -----")
    }

}

const collectEvent = async(req, res, stdout) => {
    try {
        const eventModel = model("event")
        const eventDetailModel = model("eventDetail");
        const message = `
        Bạn giúp mình chỉnh lại giá trị 'date' thành dữ liệu kiểu Date YYYY-MM--DD:
        '''
            ${stdout}
        '''
        đầu ra là JSON`
        const aiResponse = await groqAI(message)
        const eventList = JSON.parse(processOutput(aiResponse).replace("json", ""))

        for (let index = 0; index < eventList.length; index++) {
            const event = eventList[index];
            const event_details = event.details

            const event_id = await eventModel.push([{ "date": event.date, "name": event.name }])
            for (let i = 0; i < event_details.length; i++) {
                event_details[i].event_id = event_id[0].id
            }
            eventDetailModel.push(event_details)

            console.log(" --- add new event + event details --- ")
        }

        console.log("\n--- successful ---\n");
        res.json(eventList)

    } catch (error) {
        throw error
        console.log("\n--- failed ---\n");
        res.send("----- failed -----")

    }


}

const collectStartup = async(req, res, stdout) => {
    try {
        const uploadImage = require("../../cloudinary/cloudinary");
        const startupModel = model("startup");
        const startupList = JSON.parse(stdout);
        for (let index = 0; index < startupList.length; index++) {
            const startup = startupList[index];
            if (startup.logo) startup.logo = await uploadImage(startup.logo);
            if (startup.project_img) startup.project_img = await uploadImage(startup.project_img);
            startupModel.push([startup])
        }
        res.send(startupList)
        console.log("\n--- successful ---\n");
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