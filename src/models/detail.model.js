const { supabase, SupabaseModel } = require("./supabase.model")

class DetailModel extends SupabaseModel {
    constructor() { super("event_details") }
}

module.exports = DetailModel