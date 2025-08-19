const { supabase, SupabaseModel } = require("./supabase.model")



class EventModel extends SupabaseModel {
    constructor() { super("events") }

    async list() {
        try {
            const { data, error } = await supabase
                .from(this.table)
                .select("*, event_details(*)")
            if (error) return { "error": error }
            return data
        } catch (error) {
            return false
        }
    }

    async showById(id) {
        try {
            const { data, error } = await supabase
                .from(this.table)
                .select("*, event_details(*)")
                .eq("id", id)
            if (error) return { "error": error }
            return data
        } catch (error) {
            return false
        }
    }

    async showByName(name) {
        try {
            const { data, error } = await supabase
                .from(this.table)
                .select("*, event_details(*)")
                .ilike("name", name)
            if (error) return { "error": error }
            return data
        } catch (error) {
            return false
        }
    }
}

module.exports = EventModel