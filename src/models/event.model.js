const { supabase, SupabaseModel } = require("./supabase.model")

class EventModel extends SupabaseModel {
    constructor() {
        super({ table: "events" })
        this.columns = {
            id: "id",
            source_id: "source_id",
            name: "name",
            title: "title",
            start_date: "start_date",
            end_date: "end_date",
            detail: "detail",
            description: "description"
        }
    }

    async showByName(name) {
        try {
            const { data, error } = await supabase
                .from(this.table)
                .select("*")
                .ilike(this.columns.name, name)
            if (error) return { "error": error }
            return data
        } catch (error) {
            return false
        }
    }
}

module.exports = EventModel