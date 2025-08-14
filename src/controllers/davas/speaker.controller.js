const SpeakerModel = require("../../models/speaker.model");
const { speakerCrawler } = require("../../lib/crawler/surfdanang/crawlers");
const uploadImage = require("../../lib/cloudinary/cloudinary");

const speakerModel = new SpeakerModel();

const speakerController = async(event_id) => {
    let speaker_id;
    const speakers = await speakerCrawler();
    for (let i = 0; i < speakers.length; i++) {
        const speakerDb = await speakerModel.show("ilike", "name", `%${speakers[i].name}%`);
        if (speakerDb == [] || speakerDb == "" || speakerDb == {}) {
            speakers[i].img = await uploadImage(speakers[i].img)
            console.log(speakers[i]);
            speaker_id = await speakerModel.insert([speakers[i]])
        } else {
            console.log(speakerDb);
            let result = false;
            for (let j = 0; j < speakerDb.length; j++) {
                if (speakerDb[j].name == speakers[j].name && speakerDb[j].position == speakers[i].position) {
                    result = true;
                    break
                }
            }
            if (result) continue
            speakers[i].img = await uploadImage(speakers[i].img)
            speaker_id = await speakerModel.insert([speakers[i]])
        }

        speaker_ids.push(speaker_id)
    }
    return "speaker - success";
}

module.exports = speakerController;