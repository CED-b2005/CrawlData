const { supabase, SupabaseModel } = require("./supabase.model")
class SpeakerModel extends SupabaseModel {
    constructor() {
        super({ table: "speakers" });
        this.columns = {
            id: "id",
            name: "name",
            position: "position",
            description: "description",
            contacts: "contacts",
        }
    }

    async findByName(name) {
        try {
            const { data, error } = await supabase
                .from(this.table)
                .select("*")
                .ilike(this.columns.name, name)
            if (!error) return data
            console.log("error when show (supabase): ", error);
            return false;
        } catch (error) {
            console.log("error when show (catch): ", error);
            return false
        }
    }
}

module.exports = SpeakerModel;