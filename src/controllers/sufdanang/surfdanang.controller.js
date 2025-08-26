const eventController = require("./event.controller");
const { speakerCrawler, projectCrawler, otherCrawler } = require("../../lib/crawler/surfdanang/crawlers");

const sufdanangController = async() => {
    const title  = await eventController();
    const speakers = await speakerCrawler();
    const startups = await projectCrawler()
    const others = await otherCrawler()

    return { title, speakers, startups, others };
}

module.exports = sufdanangController;