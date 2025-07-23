const createCrawler = (web, res) => {
    const webData = require(`./${web}/testing`);
    return webData(res);
}

module.exports = createCrawler;