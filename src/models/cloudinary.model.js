const { supabase, SupabaseModel } = require("./supabase.model")

class CloudinaryModel extends SupabaseModel {
    constructor() {
        super({ table: "cloudinary" });
        this.columns = {
            id: "id",
            url: "url",
            name: "name",
            public_key: "public_key",
            secret_key: "secret_key"
        }
    }
}

module.exports = CloudinaryModel;