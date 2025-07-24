const controller = (controllerName) => {
    const controller = require(`../../controllers/${controllerName}Controller`);
    return new controller()
}

module.exports = controller;