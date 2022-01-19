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
    
    async verifyAccount(body){
        const {mail, password} = body;
        const mailFinded = await this.getByMail(mail);
        if(!mailFinded) this.throwError(
            this.status.NOT_FOUND,
            this.message.MAIL_NOT_EXISTS,
            ['mail']
        );
        
        // verify pass
        return mailFinded;
    }
}

module.exports = UserService;