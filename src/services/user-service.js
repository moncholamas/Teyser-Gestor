import {BaseServices} from './base-services'

class UserService extends BaseServices{
    constructor({OperatorRepository}){
        super(OperatorRepository);
        this._operatorRepository = OperatorRepository;
    }
    
}

export {
    UserService
}