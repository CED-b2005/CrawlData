const supabase = require("../lib/supabase/supabase")
class Model {
    table;
    constructor(table = "") {
        this.table = table;
    }
    async push(insertData = [{}]) {
        try {
            const { data, error } = await supabase
                .from(this.table)
                .insert(insertData)
                .select("id");
            if (error) return { "error": error }
            return data
        } catch (error) {
            return false
        }
    }
    async get() {
        try {
            const { data, error } = await supabase
                .from(this.table)
                .select('*');
            if (error) return { "error": error }
            return data
        } catch (error) {
            return false
        }
    }
    async show(typeQuery = "", where = "", value = "") {
        try {
            const { data, error } = await supabase
                .from('speakers')
                .select('*')[typeQuery](where, value);
            if (error) return { "error": error }
            return data
        } catch (error) {
            return false
        }
    }
    async update(updateData = [{}]) {
        try {
            const { data, error } = await supabase
                .from(this.table)
                .update(updateData);
            if (error) return { "error": error }
            return data
        } catch (error) {
            return false
        }
    }
}

module.exports = Model