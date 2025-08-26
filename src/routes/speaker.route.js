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
            if (!data) return res.json([])
            return res.json({speakers: data})
        }
        const data = await speakerModel.show(limit);
        if (!data) res.json([])
        return res.json({speakers: data})
    })

    router.post("/", async(req, res) => {
        try {
            const { event_id, speaker } = req.body
            if (speaker) {
                const speaker_id = await speakerModel.insert([speaker]);
                if (!speaker_id) {
                    res.status(422);
                    return res.json({ error: "data not valid" })
                }
                if (event_id) {
                    const eventSpeaker_id = await eventSpeakerModel.insert({ event_id, speaker_id });
                    if (!eventSpeaker_id) {
                        res.status(422);
                        return res.json({ error: "data not valid" });
                    }
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