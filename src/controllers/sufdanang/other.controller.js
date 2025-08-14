const OtherModel = require("../../models/other.model");
const { otherCrawler } = require("../../lib/crawler/surfdanang/crawlers")
const uploadImage = require("../../lib/cloudinary/cloudinary");

const otherModel = new OtherModel()

const otherController = async(event_id) => {
    const others = await otherCrawler();
    console.log(others);
    for (let i = 0; i < others.length; i++) {
        others.imgs = JSON.stringify(others.imgs)
        const otherDb = await otherModel.findByEventAndTitle(event_id, others[i].title);
        if (otherDb == [] || otherDb == "" || otherDb == {}) {
            others[i].event_id = event_id;
            if (others[i].imgs) {
                for (let j = 0; j < others[i].imgs.length; j++) {
                    others[i].imgs[j] = await uploadImage(others[i].imgs[j]);
                }
            }
            const other = await otherModel.insert([others[i]])
            console.log(other)
        }
    }
    console.log("other - success");
    return "other - success";
}

module.exports = otherController;