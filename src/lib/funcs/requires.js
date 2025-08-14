const route = (express, route) => {
    const router = require(`../../routes/${route}.route`);
    return router(express);
}

const controller = (controllerName) => {
    const controller = require(`../../controllers/${controllerName}.controller`);
    try { return new controller() } catch (error) { return controller }
}

const model = (modelName) => {
    const Model = require(`../../models/${modelName}.model`);
    return new Model()
}

module.exports = { controller, model, route };