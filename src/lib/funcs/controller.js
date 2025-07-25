const controller = (controllerName) => {
    const Controller = require(`../../controllers/${controllerName}Controller`);
    return new Controller()
}

module.exports = controller;