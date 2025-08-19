const EventModel = require("../models/event.model");

const eventModel = new EventModel();

const eventRouter = (express) => {
    const router = express.Router();

    router.get("/", async(req, res) => {
        const data = await eventModel.list()
        res.json(data)
    })

    router.get("/show", async(req, res) => {
        const id = req.query.id || " "
        const eventModel = model("event");
        const data = await eventModel.showById(id)
        res.json(data)
    })

    router.post("/insert", async(req, res) => {
        try {
            const data = req.body
            const eventDB = await eventModel.showByName(data.name);
            if (eventDB == "" || eventDB == {} || eventDB == []) {
                const event_id = eventModel.insert([data]);
                return res.json({ event_id });
            }
            return res.json({ error: "duplication" })
        } catch (error) {
            console.log(error);
            res.json({ error });
        }
    })

    return router;
}
module.exports = eventRouter;