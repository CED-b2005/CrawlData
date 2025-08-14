const { supabase, SupabaseModel } = require("./supabase.model")

class FundEventModel extends SupabaseModel {
    constructor() { super("event_details") }
}

module.exports = FundEventModel