const SpeakerModel = require("../models/speaker.model");
const speakerModel = new SpeakerModel()

const speakerRouter = (express, app) => {
    const router = express.Router();

    router.get("/", async(req, res) => {
        const { limit } = req.query;
        const data = await speakerModel.show(limit);
        return res.json(data)
    })

    router.get("/show", async(req, res) => {
        const { id } = req.query
        if (id) {
            const data = await speakerModel.findById(id)
            if (!data) res.json([])
            res.json(data)
        }
        return res.json([])
    })

    router.post("/insert", async(req, res) => {
        try {
            const request = req.body
            const db = await speakerModel.findByName(request.name);
            if (db == "" || db == {} || db == []) {
                const speaker_id = speakerModel.insert([request]);
                return res.json({ speaker_id });
            }
            if (!db) res.json({ error: "Database error" });
            return res.json({ error: "duplication" });
        } catch (error) {
            console.log(error);
            res.json({ error });
        }
    })

    return router;
}

module.exports = speakerRouter;