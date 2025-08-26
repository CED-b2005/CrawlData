const serviceRouter = (express) => {
    const router = express.Router();

    // ----- cloudinary -----
    router.get("/cloudinary", async(req, res) => {
        const { note_name } = req.query;
        if (!note_name) {
            const cloudinary = await
        }
    })


    router.post("/cloudinary", async(req, res) => {

    })

    router.delete("/cloudinary", async(req, res) => {

    })

    // ----- supabase -----
    router.get("/supabase", async(req, res) => {

    })

    router.post("/supabase", async(req, res) => {

    })

    router.delete("/supabase", async(req, res) => {

    })

    // ----- pinecone -----
    router.get("/pinecone", async(req, res) => {

    })

    router.post("/pinecone", async(req, res) => {

    })

    router.delete("/pinecone", async(req, res) => {

    })



}