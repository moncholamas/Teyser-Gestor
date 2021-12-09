const BaseRepository = require('./base-repository');

class UserRepository extends BaseRepository(){
    constructor({Users}){
        super(Users);
    }
}

module.exports = UserRepository;