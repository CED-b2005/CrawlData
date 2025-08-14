const { supabase, SupabaseModel } = require("./supabase.model")

class StartupEventModel extends SupabaseModel {
    constructor() { super("startup_event") }
}

module.exports = StartupEventModel