const { supabase, SupabaseModel } = require("./supabase.model")


class ProjectModel extends SupabaseModel {
    constructor() { super("projects") }

    async showByNameAndLink(name = "", link = "") {
        try {
            const { data, error } = await supabase
                .from(this.table)
                .select("*")
                .ilike("name", name)
                .ilike("link", link)
            if (!error) return data
            console.log("error when show (supabase): ", error);
            return false;
        } catch (error) {
            console.log("error when show (catch): ", error);
            return false
        }
    }
}

module.exports = ProjectModel