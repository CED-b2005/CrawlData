const { model } = require("../lib/funcs/requires");
const eventModel = model("event");

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

    return router;
}
module.exports = eventRouter;