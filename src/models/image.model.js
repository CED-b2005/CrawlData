const { supabase, SupabaseModel } = require("./supabase.model")

class ImageModel extends SupabaseModel {
    constructor() {
        super({table: "images"})
        this.columns = {
            id: "id",
            old_url: "old_url",
            new_url: "new_url"
        }
    }

    async findByOldUrl(old_url = " ") {
        try {
            const { data, error } = await supabase
                .from(this.table)
                .select("new_url")
                .ilike("old_url", old_url)
            if (!error) return data
            console.log("error when show (supabase): ", error);
            return false;
        } catch (error) {
            console.log("error when show (catch): ", error);
            return false
        }
    }
}

module.exports = ImageModel