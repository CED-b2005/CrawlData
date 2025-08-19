const router = (express, routeCallBack) => {
    const route = require(`./${routeCallBack}.route`);
    return route(express);
}

module.exports = router