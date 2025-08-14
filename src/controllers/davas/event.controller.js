const EventModel = require("../../models/event.model");
const DetailModel = require("../../models/detail.model");
const { eventCrawler, titleCrawler } = require('../../lib/crawler/surfdanang/crawlers');
const { formatData, aiModels } = require("../../lib/funcs/logic");
const chatbot = require("../../lib/funcs/chatbot");

const eventModel = new EventModel();
const detailModel = new DetailModel();


const eventController = async() => {
    var event_id = 0;

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
    const eventDb = await eventModel.show("ilike", "name", `%${title.name}%`);

    // save to db
    if (eventDb == "" || eventDb == []) {
        event_id = await eventModel.insert([title]);
        for (let i = 0; i < events.length; i++) {
            details[i].event_id = event_id[0].id;
            await detailModel.insert([details[i]]);
        }
    } else event_id = eventDb[0].id;

    console.log("event - success");
    return event_id;
}

module.exports = eventController;