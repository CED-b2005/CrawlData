const SpeakerModel = require("../models/speaker.model");
const speakerModel = new SpeakerModel()

const speakerRouter = (express, app) => {
    const router = express.Router();

    router.get("/", async(req, res) => {
        const data = await speakerModel.get();
        console.log("get speakers")
        return res.json(data)
    })

    router.get("/show", async(req, res) => {
        const id = parseInt(req.query.id) || " "
        const data = await speakerModel.show("eq", "id", id);
        return res.json(data);
    })

    router.post("/insert", async(req, res) => {
        // const id = parseInt(req.query.id); 
        try {
            const data = req.body
            console.log(data);
            res.end()
        } catch (error) {
            console.log(error)
            res.end()
        }
        // const data = req.s
    })

    return router;
}

module.exports = speakerRouter;