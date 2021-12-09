const {BaseRepository} = require('./base-repository') 

class UserRepository extends BaseRepository(){
    constructor({users}){
        super(users);
    }
}

module.exports = {UserRepository}