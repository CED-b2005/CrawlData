const e = require("express");
const EventModel = require("../models/event.model");
const eventModel = new EventModel();

const eventRouter = (express) => {
    const router = express.Router();

    // success
    router.get("/", async(req, res) => {
        const { limit } = req.query;
        const data = await eventModel.show(limit)
        res.json(data)
    })

    // success
    router.get("/show", async(req, res) => {
        const { id } = req.query
        if (id) {
            const data = await eventModel.findById(id)
            if (!data) res.json([])
            res.json(data)
        }
        return res.json([])
    })

    // success
    router.post("/insert", async(req, res) => {
        try {
            const request = req.body
            const db = await eventModel.findByName(request.name);
            if (db == "" || db == {} || db == []) {
                const event_id = await eventModel.insert([request]);
                if (!event_id) return res.json({ error: "data not valid" })
                return res.json({ event_id: event_id[0].id });
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

module.exports = eventRouter;