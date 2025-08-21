const { supabase, SupabaseModel } = require("./supabase.model")

class SourceModel extends SupabaseModel {
    constructor() {
        super({table: "sources"});
        this.columns = {
            id : "id",
            name: "name",
            img: "img",
            isActive: "isActive",
            api: "api"
        }
    }
}

module.exports = SourceModel;