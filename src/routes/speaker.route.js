const SpeakerModel = require("../models/speaker.model");
const speakerModel = new SpeakerModel()

const speakerRouter = (express) => {
    const router = express.Router();

    router.get("/", async(req, res) => {
        const { limit } = req.query;
        const data = await speakerModel.show(limit);
        return res.json(data)
    })

    router.get("/show", async(req, res) => {
        const { id, name } = req.query
        if (id) {
            const data = await speakerModel.findById(id)
            if (!data) res.json([])
            res.json(data)
        }
        if (name) {
            const data = await speakerModel.findByName(name)
            if (!data) res.json([])
            res.json(data)
        }
        return res.json([])
    })

    router.post("/insert", async(req, res) => {
        try {
            const request = req.body
            const speaker_id = await speakerModel.insert([request]);
            if (!speaker_id) return res.json({ error: "data not valid" })
            return res.json({ speaker_id: speaker_id[0].id });
        } catch (error) {
            console.log(error);
            res.json({ error });
        }
    })

    return router;
}

module.exports = speakerRouter;