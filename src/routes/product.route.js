/**
 * @param {Express} express 
 * @returns {Object}
 */
const productRouter = (express) => {
    const router = express.Router();

    router.get("/", async (req, res) => {
        res.send("show all products")
    })

    router.get("/create", async (req, res) => {
        res.send("Create new product")
    })

    return router;
}

module.exports = productRouter;