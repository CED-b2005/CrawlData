const sufdanangController = require("../controllers/sufdanang/surfdanang.controller");

const speakerRouter = (express, app) => {
    const router = express.Router();

    router.get("/surfdanang", async(req, res) => {
        const response = await sufdanangController();
        res.status(200);
        return res.json(response);
    })

    router.get("/davas", async(req, res) => {
        res.status(422);
        return res.end();
    })

    router.get("/w3builderssubmit", async(req, res) => {
        res.status(422);
        return res.end();
    })

    return router;
}

module.exports = speakerRouter;