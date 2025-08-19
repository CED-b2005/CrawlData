const supabase = require("../lib/supabase/supabase")

class SupabaseModel {
    table;
    constructor(table = "") { this.table = table; }

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

    async get() {
        try {
            const { data, error } = await supabase
                .from(this.table)
                .select('*');
            if (!error) return data
            console.log("error when get: ", error);
            return false;
        } catch (error) {
            console.log("error when get: ", error)
            return false
        }
    }

    async show(typeQuery = "", where = "", value = "") {
        try {
            const { data, error } = await supabase
                .from(this.table)
                .select('*')[typeQuery](where, value);
            if (!error) return data
            console.log("error when show: ", error);
            return false;
        } catch (error) {
            console.log("error when show: ", error)
            return false
        }
    }

    async update(id = 0, updateData = [{}]) {
        try {
            const { data, error } = await supabase
                .from(this.table)
                .update(updateData)
                .eq(id)
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