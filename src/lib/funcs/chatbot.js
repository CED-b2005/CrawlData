const fetchData = require("./fetchData");
require("dotenv").config()

const chatbot = async(prompt, useModel = "gemma2-9b-it", temperature = 0.5) => {
    const headers = {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
    }
    const body = {
        model: useModel,
        messages: [
            { role: 'user', content: prompt }
        ],
        temperature: temperature
    }
    try {
        const response = await fetchData.post(process.env.GROQ_API_URL, body, headers)
        console.log(response)
        return response.choices[0].message.content;
    } catch (error) {
        console.error(error);
        return false
    }
}

module.exports = chatbot;