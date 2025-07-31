/**
 * 
 * @param {Express} express 
 * @returns {Object}
 */
const userRouter = (express, app) => {
    const router = express.Router();
    app.user(express.json());

    router.get("/", async(req, res) => {
        res.send("show all users")
    })

    router.get("/show", async(req, res) => {
        const where = req.query.id ? "id" : "name"

        res.send("show all users")
    })

    router.get("/update", async(req, res) => {
        res.send("Create new user")
    })

    return router;
}

module.exports = userRouter;