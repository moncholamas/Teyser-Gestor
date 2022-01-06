const {createContainer, asClass,asValue,asFunction} = require('awilix');

const config = require('../config/config');
const Server = require('./');
//controllers 
const UserController  = require('../controllers/users-controller')

//services
const {UserService} = require('../services/');

//routes
const { UserRoutes } = require('../routes/index-route');
const Routes = require('../routes');
//models
const { User } = require('../database/models/index');

//repositories
const { UserRepository } = require('../repositories');

const container = createContainer();

container
    .register({
        Server: asClass(Server).singleton(),
        router: asFunction(Routes).singleton(),
        config: asValue(config)
    })
    .register({UserService:asClass(UserService).singleton()})
    .register({UserRoutes:asFunction(UserRoutes).singleton()})
    .register({UserController:asClass(UserController).singleton()})
    .register({User: asValue(User)})
    .register({UserRepository:asClass(UserRepository).singleton()})

module.exports = container;