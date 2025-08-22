const StartupModel = require("../models/startup.model");
const startupModel = new StartupModel()

const startupRouter = (express) => {
    const router = express.Router();

    router.get("/", async(req, res) => {
        const { limit } = req.query;
        const data = await startupModel.show(limit);
        return res.json(data)
    })

    router.get("/show", async(req, res) => {
        const { id } = req.query
        if (id) {
            const data = await startupModel.findById(id)
            if (!data) res.json([])
            res.json(data)
        }
        return res.json([])
    })

    router.post("/insert", async(req, res) => {
        try {
            const request = req.body
            const startup_id = await startupModel.insert([request]);
            if (!startup_id) return res.json({ error: "data not valid" })
            return res.json({ startup_id: startup_id[0].id });
        } catch (error) {
            console.log(error);
            res.json({ error });
        }
    })

    return router;
}

module.exports = startupRouter;