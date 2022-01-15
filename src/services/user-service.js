"use strict"; 
const  BaseServices = require('./base-services') 

class UserService extends BaseServices{
    constructor({UserRepository}){
        super(UserRepository);
    }



    //verify email
    async getByMail(mail){
        return await this.repository.getByMail(mail);
    }

    //set new user
    async createAccount(body){
        const { mail } = body;
        const mailFinded = await this.getByMail(mail);
        if(mailFinded) this.throwError(
            this.status.BAD_REQUEST,
            this.message.MAIL_EXISTS,
            ['mail']
        );

        //encrypt password
        
        return await this.create({...body})
    }
    
    
}

module.exports = UserService;