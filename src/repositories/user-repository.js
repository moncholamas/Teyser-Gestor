"use strict"; 
const BaseRepository = require('./base-repository');

class UserRepository extends BaseRepository{
    constructor({User}){
        super(User);
    }

    async getByMail(mail){
        return await this.model.findOne({where:{mail}});
    }
}

module.exports = UserRepository;