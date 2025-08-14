const { supabase, SupabaseModel } = require("./supabase.model")

class SpeakerEventModel extends SupabaseModel {
    constructor() { super("event_details") }
}

module.exports = SpeakerEventModel