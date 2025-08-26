const { json } = require("express");
const CloudinaryModel = require("../models/cloudinary.model");
const cloudinaryModel = new CloudinaryModel();

const serviceRouter = (express) => {
        const router = express.Router();

        // ----- cloudinary -----
        router.get("/cloudinary", async(req, res) => {
            const { note_name } = req.query;
            if (!note_name) {
                const cloudinary = await cloudinaryModel.show();
                return res.json({ cloudinary });
            }
            const cloudinary = cloudinaryModel.findByNoteName(note_name);
            return res.json({ cloudinary });
        })


        router.post("/cloudinary", async(req, res) => {

        })

        router.delete("/cloudinary", async(req, res) => {

        })