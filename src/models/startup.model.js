const { supabase, SupabaseModel } = require("./supabase.model")

class StartupModel extends SupabaseModel {
    constructor() {
        super({ table: "startups" })
        this.columns = {
            id: "id",
            name: "name",
            img: "img",
            title: "title",
            link: "link",
            description: "description",
            owner: "owner",
            company: "company",
        }
    }

    async showByName(name = "") {
        try {
            const { data, error } = await supabase
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
}

module.exports = StartupModel