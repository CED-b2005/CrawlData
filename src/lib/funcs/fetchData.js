const axios = require('axios');

const fetchData = {
    /**
     * GET request
     */
    get: async(url, headers = {}, params = {}) => {
        try {
            const response = await axios.get(url, { headers, params });
            console.log("GET response data: ", response.data);
            return response.data;
        } catch (error) {
            console.error("GET request error: ", error.response || error.message);
            throw error;
        }
    },

    /**
     * POST request
     */
    post: async(url, body = {}, headers = {}, params = {}) => {
        try {
            const response = await axios.post(url, body, { headers, params });
            console.log(body)
                // console.log("POST response data: ", response.data);
            return response.data;
        } catch (error) {
            // console.error("POST request error: ", error.response || error.message);
            throw error;
        }
    },

    /**
     * PUT request
     */
    put: async(url, body = {}, headers = {}, params = {}) => {
        try {
            const response = await axios.put(url, body, { headers, params });
            console.log("PUT response data: ", response.data);
            return response.data;
        } catch (error) {
            console.error("PUT request error: ", error.response || error.message);
            throw error;
        }
    },

    /**
     * DELETE request
     */
    delete: async(url, headers = {}, params = {}) => {
        try {
            const response = await axios.delete(url, { headers, params });
            console.log("DELETE response data: ", response.data);
            return response.data;
        } catch (error) {
            console.error("DELETE request error: ", error.response || error.message);
            throw error;
        }
    }
};

module.exports = fetchData;