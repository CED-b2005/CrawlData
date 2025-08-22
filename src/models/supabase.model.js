const supabase = require("../lib/supabase/supabase")

class SupabaseModel {
    table;
    columns;

    /**
     * @param {{table}} data 
     */
    constructor(data) {
        const { table } = data
        this.table = table
    }

    async findById(id) {
        try {
            const { data, error } = await supabase
                .from(this.table)
                .select('*')
                .eq("id", id)
            if (!error) return data
            console.log("error when get: ", error);
            return false;
        } catch (error) {
            console.log("error when get: ", error)
            return false
        }
    }

    async insert(insertData = [{}]) {
        try {
            const { data, error } = await supabase
                .from(this.table)
                .insert(insertData)
                .select("id");
            if (!error) return data
            console.log("error when insert: ", error);
            return false;
        } catch (error) {
            console.log("error when insert: ", error)
            return false
        }
    }

    async show(limit = 1000) {
        try {
            const { data, error } = await supabase
                .from(this.table)
                .select('*')
                .limit(limit);
            if (!error) return data
            console.log("error when get: ", error);
            return false;
        } catch (error) {
            console.log("error when get: ", error)
            return false
        }
    }

    async update(id, updateData = [{}]) {
        try {
            const { data, error } = await supabase
                .from(this.table)
                .update(updateData)
                .eq("id", id)
            if (!error) return data
            console.log("error when get: ", error);
            return false;
        } catch (error) {
            console.log("error when get: ", error)
            return false
        }
    }
}

module.exports = { supabase, SupabaseModel }