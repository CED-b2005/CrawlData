/**
 * 
 * @param {Express} express 
 * @param {String} route
 */
const createRouter = (express, route) => {
    const router = require(`./${route}.route`);
    return router(express);
}

module.exports = createRouter;