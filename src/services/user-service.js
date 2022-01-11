"use strict"; 
const  BaseServices = require('./base-services') 

class UserService extends BaseServices{
    constructor({UserRepository}){
        super(UserRepository);
        //this._userRepository = UserRepository;
    }

    //verify email
    async getByMail(mail){
        const entity = await this.repository.getByMail(mail);
        if(!entity) throw new Error('New error, dont found');

        return entity;
    }
    
}

module.exports = UserService;