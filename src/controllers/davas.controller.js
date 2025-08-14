const { eventCrawler, otherCrawler, projectCrawler, speakersCrawler, titleCrawler } = require('../lib/crawler/surfdanang/crawlers')
const { FundEvent, ProjectEvent, SpeakerEvent, StartupEvent } = require('../models/relationship.config')

const { model } = require("../lib/funcs/requires");
const chatbot = require("../lib/funcs/chatbot");
const { formatData, aiModels, randomId } = require("../lib/funcs/logic");
const uploadImage = require("../lib/cloudinary/cloudinary");
const { project } = require('../lib/crawler/surfdanang/objects');
const { createIndex, semanticSearch, upsert } = require("../lib/pinecone/pinecone")

const detailModel = model("detail");
const eventModel = model("event");
const speakerModel = model("speaker");
const projectModel = model("project");
const otherModel = model("other")

var event_id = 0;

const surfdanang = async() => {

    // crawl topic events ------------------------------------------------------
    const details = await eventCrawler();
    for (let index = 0; index < details.length; index++) {
        const date = await chatbot(`Bạn hãy chỉnh dữ liệu sau thành dạng date của PostgreSQL (đặt date trong <>) : < ${details[index].date} >`, aiModels.gemma2_9b_it, 0.1);
        details[index].date = formatData(date, "<", ">").replace("<", "").replace(">", "")
    }

    // Crawl event details ------------------------------------------------------
    const event = await titleCrawler();
    event.start_date = details[0].date;
    event.end_date = details[details.length - 1].date;
    const eventDb = await eventModel.show("ilike", "name", `%${event.name}%`);

    if (eventDb == "" || eventDb == []) {
        event_id = await eventModel.insert([event]);
        for (let index = 0; index < details.length; index++) {
            details[index].event_id = event_id[0].id;
            const events = await detailModel.insert([details[index]]);
        }
    } else event_id = eventDb[0].id

    const eventVbd = await chatbot(`tạo văn bản ngắn cho dữ liệu sau (đặt trả lời trong <>): '${JSON.stringify(event)}, ${JSON.stringify(details)} `, aiModels.llama_3_3_70b_versatile, 0.3)
    await upsert([{ "id": randomId(10), "text": eventVbd }]);

    // Crawl speakers ------------------------------------------------------
    const speakers = await speakersCrawler();
    let speakersVdb = `Các speakers tham gia sự kiện ${event.name}  gồm:`
    for (let index = 0; index < speakers.length; index++) {
        const speakerDb = await speakerModel.show("ilike", "name", `%${speakers[index].name}%`);
        if (speakerDb == [] || speakerDb == "" || speakerDb == {}) {
            speakersVdb += speakers[index].name + ", "
            const speakerVdb = `Thông tin cá nhân: 
            - tên ${speakers[index].name}.
            - chức vụ: ${speakers[index].position}.`
            await upsert([{ "id": randomId(10), "text": speakerVdb }])
            speakers[index].img = await uploadImage(speakers[index].img)
            await speakerModel.insert([speakers[index]])
            await upsert([{ "id": randomId(10), "text": speakerVdb }])
        } else {
            let result = false;
            for (let i = 0; i < speakerDb.length; i++) {
                if (speakerDb[i].name == speakers[index].name && speakerDb[i].position == speakers[index].position) {
                    result = true;
                    break
                }
            }
            if (result) continue
            const speakerVdb = `Thông tin cá nhân: 
            - tên ${speakers[index].name}.
            - chức vụ: ${speakers[index].position}.`
            await upsert([{
                "id": randomId(10),
                "text": speakerVdb
            }])
            speakers[index].img = await uploadImage(speakers[index].img)
            await speakerModel.insert([speakers[index]])
        }
    }

    await upsert([{ "id": randomId(10), "text": speakersVdb }])

    // Crawl Projects ------------------------------------------------------
    const projects = await projectCrawler();
    for (let index = 0; index < projects.length; index++) {
        const projectDb = await projectModel.show("ilike", "name", `%${projects[index].name}%`);
        if (projectDb == [] || projectDb == "" || projectDb == {}) {
            projects[index].img = await uploadImage(projects[index].img);
            await projectModel.insert([projects[index]]);
            await upsert([{ "id": randomId(10), "text": projects[index].description }])
        } else {
            let result = false;
            for (let i = 0; i < projectDb.length; i++) {
                if (projectDb[i].name == projects[index].name && projectDb[i].link == projects[index].link) {
                    result = true;
                    break
                }
            }
            if (result) continue
            speakers[index].img = await uploadImage(speakers[index].img)
            await speakerModel.insert([speakers[index]])
            await upsert([{ "id": randomId(10), "text": projects[index].description }])
        }
        projects[index].img = await uploadImage(projects[index].img)
    }

    // Crawl Other info ------------------------------------------------------
    const others = await otherCrawler();
    for (let i = 0; i < others.length; i++) {
        if (others[i].imgs) {
            for (let j = 0; j < others[i].imgs.length; j++) {
                others[i].imgs[j] = await uploadImage(others[i].imgs[j]);
            }
        }
        others.imgs = JSON.stringify(others.imgs)

        const otherDb = await otherModel.show("ilike", "title", `${others[i].title}`);
        if (otherDb == [] || otherDb == "" || otherDb == {}) {
            others[i].event_id = event_id;
            const other = await otherModel.insert([others[i]])
            console.log(other)
        }
    }

    return "crawl finish https://surfdanang.zone"
}
module.exports = surfdanang