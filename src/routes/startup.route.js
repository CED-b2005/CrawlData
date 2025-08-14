const { model } = require("../lib/funcs/requires");
const startupRouter = (express) => {
    const router = express.Router();

    router.get("/startup", async(req, res) => {
        const surfdanangPython = require("./src/lib/web/surfdanang/surfdanangPython");
        surfdanangPython.startups(req, res);
    })


    router.get("/api/startup", async(req, res) => {
        const startupModel = model("startup");
        const data = await startupModel.get();
        res.json(data)
    })

    return router;
}

module.exports = startupRouter;