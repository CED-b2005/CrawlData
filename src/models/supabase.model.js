const supabase = require("../lib/supabase/supabase")

class SupabaseModel {
    table;
    columns;

    /**
     * @param {{table}} data 
     */
    constructor(data) {
        const { tabel  } = data
        this.table = tabel
    }

    async insert(insertData = [{}]) {
        try {
            const { data, error } = await supabase
                .from(this.table)
                .insert(insertData)
                .select("*");
            if (!error) return data
            console.log("error when insert: ", error);
            return false;
        } catch (error) {
            console.log("error when insert: ", error)
            return false
        }
    }

    async show() {
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