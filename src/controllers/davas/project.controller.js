const ProjectModel = require("../../models/project.model");
const { projectCrawler } = require('../../lib/crawler/surfdanang/crawlers')
const uploadImage = require("../../lib/cloudinary/cloudinary");

const projectModel = new ProjectModel()

const projectController = async(event_id) => {
    const projects = await projectCrawler();
    for (let i = 0; i < projects.length; i++) {
        const projectDb = await projectModel.show("ilike", "name", `%${projects[i].name}%`);
        if (projectDb == [] || projectDb == "" || projectDb == {}) {
            projects[i].img = await uploadImage(projects[i].img);
            await projectModel.insert([projects[i]]);
        } else {
            let result = false;
            for (let j = 0; j < projectDb.length; j++) {
                if (projectDb[j].name == projects[i].name && projectDb[j].link == projects[i].link) {
                    result = true;
                    break
                }
            }
            if (result) continue
            speakers[i].img = await uploadImage(speakers[i].img)
            await speakerModel.insert([speakers[i]])
        }
        projects[i].img = await uploadImage(projects[i].img)
    }
}

module.exports = projectController;