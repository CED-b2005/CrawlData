const model = (modelName) => {
    const Model = require(`../../models/${modelName}Model`);
    return new Model()
}

module.exports = model