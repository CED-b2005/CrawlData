const { supabase, SupabaseModel } = require("./supabase.model")

class ProjectEventModel extends SupabaseModel {
    constructor() { super("event_details") }
}

module.exports = ProjectEventModel