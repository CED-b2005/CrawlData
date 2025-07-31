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
        - events(id, name, title, date, info, description) -
        - event_details(id, event_id, timeline, info, description) -
        - speakers(id, name, img, position, info, description) -
        - startups(id, name, project, logo, project_img, info, description) -
        - investment_funds(id, name, logo, info, description) -
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

module.exports = { controller, model, askAIForQuery, processOutput }