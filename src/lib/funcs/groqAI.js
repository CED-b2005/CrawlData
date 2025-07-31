const fetchData = require("./fetchData");
const url = process.env.GROQ_API_URL;
const headers = {
    'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
    'Content-Type': 'application/json'
}
const groqAI = async(prompt, useModel = "gemma2-9b-it") => {
    const body = {
        model: useModel,
        messages: [
            { role: 'user', content: prompt }
        ],
        temperature: 0.7
    }
    try {
        const response = await fetchData.post(url, body, headers)
        console.log(response)
        return response.choices[0].message.content;
    } catch (error) {
        console.error(error);
        return false
    }
}
module.exports = groqAI;