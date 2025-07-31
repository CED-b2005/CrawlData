const supabase = require('../lib/supabase/supabase');
const Model = require("./model")

class EventDetailModel extends Model {
    constructor() {
        super("event_details")
    }
}

module.exports = EventDetailModel