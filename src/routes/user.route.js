
/**
 * 
 * @param {Express} express 
 * @returns {Object}
 */
const userRouter = (express) => {
    const router = express.Router();

    router.get("/", async (req, res) => {
        res.send("show all users")
    })

    router.get("/create", async (req, res) => {
        res.send("Create new user")
    })

    return router;
}

module.exports = userRouter;