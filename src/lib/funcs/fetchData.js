const axios = require('axios');

const fetchData = {
    /**
     * GET request
     */
    get: async(url, headers = {}, params = {}) => {
        const response = await axios.get(url, {
            headers,
            params
        })
        console.log("response: ", response);
        return response.data;
    },

    /**
     * POST request
     */
    post: async(url, body = {}, headers = {}, params = {}) => {
        const response = await axios.post(url, body, {
            headers,
            params
        })

        console.log("response: ", response)
        return response.data
    },

    /**
     * PUT request
     */
    put: async(url, body = {}, headers = {}, params = {}) => {
        const response = await axios.put(url, body, {
            headers,
            params
        })
        console.log("response: ", response)
        return response.data
    },

    /**
     * DELETE request
     */
    delete: async(url, headers = {}, params = {}) => {
        const response = await axios.delete(url, {
            headers,
            params
        })
        console.log("response: ", response)
        return response.data
    }
};

module.exports = fetchData;