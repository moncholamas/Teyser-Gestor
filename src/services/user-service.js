"use strict"; 
const  BaseServices = require('./base-services');
const { encrypt, checkEncrypt } = require('../utils/encrypt');
const createToken = require('../utils/token');
require('dotenv').config();

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
        const { mail, password } = body;
        const mailFinded = await this.getByMail(mail);
        if(mailFinded) this.throwError(
            this.status.BAD_REQUEST,
            this.message.MAIL_EXISTS,
            ['mail']
        );

        //encrypt password
        const hash = await encrypt(password); 

        // set user rol -> user basic
        const rol = process.env.ROL_BASIC;

        const response =  await this.create({...body, password: hash, rolId: rol});
        
        const token = createToken({
            id: response.id,
            rolId: response.rolId,
            mail: response.mail,
        })
        // add token
        return token;
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
        const checkedPass = await checkEncrypt(password,mailFinded.password)
        if(!checkedPass) this.throwError(this.status.BAD_REQUEST,this.message.INCORRECT_PASSWORD,['password'])
        
        const token = createToken({
            id: mailFinded.id,
            rolId: mailFinded.rolId,
            mail: mailFinded.mail,
        })
        // add token
        return token;
    }
}

module.exports = UserService;