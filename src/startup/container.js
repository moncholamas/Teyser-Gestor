const {createContainer, asClass,asValue,asFunction} = require('awilix');

const config = require('../config/config');
const app = require('.');

//services
const {UserService} = require('../services/user-service');

//routes
const {UserRoutes} = require('../routes/users-router');

//models
const {User} = require('../database/models');

//repositories
const {UserRepository} = require('../repositories/user-repository');

const container = createContainer();

container
    .register({
        app: asClass(app).singleton(),
        router: asFunction(Routes).singleton(),
        config: asValue(config)
    })
    .register({UserService:asClass(UserService).singleton()})
    .register({UserRoutes:asFunction(UserRoutes).singleton()})
    .register({User: asValue(User)})
    .register({UserRepository:asClass(UserRepository).singleton()})

module.exports = container;