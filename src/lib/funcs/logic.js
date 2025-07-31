const controller = (controllerName) => {
    const Controller = require(`../../controllers/${controllerName}Controller`);
    return new Controller()
}

const model = (modelName) => {
    const Model = require(`../../models/${modelName}Model`);
    return new Model()
}

const askAIForQuery = (prompt) => {
    let post = `
        # time now: ${new Date()}
        #với database như sau:
        - events(id, name, title, date, info) -
        - event_details(id, event_id, timeline, info) -
        - speakers(id, name, img, position, info) -
        - startups(id, name, project, logo, project_img, info) -
        - investment_funds(id, name, logo, info) -
        - speaker_event(speaker_id, event_id, note) -
        - investment_fund_event(investment_fund_id, event_id, note) -
        - startup_event(start_up_id, event_id, note)
        => hãy chuyển văn bản vản nhập vào thành lệnh truy vấn Database Supabase !!!
    
        ### Văn bản nhập vào: ${prompt}
    `
    return post
}

const processOutput = (response = "") => {
    response = response.split("```")
    if (response.length >= 3) return response[1].replace(";", "")
    else false
}

const GROQ_API_KEYS = []
require("dotenv").config()
for (let id = 0; id < 31; id++) {
    GROQ_API_KEYS.push(process.env[`GROQ_API_KEY_${id}`])
}

const aiModels = [
    "gemma2-9b-it",
    "llama-3.1-8b-instant",
    "llama-3.3-70b-8192",
    "llama-3.3-70b-versatile",
    "meta-llama/llama-guard-4-12b",
    "whisper-large-v3",
    "whisper-large-v3-turbo"
]

module.exports = { controller, model, askAIForQuery, processOutput, aiModels }