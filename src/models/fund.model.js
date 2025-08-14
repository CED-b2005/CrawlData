const { supabase, SupabaseModel } = require("./supabase.model")



class FundModel extends SupabaseModel {
    constructor() { super("investment_fund") }

    show_startup(where = "", value = "") {
        const typeQuery = where == "id" ? "eq" : "ilike"
        value = where == "id" ? value : `%${value}`
        return this.show(typeQuery, where, value);
    }
}

module.exports = FundModel