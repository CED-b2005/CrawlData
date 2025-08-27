const e = require("express");
const EventModel = require("../models/event.model");
const eventModel = new EventModel();

const eventRouter = (express) => {
    const router = express.Router();

    // success
    router.get("/", async(req, res) => {
        const { limit, id, name } = req.query;
        if (id) {
            const data = await eventModel.findById(id)
            if (!data) res.json([])
            return res.json({ events: data })
        }
        if (name) {
            const data = await eventModel.findByName(name)
            if (!data) res.json([])
            return res.json(data)
        }
        const data = await eventModel.show(limit)
        if (!data) res.json([])
        return res.json({ events: data })
    })

    // success
    router.post("/", async(req, res) => {
        try {
            const { event } = req.body
            const db = await eventModel.findByName(event.name);
            if (db == "" || db == {} || db == []) {
                const event_id = await eventModel.insert([event]);
                if (!event_id) {
                    res.status(422);
                    return res.json({ error: "data not valid" })
                }
                return res.json({ event_id: event_id[0].id });
            }
            if (!db) {
                res.status(422);
                return res.json({ error: "Database error" });
            }
            return res.json({ error: "duplication" });
        } catch (error) {
            console.log(error);
            return res.json({ error });
        }
    })

    return router;
}

module.exports = eventRouter;