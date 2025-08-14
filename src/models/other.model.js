const { supabase, SupabaseModel } = require("./supabase.model")


class OtherModel extends SupabaseModel {
    constructor() { super("other_info") }

    async findByEventAndTitle(event_id, other_title) {
        try {
            const { data, error } = await supabase
                .from(this.table)
                .select('*')
                .eq("event_id", event_id)
                .ilike("title", other_title);
            if (!error) return data
            console.log("error when show (error): ", error);
            return false;
        } catch (error) {
            console.log("error when show (catch): ", error)
            return false
        }
    }
}

module.exports = OtherModel