const SpeakerModel = require("../../models/speaker.model");
const { speakerCrawler } = require("../../lib/crawler/surfdanang/crawlers");
const uploadImage = require("../../lib/cloudinary/cloudinary");

const speakerModel = new SpeakerModel();

const speakerController = async(event_id) => {
    let speaker_id;
    const speakers = await speakerCrawler();
    for (let i = 0; i < speakers.length; i++) {
        const speakerDb = await speakerModel.showByNameAndPosition(speakers[i].name, speakers[i].position)
        if (speakerDb == [] || speakerDb == "" || speakerDb == {}) {
            speakers[i].img = await uploadImage(speakers[i].img)
            speaker_id = await speakerModel.insert([speakers[i]])
        }
    }
    console.log("speaker - success");
    return "speaker - success";
}

module.exports = speakerController;