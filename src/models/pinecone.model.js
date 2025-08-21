const { supabase, SupabaseModel } = require("./supabase.model")

class PineconeModel extends SupabaseModel {
    constructor(){
        super({table: "pinecone"});
        this.columns = {
            id: "id",
            assistant: "assistant",
            api_key: "api_key"
        }
    }
}

module.exports = PineconeModel;