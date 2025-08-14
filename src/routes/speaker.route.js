const { model } = require('../lib/funcs/requires');
const speakerModel = model("speaker");

const speakerRouter = (express, app) => {
    const router = express.Router();

    router.get("/", async(req, res) => {
        const data = await speakerModel.get();
        return res.json(data)
    })

    router.get("/show", async(req, res) => {
        const id = parseInt(req.query.id) || " "
        const data = await speakerModel.show("eq", "id", id);
        return res.json(data);
    })

    return router;
}

module.exports = speakerRouter;