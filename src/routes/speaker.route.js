const SpeakerModel = require("../models/speaker.model");
const EventSpeakerModel = require("../models/event_speaker.model");
const speakerModel = new SpeakerModel();
const eventSpeakerModel = new EventSpeakerModel();

const speakerRouter = (express) => {
    const router = express.Router();

    router.get("/", async(req, res) => {
        const { limit, id, name } = req.query;
        if (id) {
            const data = await speakerModel.findById(id)
            if (!data) return res.json([])
            return res.json(data)
        }
        if (name) {
            const data = await speakerModel.findByName(name)
            console.log(data);
            return res.send(data);
            if (!data) return res.json([])
            return res.json(data)
        }
        const data = await speakerModel.show(limit);
        return res.json(data)
    })

    router.post("/", async(req, res) => {
        try {
            const request = req.body
            if (request) {
                const { event_id, speaker } = request;
                const speaker_id = await speakerModel.insert([speaker]);
                if (!speaker_id) return res.json({ error: "data not valid" })
                if (event_id) {
                    const eventSpeaker_id = await eventSpeakerModel.insert({ event_id, speaker_id });
                    if (!eventSpeaker_id) return res.json({ error: "data not valid" });
                    return res.json({ message: "success" })
                }
                return res.json({ message: "success" })
            }
        } catch (error) {
            console.log(error);
            res.json({ error });
        }
    })

    return router;
}

module.exports = speakerRouter;