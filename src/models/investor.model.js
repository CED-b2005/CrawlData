const { supabase, SupabaseModel } = require("./supabase.model")

class InvestorModel extends SupabaseModel {
    constructor() {
        super({table: "investors"})
        this.columns = {
            id: "id",
            name: "name",
            title: "title",
            img: "img",
            description: "description"
        }
    }

}

module.exports = InvestorModel