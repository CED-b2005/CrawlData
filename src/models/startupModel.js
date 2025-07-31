const supabase = require('../lib/supabase/supabase');
const Model = require("./model")

class StartupModel extends Model {
    constructor() {
        super("startups")
    }

    show_startup(where = "", value = "") {
        const typeQuery = where == "id" ? "eq" : "ilike"
        value = where == "id" ? value : `%${value}`
        return this.show(typeQuery, where, value);
    }
}

module.exports = StartupModel