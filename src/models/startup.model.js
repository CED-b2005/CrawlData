const { supabase, SupabaseModel } = require("./supabase.model")

class StartupModel extends SupabaseModel {
    constructor() { super("startups") }

    show_startup(where = "", value = "") {
        const typeQuery = where == "id" ? "eq" : "ilike"
        value = where == "id" ? value : `%${value}`
        return this.show(typeQuery, where, value);
    }
}

module.exports = StartupModel