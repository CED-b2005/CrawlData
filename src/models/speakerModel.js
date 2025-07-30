// models/userModel.js
const supabase = require('../lib/supabase/supabase');

const speakerModel = {
    get: async() => {
        const { data, error } = await supabase.from('speakers').select('*');
        if (error) throw error;
        return data;
    },
    show: async(id) => {

    }
}

module.exports = speakerModel;