const axios = require('axios');

const fetchData = {
    /**
     * GET request
    */
    get: (action, url, headers = {}, params = {}) => {
        axios.get(url, {
            headers,
            params
        })
            .then((response) => {
                console.log(response.data);
                action(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    },

    /**
     * POST request
    */
    post: (action, url, body = {}, headers = {}, params = {}) => {
        axios.post(url, body, {
            headers,
            params
        })
            .then((response) => {
                console.log(response.data);
                action(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    },

    /**
     * PUT request
    */
    put: (action, url, body = {}, headers = {}, params = {}) => {
        axios.put(url, body, {
            headers,
            params
        })
            .then((response) => {
                console.log(response.data);
                action(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    },

    /**
     * DELETE request
    */
    delete: (action, url, headers = {}, params = {}) => {
        axios.delete(url, {
            headers,
            params
        })
            .then((response) => {
                console.log(response.data);
                action(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }
};

module.exports = fetchData;
