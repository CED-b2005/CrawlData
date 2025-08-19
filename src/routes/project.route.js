const ProjectModel = require('../models/project.model');
const projectModel = new ProjectModel();

const projectRouter = (express) => {
    const router = express.Router();

    router.get("/", async(req, res) => {
        const data = await projectModel.get();
        res.json(data);
    });

    router.get("/show", async(req, res) => {
        const id = parseInt(req.query.id) || " "
        const data = await projectModel.show("eq", "id", id);
        res.json(data);
    });
    return router;
}
module.exports = projectRouter;