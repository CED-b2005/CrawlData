const ProjectModel = require("../../models/project.model");
const { projectCrawler } = require('../../lib/crawler/surfdanang/crawlers')
const uploadImage = require("../../lib/cloudinary/cloudinary");

const projectModel = new ProjectModel()

const projectController = async(event_id) => {
    const projects = await projectCrawler();
    for (let i = 0; i < projects.length; i++) {
        const projectDb = await projectModel.showByNameAndLink(projects[i].name, projects[i].link);
        console.log(projectDb);
        if (projectDb == [] || projectDb == "" || projectDb == {}) {
            projects[i].img = await uploadImage(projects[i].img);
            await projectModel.insert([projects[i]]);
        }
    }
    console.log("project - success");
    return "project - success";
}

module.exports = projectController;