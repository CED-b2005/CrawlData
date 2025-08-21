const { supabase, SupabaseModel } = require("./supabase.model")

class EventInvestorModel extends SupabaseModel {
    constructor() {
        super({ tabel: "event_investor" })
        this.columns = {
            id : "id",
            event_id: "evet_id",
            investor_id: "investor_id"
        }
    }

    async findByEventId(event_id) {
        try {
            const { data, error } = await supabase
                .from(this.table)
                .select("events(*), investors(*)")
                .eq("event_id", event_id)
            if (error) return { "error": error }
            return data
        } catch (error) {
            return false
        }
    }

    async findByInvestorId(investor_id) {
        try {
            const { data, error } = await supabase
                .from(this.table)
                .select("events(*), investors(*)")
                .eq("investor_id", investor_id)
            if (error) return { "error": error }
            return data
        } catch (error) {
            return false
        }
    }
}

module.exports = EventInvestorModel