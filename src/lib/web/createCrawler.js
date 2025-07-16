const createCrawler = (web, res) => {
    const webData = require(`./${web}/data`);
    return webData(res);
}

module.exports = createCrawler;