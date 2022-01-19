const {createContainer, asClass,asValue,asFunction} = require('awilix');
//constants


//controllers 
const UserController  = require('../controllers/users-controller');
const AuthController  = require('../controllers/auth-controller');

//services
const {UserService} = require('../services/');

//routes
const Routes = require('../routes');
const UserRoutes = require('../routes/users-router');
const AuthRoutes = require('../routes/auth-router');


//models
const { User } = require('../database/models/index');

//repositories
const { UserRepository } = require('../repositories');

//initialization
const container = createContainer();

//general router
container
    .register({router: asFunction(Routes).singleton()})

// classes and functions for Users
container
    .register({User: asValue(User)})
    .register({UserService:asClass(UserService).singleton()})
    .register({UserRoutes:asFunction(UserRoutes).singleton()})
    .register({UserRepository:asClass(UserRepository).singleton()})
    .register({UserController:asClass(UserController)})

// classes and functions for Authentication
container
    .register({AuthRoutes:asFunction(AuthRoutes).singleton()})
    .register({AuthController:asClass(AuthController)})



module.exports = container;