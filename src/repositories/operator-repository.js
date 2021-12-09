const {BaseRepository} = require('./base-repository') 

class OperatorRepository extends BaseRepository(){
    constructor({operadores}){
        super(operadores);
    }
}

module.exports = {OperatorRepository}