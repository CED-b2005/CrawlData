const StartupModel = require("../models/startup.model");
const EventStartupModel = require("../models/event_startup.model");
const startupModel = new StartupModel();
const eventStartupModel = new EventStartupModel();

const startupRouter = (express) => {
    const router = express.Router();

    router.get("/", async(req, res) => {
        const { limit, id, name } = req.query;
        if (id) {
            const data = await startupModel.findById(id)
            if (!data) res.json([])
            return res.json({ startups: data })
        }
        if (name) {
            const data = await startupModel.findByName(name)
            if (!data) res.json([])
            return res.json({ startups: data })
        }
        const data = await startupModel.show(limit);
        if (!data) res.json([])
        return res.json({ startups: data })
    })

    router.post("/", async(req, res) => {
        try {
            const request = req.body
            if (request) {
                const { event_id, startup } = request;
                const startup_id = await startupModel.insert([startup]);
                if (!startup_id) return res.json({ error: "data not valid" })
                if (event_id) {
                    const eventStartup_id = await eventStartupModel.insert({ event_id, startup_id });
                    if (!eventStartup_id) return res.json({ error: "data not valid" });
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

module.exports = startupRouter;