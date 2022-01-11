const {createContainer, asClass,asValue,asFunction} = require('awilix');

//controllers 
const UserController  = require('../controllers/users-controller');
const AuthController  = require('../controllers/auth-controller');

//services
const {UserService} = require('../services/');

//routes
const  UserRoutes  = require('../routes/users-router');
const  AuthRoutes  = require('../routes/auth-router');

const Routes = require('../routes');
//models
const { User } = require('../database/models/index');

//repositories
const { UserRepository } = require('../repositories');

const container = createContainer();

container
    .register({router: asFunction(Routes).singleton()})
    .register({UserService:asClass(UserService).singleton()})
    .register({UserRoutes:asFunction(UserRoutes).singleton()})
    .register({AuthRoutes:asFunction(AuthRoutes).singleton()})
    .register({UserController:asClass(UserController)})
    .register({AuthController:asClass(AuthController)})
    .register({User: asValue(User)})
    .register({UserRepository:asClass(UserRepository).singleton()})

module.exports = container;