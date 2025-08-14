const { supabase, SupabaseModel } = require("./supabase.model")


class SpeakerModel extends SupabaseModel {
    constructor() { super("speakers") }

    show_speaker(where = "", value = "") {
        const typeQuery = where == "name" ? "ilike" : "eq"
        value = where == "id" ? value : `%${value}`
        return this.show(typeQuery, where, value);
    }

    async showByName(name = "") {
        try {
            const { data, error } = supabase
                .from(this.table)
                .select("*")
                .ilike("name", name)
            if (!error) return data
            console.log("error when show (supabase): ", error);
            return false;
        } catch (error) {
            console.log("error when show (catch): ", error);
            return false
        }
    }

    async showByNameAndPosition(name = "", position = "") {
        try {
            const { data, error } = supabase
                .from(this.table)
                .select("*")
                .ilike("name", name)
                .ilike("position", position)
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