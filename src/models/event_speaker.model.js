const { supabase, SupabaseModel } = require("./supabase.model")

class EventSpeakerModel extends SupabaseModel {
    constructor() {
        super({ tabel: "event_speaker" })
        this.columns = {
            id: "id",
            event_id: "evet_id",
            speaker_id: "speaker_id"
        }
    }

    async findByEventId(event_id) {
        try {
            const { data, error } = await supabase
                .from(this.table)
                .select("events(*), speakers(*)")
                .eq("event_id", event_id)
            if (error) return { "error": error }
            return data
        } catch (error) {
            return false
        }
    }

    async findBySpeakerId(speaker_id) {
        try {
            const { data, error } = await supabase
                .from(this.table)
                .select("events(*), speakers(*)")
                .eq("investor_id", investor_id)
            if (error) return { "error": speaker_id }
            return data
        } catch (error) {
            return false
        }
    }
}

module.exports = EventSpeakerModel