const { supabase, SupabaseModel } = require("./supabase.model")

class CloudinaryModel extends SupabaseModel {
    constructor() {
        super({ table: "cloudinary" });
        this.columns = {
            id: "id",
            url: "url",
            name: "name",
            note_name: "note_name",
            public_key: "public_key",
            secret_key: "secret_key"
        }
    }

    async findByNoteName(note_name) {
        try {
            const { data, error } = supabase
                .from(this.table)
                .select("*")
                .ilike(this.columns.note_name, note_name);
            if (!error) return data
            console.log("error when show (supabase): ", error);
            return false;
        } catch (error) {
            console.log("error when show (catch): ", error);
            return false
        }
    }
}

module.exports = CloudinaryModel;