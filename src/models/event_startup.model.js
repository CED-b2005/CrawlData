const { supabase, SupabaseModel } = require("./supabase.model")

class EventStartupModel extends SupabaseModel {
    constructor() {
        super({ tabel: "event_startup" })
        this.columns = {
            id : "id",
            event_id: "evet_id",
            startup_id: "startup_id"
        }
    }
    
    async findByEventId(event_id) {
        try {
            const { data, error } = await supabase
                .from(this.table)
                .select("events(*), startups(*)")
                .eq("event_id", event_id)
            if (error) return { "error": error }
            return data
        } catch (error) {
            return false
        }
    }

    async findByStartupId(startup_id) {
        try {
            const { data, error } = await supabase
                .from(this.table)
                .select("events(*), startups(*)")
                .eq("investor_id", startup_id)
            if (error) return { "error": error }
            return data
        } catch (error) {
            return false
        }
    }
}

module.exports = EventStartupModel