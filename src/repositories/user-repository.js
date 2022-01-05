"use strict"; 
const BaseRepository = require('./base-repository');

class UserRepository extends BaseRepository{
    constructor({User}){
        super(User);
    }
}

module.exports = UserRepository;