const fetchData = require("../../funcs/fetchData");

const davas = {
    speackers: (res) => {
        const action = (data) => {
            res.send(data);
        }

        const body = {
            url: "get_list_guest",
            page: 2,
            menu_id: 2,
            lang: "en"
        }

        fetchData.post(action, "https://davas.vc", body, {}, {});
    }
}

module.exports = davas;