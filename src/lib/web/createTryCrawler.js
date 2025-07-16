const createTryCrawler = (web, res) => {
    const webData = require(`./${web}/try`);
    return webData(res);
}

module.exports = createTryCrawler;