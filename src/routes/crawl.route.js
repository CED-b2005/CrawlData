/**
 * @param {Express} express 
 * @returns {Object}
 */

const crawlerRouter = (express) => {
    const router = express.Router();

    router.get("/", async(req, res) => {
        res.send("crawler routes")
    })

    router.get("/surfdanang/speakers", async(req, res) => {
        const testCrawler = require("../lib/web/testCrawler");
        testCrawler("surfdanang", res);
    })

    router.get("davas/speakers/", async(req, res) => {
        const testCrawler = require("../lib/web/testCrawler");
        testCrawler("davas", res);
    })

    return router;
}

module.exports = crawlerRouter;