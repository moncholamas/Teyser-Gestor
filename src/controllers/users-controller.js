const  BaseController  = require('./controller-base');


class UserController extends BaseController{
    constructor({UserService}){
        super(UserService);
    }

}

module.exports = UserController;