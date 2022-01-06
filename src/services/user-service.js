"use strict"; 
const  BaseServices = require('./base-services') 

class UserService extends BaseServices{
    constructor({UserRepository}){
        super(UserRepository);
        //this._userRepository = UserRepository;
    }
    
}

module.exports = UserService;