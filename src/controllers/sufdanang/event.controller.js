const { eventCrawler, titleCrawler } = require('../../lib/crawler/surfdanang/crawlers');
const { formatData, aiModels } = require("../../lib/funcs/logic");
const chatbot = require("../../lib/funcs/chatbot");


const eventController = async() => {
    // crawl events ------------------------------------------------------
    const events = await eventCrawler();
    for (let i = 0; i < events.length; i++) {
        const date = await chatbot(`Bạn hãy chỉnh dữ liệu sau thành dạng date của PostgreSQL (đặt date trong <>) : < ${events[i].date} >`, aiModels.gemma2_9b_it, 0.1);
        events[i].date = formatData(date, "<", ">").replace("<", "").replace(">", "")
    }

    // Crawl title ------------------------------------------------------
    const title = await titleCrawler();
    title.start_date = events[0].date;
    title.end_date = events[events.length - 1].date;
    title.source_name = "SURF DANANG"
    title.detail = events;

    return title 
}

module.exports = eventController;